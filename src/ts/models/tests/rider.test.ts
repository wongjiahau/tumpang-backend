import { expect } from "chai";
import { IRider, stringifyRider } from "../rider";

describe("Rider", () => {
    describe("stringify", () => {
        it("case 1", () => {
            const expected = `{
name:"peter",
phone:"0123478579",
schedule:"0900-1800|0900-1800|0900-1800|0900-1800|0900-1700|0900-1600|-",
departure:"3,-4.1",
arrival:"9.9,0.9",
company:"utar",
type:"rider",
address:"world"
}`.replace("\n", "");
            const input: IRider = {
                name: "peter",
                phone: "0123478579",
                schedule: {
                    1 : { startTime: 900, endTime: 1800 },
                    2 : { startTime: 900, endTime: 1800 },
                    3 : { startTime: 900, endTime: 1800 },
                    4 : { startTime: 900, endTime: 1800 },
                    5 : { startTime: 900, endTime: 1700 },
                    6 : { startTime: 900, endTime: 1600 },
                    7 : { startTime: NaN, endTime: NaN }
                },
                departure: { latitude: 3.0, longitude: -4.1 },
                arrival: { latitude: 9.9, longitude: 0.9 } ,
                company: "utar",
                type: "rider",
                address: "world",
            };
            const result = stringifyRider(input);
            expect(result).to.eq(expected);
        });
    });
});
