import { expect } from "chai";
import { DBUpdate } from "./../dbUpdate";
describe("DBUpdate", () => {
    describe("LinkDriverToRider", () => {
        it("case 1", async () => {
            const db = new DBUpdate();
            const driverId = "u1";
            const riderId = "u3";
            db.LinkDriverToRider(driverId, riderId);
            const result = await db.sendQuery("match (a)-[:FETCHING]->(b) return a,b;");
            const users = result[0].row;
            expect(users).to.have.lengthOf(2);
            expect(users.filter((x: any) => x.id === driverId)).to.have.lengthOf(1);
            expect(users.filter((x: any) => x.id === riderId)).to.have.lengthOf(1);
            await db.sendQuery("match ()-[r:FETCHING]->() delete r;");
        });
    });
});
