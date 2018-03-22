export interface ISchedule {
    readonly startTime: number;
    readonly endTime: number;
}

export function parseSchedule(str: string): ISchedule[] {
    const result: ISchedule[] = [];
    str.split("|").forEach((x) => {
        const toks = x.split("-");
        result.push({
            startTime: parseInt(toks[0], 10),
            endTime: parseInt(toks[1], 10)
        });
    });
    return result;
}
