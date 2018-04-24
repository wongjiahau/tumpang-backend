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

export function stringifySchedule(schedules: {[index: number]: ISchedule}): string {
    let result = "";
    const padToFour = (num: number): string => ("000" + num).slice(-4);
    for (const key in schedules) {
        if (schedules.hasOwnProperty(key)) {
            const startTime = schedules[key].startTime;
            if (isNaN(startTime)) {
                result += "-|";
                continue;
            }
            result += padToFour(startTime);
            result += "-";
            result += padToFour(schedules[key].endTime);
            result += "|";
        }
    }
    return result.slice(0, result.length - 1);
}
