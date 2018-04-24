import { expect } from "chai";
import { parseSchedule, stringifySchedule } from "../schedule";
import { ISchedule } from "./../schedule";

// Repr means representation
const stringRepr = "0830-1800|0830-1800|0830-1800|0830-1800|0830-1700|0830-1500|-";
const objectRepr: {[index: number]: ISchedule} = {
    1 : {startTime : 830, endTime: 1800}, // Monday
    2 : {startTime : 830, endTime: 1800}, // Tuesday
    3 : {startTime : 830, endTime: 1800}, // Wednesday
    4 : {startTime : 830, endTime: 1800}, // Thursday
    5 : {startTime : 830, endTime: 1700}, // Friday
    6 : {startTime : 830, endTime: 1500}, // Saturday
    7 : {startTime : NaN, endTime: NaN}   // Sunday
};

describe("schedule", () => {
    describe("parse", () => {
        it("should return a list of schedule", () => {
            const result = parseSchedule(stringRepr);
            expect(result).to.deep.eq(objectRepr);
        });
    });

    describe("stringify", () => {
        it("case 1", () => {
            const result = stringifySchedule(objectRepr);
            expect(result).to.eq(stringRepr);
        });
    });
});
