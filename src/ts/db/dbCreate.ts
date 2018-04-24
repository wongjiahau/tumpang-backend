import { IRider, stringifyRider } from "./../models/rider";
import { Neo4jDb } from "./neo4jdb";

export class DBCreate extends Neo4jDb {
    public async createUser(user: IRider) {
        /**
         * Problems:
         * - This function does not create id for new user
         * - So, should the id be auto-generated?
         * - Btw, do we really need it since phone number is already unique?
         */
        const query = `CREATE (:User${stringifyRider(user)}) RETURN 0;`;
        const result = await this.sendQuery(query);
        return result;
    }
}
