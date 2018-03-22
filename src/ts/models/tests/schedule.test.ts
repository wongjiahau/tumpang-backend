import { expect } from "chai";
import { parseSchedule } from "../schedule";
import { ISchedule } from "./../schedule";
describe("schedule", () => {
    describe("parse", () => {
        it("should return a list of schedule", () => {
            const input = "0830-1800|0830-1800|0830-1800|0830-1800|0830-1700|0830-1500|-";
            const result = parseSchedule(input);
            const expected: ISchedule[] = [
                {startTime : 830, endTime: 1800}, // Monday
                {startTime : 830, endTime: 1800}, // Tuesday
                {startTime : 830, endTime: 1800}, // Wednesday
                {startTime : 830, endTime: 1800}, // Thursday
                {startTime : 830, endTime: 1700}, // Friday
                {startTime : 830, endTime: 1500}, // Saturday
                {startTime : NaN, endTime: NaN}   // Sunday
            ];
            expect(result).to.deep.eq(expected);
        });

    });

});
