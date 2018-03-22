import { expect } from "chai";
import { Coordinate, ICoordinate } from "./../coordinate";

describe("location", () => {
    describe("parse", () => {
        it("should convert string into Location", () => {
            const input = "33.33,-44.44";
            const expected: ICoordinate = {
                latitude: 33.33,
                longitude: -44.44
            };
            expect(Coordinate.parse(input)).to.deep.eq(expected);
        });
    });

    describe("toString", () => {
        it("should delimited latitude and longitude by comma", () => {
            const input: ICoordinate = {
                latitude: -99,
                longitude: 33.2
            };
            expect(Coordinate.stringify(input)).to.eq("-99,33.2");
        });
    });

});
