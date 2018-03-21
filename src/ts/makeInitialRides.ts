import { getDistance } from "./getDistance";
import {connection} from "./mysqldb";
import { INeo4jDb } from "./neo4jdb";
const MAX_FETCHING_DISTANCE = 2; // km

function makeInitialRides(neo4jdb: INeo4jDb) {
    neo4jdb.sendQueryToNeo4j("match (n:User) return n;", (err, res, body) => {
        const data = body.results[0].data;
        const allUsers: any[] = [];
        data.forEach((o: any) => {
            const user = o.row[0];
            allUsers.push(user);
        });
        const riders = allUsers.filter((x) => x.type === "rider");
        const drivers = allUsers.filter((x) => x.type === "driver");
        drivers.forEach((d) => {
            getDistance(d.departure, riders.map((r) => r.departure), (distances) => {
                distances.forEach((distance: number, index: number) => {
                    console.log(distance);
                });
            });
            // const nearbyRiders = riders.filter((r) => getDistance(d.departure,
            // r.departure) <= MAX_FETCHING_DISTANCE);
        });
    });
}

// This function is only for testing
function populateNeo4jFromMysql(neo4jdb: INeo4jDb) {
    connection.query("select * from user u inner join userdetails ud on u.id=ud.userid;", (error, results, fields) => {
        populateUserNodeToNeo4j(results);
    });

    function populateUserNodeToNeo4j(users: any[]) {
        neo4jdb.sendQueryToNeo4j("match (n:User) delete n;", (err, res, body) => {/*do nothing*/}); // delete every user
        users.forEach((r) => {
            let query = `create (:User${JSON.stringify(r)});`;
            query = query.replace(/\"([^(\")"]+)\":/g, "$1:"); // remove quotes on property, because neo4j don't accept it
            console.log(query);
            neo4jdb.sendQueryToNeo4j(query, (err, res, body) => {
                if (err) {
                    console.log(err);
                }
                },
            ); // add every user as node to neo4j
        });
    }
}
