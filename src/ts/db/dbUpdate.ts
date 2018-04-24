import { Neo4jDb } from "./neo4jdb";

export class DBUpdate extends Neo4jDb {
    public async LinkDriverToRider(driverId: string, riderId: string) {
        const query =
            "MATCH (driver{id:'" + driverId + "'})," +
            "(rider{id:'" + riderId + "'}) " +
            "CREATE (driver)-[:FETCHING]->(rider);";
        await this.sendQueryToNeo4j(query);
    }
}
