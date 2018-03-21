import request from "request";

export function getDistance(origins: string[], destinations: string[], callback: (err: any, distances: number[]) => void) {
    try {
        origins = origins.map((x) => x.replace(" ", ""));
        destinations = destinations.map((x) => x.replace(" ", ""));
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins.join("|")}&destinations=${destinations.join("|")}`;
        console.log(url);
        request(url, (error, response, body) => {
            const json = JSON.parse(body);
            const distances: any[] = [];
            json.rows.forEach((r: any) => {
                 distances.push(r
                .elements
                .map((x: any) => parseFloat(x.distance.text.split(" ")[0])));
            });
            callback(error, distances);
        });
    } catch (error) {
        callback(error, []);
    }
}

function validate(location: string) {
    if (/\s/.test(location)) {
        throw Error("Location should not contain spaces.");
    }
}
