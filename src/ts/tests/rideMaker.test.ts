import { IRequest } from "../models/request";
import { RideMaker } from "../rideMaker";
import { MockNeo4jDb } from "./mocks/mockNeo4jdb";

describe("rideMaker", () => {
    it("case 1", (done) => {
        const rm = new RideMaker(new MockNeo4jDb());
        rm.makeInitialRides((requests: IRequest[]) => {
            console.log(requests);
            done();
        });
    });
});
