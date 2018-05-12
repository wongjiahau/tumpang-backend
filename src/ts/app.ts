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
import { addCrudFunction } from "./crud";
import { Neo4jDb } from "./db/neo4jdb";
import { runMatchMaking } from "./runMatchMaking";
const bodyParser = require("body-parser");

const app: express.Express = express();

const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
    console.log(`Incoming request at ${req.url} . . .` );
    console.log(`Request body : ${JSON.stringify(req.body)}` );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
addCrudFunction(app);

app.get("/runMatchMaking", async (req, res) => {
    await runMatchMaking();
    res.send("Matching making completed.");
});

app.get("/queryNeo4j", async (req, res) => {
    const db = new Neo4jDb();
    const body = await db.sendQuery("match (u:User)-[]->(car) return u,car;");
    res.status(200).send(body).end();
});

app.get("/", (req, res) => {
    res.send("It works!");
});

app.get("/acceptRequest", (req, res) => {
    const userId = req.param("user_id");
    console.log(userId);
});

// Start the server
const PORT = process.env.PORT || 8080;
/**
 * Note: If you use 127.0.0.1, others can't connect to it remotely
 * You need to use 0.0.0.0, which will bind to your machine ip address
 * Refer more on: https://stackoverflow.com/questions/33953447/express-app-server-listen-all-intefaces-instead-of-localhost-only#answer-33957043
 */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App listening on port ${PORT}`);
});
// [END app]
