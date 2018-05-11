import { expect } from "chai";
import { DBUpdate } from "./../dbUpdate";
import { setupTest } from "./setupTest";

describe("DBUpdate", () => {
    describe("LinkDriverToRider", () => {
        beforeEach((done) => {
            setupTest(done);
        });

        it("case 1", () => {
            setTimeout(async () => {
                const db = new DBUpdate();
                const driverId = "u1";
                const riderId = "u3";
                db.LinkDriverToRider(driverId, riderId);
                const result = await db.sendQuery("match (a)-[:FETCHING]->(b) return a,b;");
                const users = result[0].row;
                expect(users).to.have.lengthOf(2);
                expect(users.filter((x: any) => x.id === driverId)).to.have.lengthOf(1);
                expect(users.filter((x: any) => x.id === riderId)).to.have.lengthOf(1);
                expect(2).to.eq(3);
            }, 1000);
        });
    });
});
