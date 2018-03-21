import { getDistance } from "./getDistance";
import { IRequest } from "./models/request";
import { connection } from "./mysqldb";
// import {connection} from "./mysqldb";
import { INeo4jDb } from "./neo4jdb";
const MAX_FETCHING_DISTANCE = 2; // km

export class RideMaker {
    public constructor(private neo4jdb: INeo4jDb) {}
    public makeInitialRides(callback: (requests: IRequest[]) => void) {
    this.neo4jdb.sendQueryToNeo4j("match (n:User) return n;", (err, res, body) => {
        const data = body.results[0].data;
        const allUsers: any[] = [];
        data.forEach((o: any) => {
            const user = o.row[0];
            allUsers.push(user);
        });
        const riders = allUsers.filter((x) => x.type === "rider");
        const drivers = allUsers.filter((x) => x.type === "driver");
        getDistance(drivers.map((d) => d.departure), riders.map((r) => r.departure), (error, distanceMatrix) => {
            distanceMatrix.forEach((distances, i) => {
                distances.forEach((d, j) => {
                    if (d <= MAX_FETCHING_DISTANCE) {
                        console.log(d);
                    }
                });

            });
            console.log(distanceMatrix);
                // distances.forEach((distance: number, index: number) => {
                //     console.log(distance);
                // });
        });
            // const nearbyRiders = riders.filter((r) => getDistance(d.departure,
            // r.departure) <= MAX_FETCHING_DISTANCE);
        });
    }
}

// This function is only for testing
export function populateNeo4jFromMysql(neo4jdb: INeo4jDb, callback: (res: any) => void) {
    connection.query("select * from user u inner join userdetails ud on u.id=ud.userid left join car c on u.id=c.userid;", (error, results, fields) => {
        populateUserNodeToNeo4j(results, callback);
    });

    function populateUserNodeToNeo4j(users: any[], callback2: (res: any) => void) {
        neo4jdb.sendQueryToNeo4j("match (n:User) delete n;", (err, res, body) => {/*do nothing*/}); // delete every user
        const queries: string[] = [];
        users.forEach((r) => {
            let query = `create (:User${JSON.stringify(r)});`;
            query = query.replace(/\"([^(\")"]+)\":/g, "$1:"); // remove quotes on property, because neo4j don't accept it
            queries.push(query);
            neo4jdb.sendQueryToNeo4j(query, (err, res, body) => {
                if (err) {
                    console.log(err);
                }
            }); // add every user as node to neo4j
        });
        callback2(queries);
    }
}
