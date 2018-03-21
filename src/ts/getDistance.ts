import request from "request";

export function getDistance(origin: string, destinations: string[], callback: (err: any, distances: number[]) => void) {
    try {
        validate(origin);
        destinations.forEach((x) => validate(x));
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations.join("|")}`;
        request(url, (error, response, body) => {
            const json = JSON.parse(body);
            const distances = json
                .rows[0]
                .elements
                .map((x: any) => parseFloat(x.distance.text.split(" ")[0]));
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
