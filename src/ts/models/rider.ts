import { ICoordinate } from "./coordinate";
import { ISchedule } from "./schedule";

export interface IRider {
    readonly id: string;
    name: string;  // *See below
    readonly phone: string;
    readonly address: string;
    readonly schedule: {[index: number]: ISchedule};
    readonly departure: ICoordinate;
    readonly arrival: ICoordinate;
    type: "rider" | "driver"; // *See below
}

// * make as non-readonly because for unit testing
