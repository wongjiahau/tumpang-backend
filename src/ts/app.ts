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

import request = require("request");

// [START app]
import express from "express";
import { connection } from "./mysqldb";
import { Neo4jDb } from "./neo4jdb";
import { populateNeo4jFromMysql, RideMaker } from "./rideMaker";

const app = express();

app.get("/cron", (req, res) => {
    const db = new Neo4jDb();
    db.fetchRiders((err1, riders) => {
        db.fetchDrivers((err2, drivers) => {
            const dateOfTomorrow = new Date();
            dateOfTomorrow.setDate((new Date()).getDate() + 1);
            const dayOfTomorrow = dateOfTomorrow.getDay();
            const eligibleRiders = riders.filter((r) => !isNaN(r.schedule[dayOfTomorrow].startTime));
            const eligibleDrivers = drivers.filter((d) => !isNaN(d.schedule[dayOfTomorrow].startTime));
            const clusters = new RideMaker().findCluster(dayOfTomorrow, eligibleRiders, eligibleDrivers);
            const simplifiedClusters = clusters.map((x) => ({driverId: x.driver.id, ridersIds: x.riders.map((r) => r.id)}));
            simplifiedClusters.forEach((c) => {
                c.ridersIds.forEach((riderId) => {
                    const query = "MATCH (driver{id:'" + c.driverId + "'}), (rider{id:'" + riderId + "'}) CREATE (driver)-[:FETCHING]->(rider);";
                    db.sendQueryToNeo4j(query, (err, response, body) => {
                        if (err) {
                            res.send(err);
                        }
                    });
                    // res.send(query);
                });
            });
            // res.send(JSON.stringify(simplifiedClusters));
        });
    });

});

app.get("/queryNeo4j", (req, res) => {
    const db = new Neo4jDb();
    db.sendQueryToNeo4j("match (u:User)-[]->(car) return u,car;", (err, response, body) => {
        res
            .status(200)
            .send(body)
            .end();
    });
});

app.get("/", (req, res) => {
    connection
        .query("select * from user", (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log("The users are: ", results);
            res
                .status(200)
                .send(results)
                .end();
        });
});

app.get("/acceptRequest", (req, res) => {
    const userId = req.param("user_id");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Run ./kill script to kill this daemon.");
});
// [END app]
