import { IRider } from "./../../models/rider";
export const sampleRiders = (): IRider[] => [
    {
        id: "u2",
        name: "peter",
        phone: "0123478579",
        address: "jalan pjs 10/15,bandar sunway,46150 petaling jaya,selangor ",
        schedule: {
            1: { startTime: 900, endTime: 1800 },
            2: { startTime: 900, endTime: 1800 },
            3: { startTime: 900, endTime: 1800 },
            4: { startTime: 900, endTime: 1800 },
            5: { startTime: 900, endTime: 1700 },
            6: { startTime: 900, endTime: 1600 },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.0756886, longitude: 101.60675049999998 },
        arrival: { latitude: 3.1615, longitude: 101.69799999999998 },
        type: "rider"
    }, {
        id: "u3",
        name: "aiman",
        phone: "012003219",
        address: "jalan pjs 10/32,bandar sunway,46150 petaling jaya,selangor",
        schedule: {
            1: { startTime: 840, endTime: 1800 },
            2: { startTime: 840, endTime: 1800 },
            3: { startTime: 840, endTime: 1800 },
            4: { startTime: 840, endTime: 1800 },
            5: { startTime: 840, endTime: 1700 },
            6: { startTime: 840, endTime: 1500 },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.078338, longitude: 101.60849659999997 },
        arrival: { latitude: 3.1615, longitude: 101.69799999999998 },
        type: "rider"
    }, {
        id: "u4",
        name: "natasha",
        phone: "014512219",
        address: "22 g, jalan pjs 10/22, subang indah, selangor, pjs 10, 46000 petaling jaya, sela" +
                "ngor",
        schedule: {
            1: { startTime: 840, endTime: 1730 },
            2: { startTime: 840, endTime: 1730 },
            3: { startTime: 840, endTime: 1730 },
            4: { startTime: 840, endTime: 1730 },
            5: { startTime: 840, endTime: 1730 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.075149, longitude: 101.60616000000005 },
        arrival: { latitude: 3.1326988, longitude: 101.67225259999998 },
        type: "rider"
    }, {
        id: "u5",
        name: "dheeno",
        phone: "0145889219",
        address: "jalan pjs 10/7,bandar sunway,46150 petaling jaya,selangor",
        schedule: {
            1: { startTime: 845, endTime: 1730 },
            2: { startTime: 845, endTime: 1730 },
            3: { startTime: 845, endTime: 1730 },
            4: { startTime: 845, endTime: 1730 },
            5: { startTime: 845, endTime: 1730 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.0749643, longitude: 101.6008663 },
        arrival: { latitude: 3.1326988, longitude: 101.67225259999998 },
        type: "rider"
    }, {
        id: "u7",
        name: "chan wong",
        phone: "016782111",
        address: "3a07, block c, pangsapuri ridzuan 3, jalan pjs 10/11, 46000, petaling jaya, sela" +
                "ngor",
        schedule: {
            1: { startTime: 850, endTime: 1730 },
            2: { startTime: 850, endTime: 1730 },
            3: { startTime: 850, endTime: 1730 },
            4: { startTime: 850, endTime: 1730 },
            5: { startTime: 850, endTime: 1730 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.077537, longitude: 101.60453800000005 },
        arrival: { latitude: 3.1326988, longitude: 101.67225259999998 },
        type: "rider"
    }, {
        id: "u8",
        name: "james ooi",
        phone: "015782111",
        address: "no. 77, jalan pjs 10/34, taman sri subang, pjs 10, 46000 petaling jaya, selangor",
        schedule: {
            1: { startTime: 835, endTime: 1730 },
            2: { startTime: 835, endTime: 1730 },
            3: { startTime: 835, endTime: 1730 },
            4: { startTime: 835, endTime: 1730 },
            5: { startTime: 835, endTime: 1730 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.0741329, longitude: 101.62934169999994 },
        arrival: { latitude: 3.1326988, longitude: 101.67225259999998 },
        type: "rider"
    }, {
        id: "u9",
        name: "david james",
        phone: "016792111",
        address: "jalan pjs 10/11a, pjs 10, 46150 petaling jaya, selangor",
        schedule: {
            1: { startTime: 900, endTime: 1800 },
            2: { startTime: 900, endTime: 1800 },
            3: { startTime: 900, endTime: 1800 },
            4: { startTime: 900, endTime: 1800 },
            5: { startTime: 900, endTime: 1800 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.0766802, longitude: 101.60453519999999 },
        arrival: { latitude: 3.1326988, longitude: 101.67225259999998 },
        type: "rider"
    }, {
        id: "u10",
        name: "siva rao",
        phone: "019792111",
        address: "j446, jalan pjs 10/11a, pjs 10, 46150 petaling jaya, selangor",
        schedule: {
            1: { startTime: 850, endTime: 1800 },
            2: { startTime: 850, endTime: 1800 },
            3: { startTime: 850, endTime: 1800 },
            4: { startTime: 850, endTime: 1800 },
            5: { startTime: 850, endTime: 1800 },
            6: { startTime: NaN, endTime: NaN },
            7: { startTime: NaN, endTime: NaN }
        },
        departure: { latitude: 3.0766647, longitude: 101.60438899999997 },
        arrival: { latitude: 3.1326988, longitude: 101.67225259999998 },
        type: "rider"
    }
];
