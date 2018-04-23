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

// [START app]
import express from "express";
import { ICluster } from "./cluster";
import { getDistance } from "./getDistance";
import { Coordinate } from "./models/coordinate";
import { connection } from "./mysqldb";
import { Neo4jDb } from "./neo4jdb";
import { RideMaker } from "./rideMaker";

const app = express();

app.get("/runMatchMaking", async (req, res) => {
    const db = new Neo4jDb();
    const riders = await db.fetchRiders();
    const drivers = await db.fetchDrivers();
    const dateOfTomorrow = new Date();
    dateOfTomorrow.setDate((new Date()).getDate() + 1);
    const dayOfTomorrow = dateOfTomorrow.getDay();
    const eligibleRiders = riders.filter((r) => !isNaN(r.schedule[dayOfTomorrow].startTime));
    const eligibleDrivers = drivers.filter((d) => !isNaN(d.schedule[dayOfTomorrow].startTime));
    // getDistance(eligibleDrivers.map((d) => Coordinate.stringify(d.departure)))
    const clusters = new RideMaker().findCluster(dayOfTomorrow, eligibleRiders, eligibleDrivers);
    // const cleanseClusters: ICluster[] = [];
    // clusters.forEach((c) => {
    //     const distances
    // });
    const simplifiedClusters = clusters.map((x) => ({driverId: x.driver.id, ridersIds: x.riders.map((r) => r.id)}));
    simplifiedClusters.forEach((c) => {
        c.ridersIds.forEach(async (riderId) => {
            await db.LinkDriverToRider(c.driverId, riderId);
        });
    });
    res.send("Matching making completed.");
});

app.get("/queryNeo4j", async (req, res) => {
    const db = new Neo4jDb();
    const body = await db.sendQueryToNeo4j("match (u:User)-[]->(car) return u,car;");
    res.status(200).send(body).end();
});

app.get("/", (req, res) => {
    res.send("It works!");
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
