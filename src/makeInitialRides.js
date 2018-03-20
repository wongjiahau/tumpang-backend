const connection = require('./mysqldb').connection;
const sendQueryToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

// We will assume that neo4j db is populated
function makeInitialRides() {
    sendQueryToNeo4j("match (n:User) return n;", (err, res, body) => {
        console.log(JSON.stringify(body));
    });

}

// This function is only for testing
function populateNeo4jFromMysql() {
    connection.query('select * from user', (error, results, fields) => {
        populateUserNodeToNeo4j(results);
    });
}

function populateUserNodeToNeo4j(users) {
    sendQueryToNeo4j("match (n:User) delete n;"); // delete every user
    users.forEach((r) => {
        sendQueryToNeo4j("create (:User{id:'" + r.id + "', type:'" + r.type + "'});") // add every user as node to neo4j
    });
}

module.exports = {
    makeInitialRides
}