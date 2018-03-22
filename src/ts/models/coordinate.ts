export interface ICoordinate {
    latitude: number;
    longitude: number;
}

export class Coordinate implements ICoordinate {
    /**
     * Parse string input into Location
     * Input must be delimited by comma
     * E.g. "133.88,-129.23"
     * @static
     * @param {string} str
     * @memberof Location
     * @returns Location object
     */
    public static parse(str: string): Coordinate {
        const toks = str.split(",");
        return new Coordinate(parseFloat(toks[0]), parseFloat(toks[1]));
    }

    public readonly latitude: number;
    public readonly longitude: number;
    public constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public toString(): string {
        return `${this.latitude},${this.longitude}`;
    }
    
}
