import { expect } from "chai";
import { parseSchedule } from "../schedule";
import { ISchedule } from "./../schedule";
describe("schedule", () => {
    describe("parse", () => {
        it("should return a list of schedule", () => {
            const input = "0830-1800|0830-1800|0830-1800|0830-1800|0830-1700|0830-1500|-";
            const result = parseSchedule(input);
            const expected: {[index: number]: ISchedule} = {
               1 : {startTime : 830, endTime: 1800}, // Monday
               2 : {startTime : 830, endTime: 1800}, // Tuesday
               3 : {startTime : 830, endTime: 1800}, // Wednesday
               4 : {startTime : 830, endTime: 1800}, // Thursday
               5 : {startTime : 830, endTime: 1700}, // Friday
               6 : {startTime : 830, endTime: 1500}, // Saturday
               7 : {startTime : NaN, endTime: NaN}   // Sunday
            };
            expect(result).to.deep.eq(expected);
        });

    });

});
