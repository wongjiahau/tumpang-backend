import { IRider } from "../../models/rider";
import { DBCreate } from "../dbCreate";

describe("DBCreate", () => {
    describe("createUser", () => {
        it("case 1", async () => {
            const user1: IRider = {
                name: "newuser",
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
            };
            const db = new DBCreate();
            await db.createUser(user1);
        });
    });
});
