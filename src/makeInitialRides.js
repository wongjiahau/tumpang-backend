const connection = require('./mysqldb').connection;
const sendQueryYToNeo4j = require('./neo4jdb').sendQueryToNeo4j;

function makeInitialRides() {
    connection.query('select id, type from user', (error, results, fields) => {
        results.forEach((r) => {
            sendQueryYToNeo4j("create (:User{id:'" + r.id + "', type:'" + r.type + "'});")
        });
    });
}

module.exports = {
    makeInitialRides
}