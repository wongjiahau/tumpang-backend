import { ICoordinate } from "./models/coordinate";

export function getNearestBusStop(coordinate: ICoordinate): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate.latitude},%20${coordinate.longitude}&key=AIzaSyDMtQ7jhQO3Zzb8o7m6I2TKd3F5PzfnAso&sensor=true&rankby=distance&types=bus_station`;
    return new Promise<any>((resolve, reject) => {
        const request = require("request");
        request(url, (error: any, response: any, body: any) => {
            if (error) {
                reject(error);
            }
            resolve(JSON.parse(body).results[0]);
        });
    });
}
