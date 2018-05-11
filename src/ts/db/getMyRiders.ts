import { getNearestBusStop } from "../getNearestBusStop";
import { Coordinate } from "../models/coordinate";
import { Neo4jDb } from "./neo4jdb";

export async function getMyRiders(phoneNumber: string): Promise<any> {
    const query = `match (n:User{phone:"${phoneNumber}"})-[:FETCHING]->(a) return a;`;
    console.log(query);
    const data = await new Neo4jDb().sendQuery(query);
    return new Promise<any>(async (resolve) => {
        const busStops = await Promise.all(data.map((x: any) => getNearestBusStop(Coordinate.parse(x.row[0].departure))));
        const result = await Promise.all(data
            .map((x: any) => x.row[0])
            .map((x: any, index: number) => {
                return {
                    name: x.name,
                    company: x.company,
                    checkpoint: (busStops[index] as any).name,
                    distance: "pending"
                };
            }));
        resolve(result);
    });

}
