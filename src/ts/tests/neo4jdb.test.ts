import {expect} from "chai";
import {Neo4jDb} from "./../neo4jdb";
describe("neo4jdb", () => {
    describe("fetchRiders", () => {
        it("case 1", async () => {
            const db = new Neo4jDb();
            const riders = await db.fetchRiders();
            expect(riders).to.have.lengthOf(9);
            expect(riders[0]).to .deep.eq({
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
            expect(drivers[0]).to .deep.eq({
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
});
