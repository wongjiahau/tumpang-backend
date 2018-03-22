import { expect } from "chai";
import { flattenTime } from "../flattenTime";

describe("flattenTime", () => {
    it("case 1", () => {
        // NOTE: 30 means 0030 means 12.30 AM
        // 0 means 0000 means 12.00 AM
        // 100 means 0100 means 1:00 AM
        // 1300 means 1:00 PM
        const inputs =    [0, 100, 800, 1230, 2359];
        const expecteds = [0, 60,  480, 750 , 1439];
        inputs.forEach((x, i) => {
            expect(flattenTime(x)).to.eq(expecteds[i]);
        });
    });

});
