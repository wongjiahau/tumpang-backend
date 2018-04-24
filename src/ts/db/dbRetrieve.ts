import { Coordinate } from "../models/coordinate";
import { IDriver } from "../models/driver";
import { IRider } from "../models/rider";
import { parseSchedule } from "../models/schedule";
import { Neo4jDb } from "./neo4jdb";

export class DBRetrieve extends Neo4jDb {

    public async fetchRiders(): Promise<IRider[]> {
        const data = await this.sendQueryToNeo4j("MATCH (rider:User{type:'rider'}) return rider;");
        const riders: any[] = [];
        data.forEach((x: any) => {
                const row = x.row[0];
                const r: IRider = {
                    id:        row.id,
                    name:      row.name,
                    phone:     row.phone,
                    address:   row.address,
                    schedule:  parseSchedule(row.schedule),
                    departure: Coordinate.parse(row.departure),
                    arrival:   Coordinate.parse(row.arrival),
                    type:      row.type
                };
                riders.push(r);
            });
        return new Promise<IRider[]>((resolve) => {
            resolve(riders);
        });
    }

    public async fetchDrivers(): Promise<IDriver[]> {
        const data = await this.sendQueryToNeo4j("MATCH (driver:User{type:'driver'})-[:OWNS]->(car) return driver, car;");
        const drivers: any[] = [];
        data.forEach((x: any) => {
            const driverData = x.row[0];
            const carData = x.row[1];
            const r: IDriver = {
                id:        driverData.id,
                name:      driverData.name,
                phone:     driverData.phone,
                address:   driverData.address,
                schedule:  parseSchedule(driverData.schedule),
                departure: Coordinate.parse(driverData.departure),
                arrival:   Coordinate.parse(driverData.arrival),
                type:      driverData.type,
                car: {
                    model   : carData.model,
                    capacity: carData.capacity,
                    plateNum: carData.platenum,
                    color   : carData.color
                }
            };
            drivers.push(r);
        });
        return new Promise<IDriver[]>((resolve) => {
            resolve(drivers);
        });
    }
}
