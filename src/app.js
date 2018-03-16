/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tumpang',
    protocol: 'tcp',
    port: '3306'
});

// [START app]
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // connection.connect();

    connection
        .query('select * from User', function (error, results, fields) {
            if (error) 
                throw error;
            console.log('The users are: ', results);
            res
                .status(200)
                .send(results)
                .end();
        });

    //connection.end();
});

app.get('/hello', (req, res) => {
    res
        .status(200)
        .send("Hello there")
        .end();
});

app.get('testneo4j', (req, res) => {
    var request = require('request');

    request.post('http://localhost:7474/db/data/transaction/commit', {
        json: {
            "statements": [
                {
                    "statement": "match (n) RETURN (n)"
                }
            ]
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '127.0.0.1', () => {
    // console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END app]