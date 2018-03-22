import { expect } from "chai";
import { IRider } from "../../models/rider";
import { extractUserFeatures } from "../extractUserFeatures";

describe("extractUserFeatures", () => {
    // LEGEND:
    // dept = departure
    // arr  = arrival
    // lat = lattude
    // long = longtude
    it("should return [deptLat, deptLong, arrLat, arrLong, startTime, endTime]", () => {
        // startTime and endTime should be flattenized
        const rider: IRider = {
            id: "u2",
            name: "peter",
            phone: "0123478579",
            address: "jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor ",
            schedule: {
                1: { startTime: 900, endTime: 1800 },
                2: { startTime: 900, endTime: 1800 },
                3: { startTime: 900, endTime: 1800 },
                4: { startTime: 900, endTime: 1800 },
                5: { startTime: 900, endTime: 1700 },
                6: { startTime: 900, endTime: 1600 },
                7: { startTime: NaN, endTime: NaN }
            },
            departure: {latitude: 3.33, longitude: 44.4},
            arrival: {latitude: -55.5, longitude: 99.99},
            type: "rider"
        };
        const result = extractUserFeatures(rider, 1);
        expect(result).to.deep.eq([3.33, 44.4, -55.5, 99.99, 540, 1080]);
    });
});
