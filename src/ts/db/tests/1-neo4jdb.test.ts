import {expect} from "chai";
import {Neo4jDb} from "./../neo4jdb";
import { setupTest } from "./setupTest";

describe("neo4jdb", () => {
    describe("sendQuery", () => {
        beforeEach((done) => {
            setupTest(done);
        });

        it("case 1", async () => {
            const db = new Neo4jDb();
            const result = await db.sendQuery("match (n) return n;");
            expect(result).to.have.lengthOf(13); // 11 Users + 2 Cars
        });
    });
});