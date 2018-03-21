const connection = require('./mysqldb').connection;
const getDistance = require('./getDistance');
const sendQueryToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

const MAX_FETCHING_DISTANCE = 2; // km

// We will assume that neo4j db is populated
function makeInitialRides() {
    sendQueryToNeo4j("match (n:User) return n;", (err, res, body) => {
        console.log(body);
        const data = body.results[0].data;
        const allUsers = [];
        data.forEach((o) => {
            const user = o.row[0];
            allUsers.push(user);
        })
        const riders = allUsers.filter((x) => x.type === 'rider');
        const drivers = allUsers.filter((x) => x.type === 'driver');
        drivers.forEach((d) => {
            getDistance(d.departure, riders.map(r => r.departure), (distances) => {
                distances.forEach((distance, index) => {
                    console.log(distance);
                });
            });
            // const nearbyRiders = riders.filter((r) => getDistance(d.departure,
            // r.departure) <= MAX_FETCHING_DISTANCE);
        });
    });
}


// This function is only for testing
function populateNeo4jFromMysql() {
    connection.query('select * from user u inner join userdetails ud on u.id=ud.userid;', (error, results, fields) => {
        populateUserNodeToNeo4j(results);
    });

    function populateUserNodeToNeo4j(users) {
        sendQueryToNeo4j("match (n:User) delete n;"); // delete every user
        users.forEach((r) => {
            var query = `create (:User${JSON.stringify(r)});`;
            query = query.replace(/\"([^(\")"]+)\":/g, "$1:"); // remove quotes on property, because neo4j don't accept it
            console.log(query);
            sendQueryToNeo4j(query, (err, res, body) => {
                if (err) 
                    console.log(err);
                }
            ); // add every user as node to neo4j
        });
    }
}

module.exports = {
    makeInitialRides
}