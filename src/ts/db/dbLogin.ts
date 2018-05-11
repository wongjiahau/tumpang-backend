import { ILoginRequest } from "../interfaces/crud/loginRequest";
import { Neo4jDb } from "./neo4jdb";

export class DBLogin extends Neo4jDb {
    public async login(loginRequest: ILoginRequest): Promise<{ok: boolean, message: string}> {
        const query = `match (n:User{phone:"${loginRequest.phoneNumber}"}) return n;`;
        const response = await this.sendQuery(query) as any[];
        const result = {ok: false, message: "Unauthorized user."};
        if (response.length > 0) {
            result.ok = true;
            result.message = "Success";
        }
        return new Promise<any>((resolve, reject) => {
            resolve(result);
        });
    }
}
