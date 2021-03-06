import { expect } from "chai";
import { setTimeout } from "timers";
import { DBRetrieve } from "../dbRetrieve";
import { setupTest } from "./setupTest";

describe("DBRetrieve", () => {
    describe("fetchRiders", () => {
        beforeEach((done) => {
            setupTest(() => { /* empty */});
            setTimeout(() => done(), 300);
        });

        it("case 1", async () => {
            const db = new DBRetrieve();
            const riders = await db.fetchRiders();
            expect(riders.filter((x) => x.id === "u2")[0]).to.deep.eq({
                id: "u2",
                name: "peter",
                phone: "0123478579",
                address: "jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor ",
                schedule: {
                    1 : { startTime: 900, endTime: 1800 },
                    2 : { startTime: 900, endTime: 1800 },
                    3 : { startTime: 900, endTime: 1800 },
                    4 : { startTime: 900, endTime: 1800 },
                    5 : { startTime: 900, endTime: 1700 },
                    6 : { startTime: 900, endTime: 1600 },
                    7 : { startTime: NaN, endTime: NaN }
                },
                departure: { latitude: 3.0756886, longitude: 101.60675049999998 },
                arrival: { latitude: 3.1615, longitude: 101.69799999999998 } ,
                type: "rider"
            });
        });
    });

    describe("fetchDrivers", () => {
        it("case 1", async () => {
            const db = new DBRetrieve();
            const drivers = await db.fetchDrivers();
            expect(drivers).to.have.lengthOf(2);
            expect(drivers.filter((x) => x.id === "u1")[0]).to .deep.eq({
                id: "u1",
                name: "jackson",
                phone: "0123456789",
                address: "84,, 60, lorong pjs 10/24a, bandar sunway, 46150 petaling jaya, selangor",
                schedule: {
                    1: { startTime: 830, endTime: 1800 },
                    2: { startTime: 830, endTime: 1800 },
                    3: { startTime: 830, endTime: 1800 },
                    4: { startTime: 830, endTime: 1800 },
                    5: { startTime: 830, endTime: 1700 },
                    6: { startTime: 830, endTime: 1500 },
                    7: { startTime: 830, endTime: 1500 }
                },
                departure: { latitude: 3.0780289, longitude: 101.60655040000006 } ,
                arrival: { latitude: 3.1615, longitude: 101.69799999999998 },
                type: "driver",
                car: {
                    model: "myvi",
                    capacity: 4,
                    plateNum: "wre 8907",
                    color: "yellow"
                }
            });
        });
    });

});
