import { ICluster } from "./cluster";
import { DBRetrieve } from "./db/dbRetrieve";
import { DBUpdate } from "./db/dbUpdate";
import { getDistance } from "./getDistance";
import { Coordinate } from "./models/coordinate";
import { connection } from "./mysqldb";
import { RideMaker } from "./rideMaker";

export async function runMatchMaking() {
    const db = new DBRetrieve();
    const riders = await db.fetchRiders();
    const drivers = await db.fetchDrivers();
    const dateOfTomorrow = new Date();
    dateOfTomorrow.setDate((new Date()).getDate() + 1);
    const dayOfTomorrow = dateOfTomorrow.getDay();
    const eligibleRiders = riders.filter((r) => !isNaN(r.schedule[dayOfTomorrow].startTime));
    const eligibleDrivers = drivers.filter((d) => !isNaN(d.schedule[dayOfTomorrow].startTime));
    // getDistance(eligibleDrivers.map((d) => Coordinate.stringify(d.departure)))
    const clusters = new RideMaker().findCluster(dayOfTomorrow, eligibleRiders, eligibleDrivers);
    // const cleanseClusters: ICluster[] = [];
    // clusters.forEach((c) => {
    //     const distances
    // });
    const simplifiedClusters =
        clusters.map((x) => ({driverId: x.driver.id, ridersIds: x.riders.map((r) => r.id)}));
    simplifiedClusters.forEach((c) => {
        c.ridersIds.forEach(async (riderId) => {
            await new DBUpdate().LinkDriverToRider(c.driverId, riderId);
        });
    });
}
