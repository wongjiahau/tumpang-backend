import { IDriver } from "./models/driver";
import { IRider } from "./models/rider";

export interface ICluster {
    driver: IDriver;
    riders: IRider[];
}
