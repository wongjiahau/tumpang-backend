import { expect } from "chai";
import {getDistance} from "../getDistance";

describe("getDistance", () => {
    it("case 1", (done) => {
        const ori1 = "2.747968,101.666252";
        const ori2 = "3.093289, 101.700484";
        const des1 = "3.086644,101.681667";
        const des2 = "2.527198,101.953202";
        const origins = [ori1, ori2];
        const destinations = [des1, des2];
        const distanceBtw_ori1_des1 = 52.7;
        const distanceBtw_ori1_des2 = 71.7;
        const distanceBtw_ori2_des1 = 3.7;
        const distanceBtw_ori2_des2 = 102;
        getDistance(origins, destinations, (error, distances) => {
            expect(distances).to.deep.eq(
                [
                    [distanceBtw_ori1_des1, distanceBtw_ori1_des2],
                    [distanceBtw_ori2_des1, distanceBtw_ori2_des2]
                ]
            );
            done();
        });
    });
});
