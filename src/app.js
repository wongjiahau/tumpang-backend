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

const makeInitialRides = require('./makeInitialRides').makeInitialRides;
const connection = require('./mysqldb').connection;
makeInitialRides();

'use strict';
var request = require('request');

// [START app]
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // connection.connect();

    connection
        .query('select * from user', function (error, results, fields) {
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

app.get('/callGoogle', function(req, res){
  request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // from within the callback, write data to response, essentially returning it.
      res.send(body);
    }
  })
});

app.get('/hello', (req, res) => {
    res
        .status(200)
        .send("Hello there")
        .end();
});

app.get('/testneo4j', (req, res) => {
    request('http://localhost:7474/db/data/transaction/commit', {
        method: 'POST',
        json: {
            "statements": [
                {
                    "statement": "match (n) return n"
                }
            ]
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200).send(body).end();
            console.log(body)
        } else {
            res.status(200).send("Error fetching from neo4j").end()
            console.log("error");
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