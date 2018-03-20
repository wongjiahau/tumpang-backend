const connection = require('./mysqldb').connection;
const sendQueryToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

// We will assume that neo4j db is populated
function makeInitialRides() {
    // populateNeo4jFromMysql();
    sendQueryToNeo4j("match (n:User) return n;", (err, res, body) => {
        const users = body;
        console.log(JSON.stringify(users));
        // const riders = users.filter((x) => x.type === 'rider');
        // console.log(riders);
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
            query = query.replace(/\"([^(\")"]+)\":/g,"$1:"); // remove quotes on property, because neo4j don't accept it
            console.log(query);
            sendQueryToNeo4j(query, (err, res, body) => {
                if(err) console.log(err);
            }); // add every user as node to neo4j
        });
    }
}


module.exports = {
    makeInitialRides
}