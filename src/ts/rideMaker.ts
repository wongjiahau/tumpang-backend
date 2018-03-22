const clusterMaker = require("clusters");
const hash = require("object-hash");
import { ICluster } from "./cluster";
import {extractUserFeatures} from "./dataTransformers/extractUserFeatures";
import { getDistance } from "./getDistance";
import { IDriver } from "./models/driver";
import { IRequest } from "./models/request";
import { IRider } from "./models/rider";
import { connection } from "./mysqldb";
import { INeo4jDb } from "./neo4jdb";

const MAX_FETCHING_DISTANCE = 2; // km

export class RideMaker {

    /**
     *
     * NOTE: This function assumes that there are no two users have the same features(arrival, departure, startTime, endTime)
     * @param {number} day
     * @param {IRider[]} riders
     * @param {IDriver[]} drivers
     * @returns {ICluster[]}
     * @memberof RideMaker
     */
    public findCluster(day: number, riders: IRider[], drivers: IDriver[]): ICluster[] {
        let resultClusters: ICluster[] = [];
        let allUsers: IRider[] = [];
        allUsers = allUsers.concat(riders);
        allUsers = allUsers.concat(drivers);
        const map: {[key: string]: IRider} = {};
        const feautures: number[][] = [];
        allUsers.forEach((user) => {
            const feature = extractUserFeatures(user, day);
            feautures.push(feature);
            const key = hash(feature);
            if (map[key]) {
                throw new Error("ERROR! Expected all users have unique features but detected 2 users to have the same set of features.");
            }
            map[hash(feature)] = user;
        });
        clusterMaker.k(drivers.length);
        clusterMaker.data(feautures);
        clusterMaker.clusters().forEach((cluster: {centroid: number, points: number[][]}) => {
            const usersInThisCluster = cluster.points.map((p) => map[hash(p)]);
            const driversInThisCluster = usersInThisCluster.filter((u) => u.type === "driver") as IDriver[];
            const ridersInThisCluster = usersInThisCluster.filter((u) => u.type === "rider");
            if (driversInThisCluster.length === 0) {
                /*skip this cluster*/
            } else if (driversInThisCluster.length > 1) {
                resultClusters = resultClusters.concat(this.findCluster(day, ridersInThisCluster, driversInThisCluster));
            } else if (driversInThisCluster.length === 1) {
                // I should do sorting here, but let's skip it for now
                const d = driversInThisCluster[0];
                resultClusters.push({
                    driver: d,
                    riders: ridersInThisCluster.slice(0, d.car.capacity)
                });
            }
        });
        return resultClusters;

    }
}

// This function is only for testing
export function populateNeo4jFromMysql(neo4jdb: INeo4jDb, callback: (res: any) => void) {
    connection.query("select * from user u inner join userdetails ud on u.id=ud.userid left join car c on u.id=c.userid inner join schedule s on u.id=s.userid;", (error, results, fields) => {
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
