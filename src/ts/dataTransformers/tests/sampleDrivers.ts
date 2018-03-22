import { IDriver } from "./../../models/driver";
export const sampleDrivers = (): IDriver[] => [
    {
        id: "u1",
        name: "jackson",
        phone: "012345679",
        address: "84,, 60, lorong pjs 10/24a, bandar sunway, 46150 petaling jaya, selangor",
        schedule: {
            1: { startTime: 830, endTime: 1800 },
            2: { startTime: 830, endTime: 1800 },
            3: { startTime: 830, endTime: 1800 },
            4: { startTime: 830, endTime: 1800 },
            5: { startTime: 830, endTime: 1700 },
            6: { startTime: 830, endTime: 1500 },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: {
            latitude: 3.0780289, longitude: 101.60655040000006 }, arrival: {
            latitude: 3.1615, longitude: 101.69799999999998 },
            type: "driver",
        car: {
            model: "myvi",
            capacity: 4,
            plateNum: "wre 8907",
            color: "yellow"
        }
    }, {
        id: "u6",
        name: "sonia",
        phone: "0142682311",
        address: "432, jalan pjs 10/9, bandar sunway, 46150 petaling jaya, selangor",
        schedule: {
            1: { startTime: 900, endTime: 1800 },
            2: { startTime: 900, endTime: 1800 },
            3: { startTime: 900, endTime: 1800 },
            4: { startTime: 900, endTime: 1800 },
            5: { startTime: 900, endTime: 1600 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: {
            latitude: 3.0766629, longitude: 101.60385429999997 }, arrival: {
            latitude: 3.1326988, longitude: 101.67225259999998 }, type: "driver",
        car: {
            model: "alza",
            capacity: 6,
            plateNum: "wba 8232",
            color: "red"
        }
    }
];
