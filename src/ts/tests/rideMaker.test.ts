import { expect } from "chai";
import {IRequest} from "../models/request";
import {Neo4jDb} from "../neo4jdb";
import {RideMaker} from "../rideMaker";
import { sampleDrivers } from "./../dataTransformers/tests/sampleDrivers";

function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

describe("rideMaker", () => {
    it("should throw when 2 users have the same set of features", () => {
        const rider = sampleDrivers()[0];
        rider.type = "rider";
        const driver = clone(rider);
        expect(() => {(new RideMaker().findCluster(1, [rider], [driver])); }).to.throws();
    });

    it("should match driver to rider with closer departure", () => {
        const ali = clone(sampleDrivers()[0]);
        ali.name = "ali";
        ali.type = "rider";
        const john = clone(ali);
        john.name = "john";
        john.type = "rider";
        const driver1 = clone(sampleDrivers()[0]);
        driver1.name = "driver1";
        const driver2 = clone(driver1);
        driver2.name = "driver2";

        driver1.departure.latitude += 0;
        ali.departure.latitude += 0.001;

        driver2.departure.latitude += 1;
        john.departure.latitude += 1.001;

        driver1.car.capacity = 1;
        driver2.car.capacity = 1;
        const clusters = new RideMaker().findCluster(1, [ali, john], [driver1, driver2]);
        expect(clusters).to.have.lengthOf(2);
        expect(clusters[0].driver.name).to.eq("driver1");
        expect(clusters[0].riders).to.have.lengthOf(1);
        expect(clusters[0].riders[0].name).to.eq("ali");

        expect(clusters[1].driver.name).to.eq("driver2");
        expect(clusters[1].riders).to.have.lengthOf(1);
        expect(clusters[1].riders[0].name).to.eq("john");
    });

    it("should match driver to rider with more similar departing time", () => {
        const DAY = 1; // Monday
        const ali = clone(sampleDrivers()[0]);
        ali.name = "ali";
        ali.type = "rider";
        const john = clone(ali);
        john.name = "john";
        john.type = "rider";
        const driver1 = clone(sampleDrivers()[0]);
        driver1.name = "driver1";
        const driver2 = clone(driver1);
        driver2.name = "driver2";

        driver1.schedule[DAY].startTime += 10;
        ali.schedule[DAY].startTime += 11;

        driver2.schedule[DAY].startTime += 1;
        john.schedule[DAY].startTime += 2;

        driver1.car.capacity = 1;
        driver2.car.capacity = 1;
        const clusters = new RideMaker().findCluster(DAY, [ali, john], [driver1, driver2]);
        expect(clusters).to.have.lengthOf(2);
        expect(clusters[0].driver.name).to.eq("driver1");
        expect(clusters[0].riders).to.have.lengthOf(1);
        expect(clusters[0].riders[0].name).to.eq("ali");

        expect(clusters[1].driver.name).to.eq("driver2");
        expect(clusters[1].riders).to.have.lengthOf(1);
        expect(clusters[1].riders[0].name).to.eq("john");
    });
});
