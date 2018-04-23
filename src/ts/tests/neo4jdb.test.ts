import {expect} from "chai";
import {Neo4jDb} from "./../neo4jdb";

function reinjecetTestData() {
    const db = new Neo4jDb();
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, "../../tumpang.cypher");
    fs.readFile(filePath, {encoding: "utf-8"}, (err: any, data: any) => {
        data.split("\n").forEach((query: string) => {
            db.sendQueryToNeo4j(query);
        });
        if (err) {
            console.log(err);
        }
    });
}
// reinjecetTestData();

describe("neo4jdb", () => {
    describe("fetchRiders", () => {
        it("case 1", async () => {
            const db = new Neo4jDb();
            const riders = await db.fetchRiders();
            expect(riders).to.have.lengthOf(9);
            expect(riders.filter((x) => x.id === "u2")[0]).to.deep.eq({
                id: "u2",
                name: "peter",
                phone: "0123478579",
                address: "jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor ",
                schedule: {
                    1 : { startTime: 900, endTime: 1800 },
                    2 : { startTime: 900, endTime: 1800 },
                    3 : { startTime: 900, endTime: 1800 },
                    4 : { startTime: 900, endTime: 1800 },
                    5 : { startTime: 900, endTime: 1700 },
                    6 : { startTime: 900, endTime: 1600 },
                    7 : { startTime: NaN, endTime: NaN }
                },
                departure: { latitude: 3.0756886, longitude: 101.60675049999998 },
                arrival: { latitude: 3.1615, longitude: 101.69799999999998 } ,
                type: "rider"
            });
        });
    });

    describe("fetchDrivers", () => {
        it("case 1", async () => {
            const db = new Neo4jDb();
            const drivers = await db.fetchDrivers();
            expect(drivers).to.have.lengthOf(2);
            expect(drivers.filter((x) => x.id === "u1")[0]).to .deep.eq({
                id: "u1",
                name: "jackson",
                phone: "012345679",
                address: "84,, 60, lorong pjs 10/24a, bandar sunway, 46150 petaling jaya, selangor",
                schedule: {
                    1: { startTime: 830, endTime: 1800 },
                    2: { startTime: 830, endTime: 1800 },
                    3: { startTime: 830, endTime: 1800 },
                    4: { startTime: 830, endTime: 1800 },
                    5: { startTime: 830, endTime: 1700 },
                    6: { startTime: 830, endTime: 1500 },
                    7: { startTime: NaN, endTime: NaN }
                },
                departure: { latitude: 3.0780289, longitude: 101.60655040000006 } ,
                arrival: { latitude: 3.1615, longitude: 101.69799999999998 },
                type: "driver",
                car: {
                    model: "myvi",
                    capacity: 4,
                    plateNum: "wre 8907",
                    color: "yellow"
                }
            });
        });
    });

    describe("LinkDriverToRider", () => {
        it("case 1", async () => {
            const db = new Neo4jDb();
            const driverId = "u1";
            const riderId = "u3";
            db.LinkDriverToRider(driverId, riderId);
            const result = await db.sendQueryToNeo4j("match (a)-[:FETCHING]->(b) return a,b;");
            const users = result[0].row;
            expect(users).to.have.lengthOf(2);
            expect(users.filter((x: any) => x.id === driverId)).to.have.lengthOf(1);
            expect(users.filter((x: any) => x.id === riderId)).to.have.lengthOf(1);
            await db.sendQueryToNeo4j("match ()-[r:FETCHING]->() delete r;");
        });
    });
});
