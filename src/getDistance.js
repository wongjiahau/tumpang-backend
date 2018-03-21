function getDistance(origin, destinations, callback) {
    try {
        validate(origin);
        destinations.forEach(x => validate(x));
        var request = require('request');
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations.join('|')}`;
        request(url, function (error, response, body) {
            const json = JSON.parse(body);
            const distances = json
                .rows[0]
                .elements
                .map(x => parseFloat(x.distance.text.split(' ')[0]));
            callback(error, distances);
        });
    } catch (error) {
        callback(error);
    }
}

function validate(location) {
    if (/\s/.test(location)) {
        throw Error("Location should not contain spaces.");
    }
}

module.exports = getDistance;