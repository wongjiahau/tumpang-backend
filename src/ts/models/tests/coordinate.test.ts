import { expect } from "chai";
import { Coordinate } from "../coordinate";

describe("location", () => {
    describe("parse", () => {
        it("should convert string into Location", () => {
            const input = "33.33,-44.44";
            const expected = new Coordinate(33.33, -44.44);
            expect(Coordinate.parse(input)).to.deep.eq(expected);
        });
    });

    describe("toString", () => {
        it("should delimited latitude and longitude by comma", () => {
            const input = new Coordinate(-99.0, 33.2);
            expect(input.toString()).to.eq("-99,33.2");
        });
    });

});
