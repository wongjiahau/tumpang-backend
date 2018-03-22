export interface ISchedule {
    startTime: number;
    readonly endTime: number;
}

export function parseSchedule(str: string): {[index: number]: ISchedule} {
    const result: {[index: number]: ISchedule} = {};
    str.split("|").forEach((x, index) => {
        const toks = x.split("-");
        result[index + 1] = {
            startTime: parseInt(toks[0], 10),
            endTime: parseInt(toks[1], 10)
        };
    });
    return result;
}
