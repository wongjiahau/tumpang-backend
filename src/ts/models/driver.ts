import { ICar } from "./car";
import { IRider } from "./rider";

export interface IDriver extends IRider {
    readonly car: ICar;
    distanceTo?: {[key: string]: number};
}
