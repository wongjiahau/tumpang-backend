export interface INeo4jDb {
    sendQuery(query: string): Promise<any>;
}

export class Neo4jDb implements INeo4jDb {
    public sendQuery(query: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const request = require("request");
            request("http://localhost:7474/db/data/transaction/commit", {
                json: {
                    statements: [{ statement: query }]
                },
                method: "POST"
            }, (error: any, response: any, body: any) => {
                if (error) {
                     reject(error);
                } else {
                     resolve(body.results[0].data);
                }
            });
        });
    }

}
