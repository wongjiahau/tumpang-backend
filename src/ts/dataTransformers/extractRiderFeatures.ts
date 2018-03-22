import { IRider } from "./../models/rider";
import {flattenTime} from "./flattenTime";
export function extractRiderFeatures(rider: IRider, day: number ): number[] {
    return [
        rider.departure.latitude,
        rider.departure.longitude,
        rider.arrival.latitude,
        rider.arrival.longitude,
        flattenTime(rider.schedule[day].startTime),
        flattenTime(rider.schedule[day].endTime),
    ];
}
