export interface ICoordinate {
    latitude: number;
    longitude: number;
}

export class Coordinate {
    /**
     * Parse string input into Location
     * Input must be delimited by comma
     * E.g. "133.88,-129.23"
     * @static
     * @param {string} str
     * @memberof Location
     * @returns Location object
     */
    public static parse(str: string): ICoordinate {
        const toks = str.split(",");
        return {
            latitude: parseFloat(toks[0]),
            longitude: parseFloat(toks[1])
        };
    }

    public static stringify(c: ICoordinate): string {return `${c.latitude},${c.longitude}`; }

}
