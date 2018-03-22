import {expect} from "chai";
import {Neo4jDb} from "./../neo4jdb";
describe("neo4jdb", () => {
    describe("fetchRiders", () => {
        it("case 1", (done) => {
            const db = new Neo4jDb();
            db.fetchRiders((err, riders) => {
                expect(riders).to.have.lengthOf(8);
                expect(riders[0]).to .deep.eq({
                    id: "u2",
                    name: "peter",
                    phone: "0123478579",
                    address: "jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor ",
                    schedule: "0900-1800|0900-1800|0900-1800|0900-1800|0900-1700|0900-1600|-",
                    departure: "3.0756886,101.60675049999998",
                    arrival: "3.1615,101.69799999999998",
                    type: "rider"
                });
                done();
            });
        });
    });

    describe("fetchDrivers", () => {
        it("case 1", (done) => {
            const db = new Neo4jDb();
            db.fetchDrivers((err, drivers) => {
                expect(drivers).to.have.lengthOf(2);
                expect(drivers[0]).to .deep.eq(
                    {
                        id: "u1",
                        name: "jackson",
                        phone: "012345679",
                        address: "84,, 60, lorong pjs 10/24a, bandar sunway, 46150 petaling jaya, selangor",
                        schedule: "0830-1800|0830-1800|0830-1800|0830-1800|0830-1700|0830-1500|-",
                        departure: "3.0780289, 101.60655040000006",
                        arrival: "3.1615,101.69799999999998",
                        type: "driver",
                        car: {
                            model: "myvi",
                            capacity: 4,
                            plateNum: "wre 8907",
                            color: "yellow"
                        }
                    }
                );
                done();
            });
        });
    });
});
