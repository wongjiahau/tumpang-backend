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
                        statement: query,
                    },
                ],
            },
            method: "POST",
        }, (error: any, response: any, body: any) => {
            if (callback) {
                callback(error, response, body);
            }
        });
    }
}
