const connection = require('./mysqldb').connection;
const sendQueryYToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

function makeInitialRides() {
    connection.query('select * from user', (error, results, fields) => {
        console.log(results);;
        populateUserNodeToNeo4j(results);
    });
}

function populateUserNodeToNeo4j(users) {
    sendQueryYToNeo4j("match (n:User) delete n;"); // delete every user
    users.forEach((r) => {
        sendQueryYToNeo4j("create (:User{id:'" + r.id + "', type:'" + r.type + "'});") // add every user as node to neo4j
    });
}

module.exports = {
    makeInitialRides
}