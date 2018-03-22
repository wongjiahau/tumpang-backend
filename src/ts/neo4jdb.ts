import { IDriver } from "./models/driver";
import {IRider} from "./models/rider";
export interface INeo4jDb {
    sendQueryToNeo4j(query: string, callback: (err: any, res: any, body: any) => void): void;
}
export class Neo4jDb implements INeo4jDb {
    public sendQueryToNeo4j(query: string, callback: (err: any, res: any, body: any) => void) {
        const request = require("request");
        request("http://localhost:7474/db/data/transaction/commit", {
            json: {
                statements: [
                    {
                        statement: query
                    }
                ]
            },
            method: "POST"
        }, (error: any, response: any, body: any) => {
            if (callback) {
                callback(error, response, body);
            }
        });
    }

    public fetchRiders(callback: (error: any, riders: IRider[]) => void) {
        this.sendQueryToNeo4j("MATCH (rider:User{type:'rider'}) return rider;", (err, res, body) => {
            const data: any[] = body.results[0].data;
            const riders: any[] = [];
            data.forEach((x) => {
                const row = x.row[0];
                const r: IRider = {
                    id:        row.id,
                    name:      row.name,
                    phone:     row.phone,
                    address:   row.address,
                    schedule:  row.schedule,
                    departure: row.departure,
                    arrival:   row.arrival,
                    type:      row.type
                };
                riders.push(r);
            });
            callback(err, riders);
        });
    }

    public fetchDrivers(callback: (error: any, riders: IRider[]) => void) {
        this.sendQueryToNeo4j("MATCH (driver:User{type:'driver'})-[:OWNS]->(car) return driver, car;", (err, res, body) => {
            const data: any[] = body.results[0].data;
            const drivers: any[] = [];
            data.forEach((x) => {
                const driverData = x.row[0];
                const carData = x.row[1];
                const r: IDriver = {
                    id:        driverData.id,
                    name:      driverData.name,
                    phone:     driverData.phone,
                    address:   driverData.address,
                    schedule:  driverData.schedule,
                    departure: driverData.departure,
                    arrival:   driverData.arrival,
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
            callback(err, drivers);
        });
    }

}
