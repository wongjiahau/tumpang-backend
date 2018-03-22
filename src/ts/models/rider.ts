import { ISchedule } from "./schedule";

export interface IRider {
    readonly id: string;
    readonly name: string;
    readonly phone: string;
    readonly address: string;
    readonly schedule: ISchedule[];
    readonly departure: string;
    readonly arrival: string;
    readonly type: "rider" | "driver";
}
