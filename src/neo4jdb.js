function sendQueryToNeo4j(query, callback) {
    var request = require('request');
    request('http://localhost:7474/db/data/transaction/commit', {
        method: 'POST',
        json: {
            "statements": [
                {
                    "statement": query
                }
            ]
        }
    }, function (error, response, body) {
        if (callback) {
            callback(error, response, body)
        }
    });
}

module.exports = {
    sendQueryToNeo4j
}