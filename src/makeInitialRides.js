const connection = require('./mysqldb').connection;
const sendQueryToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

const MAX_FETCHING_DISTANCE = 2; // km

// We will assume that neo4j db is populated
function makeInitialRides() {
    sendQueryToNeo4j("match (n:User) return n;", (err, res, body) => {
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

function getDistance(origin, destinations, callback) {
    var request = require('request');
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations.join('|')}`;
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        const distances = body.rows[0].elements.map(x => parseInt(x.distance.text.split(' ')[0]));
        callback(distances);
        console.log('body:', body); // Print the HTML for the Google homepage.
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