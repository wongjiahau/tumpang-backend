import { Coordinate, ICoordinate } from "./coordinate";
import { ISchedule, stringifySchedule } from "./schedule";

export interface IRider {
    readonly id?: string;
    name: string;  // *See below
    company?: string;
    currentKms?: number;
    readonly phone: string;
    readonly address: string;
    readonly schedule: {[index: number]: ISchedule};
    readonly departure: ICoordinate;
    readonly arrival: ICoordinate;
    type: "rider" | "driver"; // *See below
}

// * make as non-readonly because for unit testing

export function stringifyRider(rider: IRider): string {
    return `{
name:"${rider.name}",
phone:"${rider.phone}",
schedule:"${stringifySchedule(rider.schedule)}",
departure:"${Coordinate.stringify(rider.departure)}",
arrival:"${Coordinate.stringify(rider.arrival)}",
company:"${rider.company}",
type:"${rider.type}",
address:"${rider.address}"
}`.replace("\n", "");

}
