const connection = require('./mysqldb').connection;
const sendQueryYToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

function makeInitialRides() {
}

function populateUserNodeToNeo4j() {
    connection.query('select id, type from user', (error, results, fields) => {
        sendQueryYToNeo4j("match (n:User) delete n;"); // delete every user
        results.forEach((r) => {
            sendQueryYToNeo4j("create (:User{id:'" + r.id + "', type:'" + r.type + "'});") // add every user as node to neo4j
        });
    });
}

module.exports = {
    makeInitialRides
}