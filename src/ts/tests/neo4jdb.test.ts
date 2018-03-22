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
});
