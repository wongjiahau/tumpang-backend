import { IDriver } from "../../models/driver";
import { IRider } from "../../models/rider";

export interface ICreateUserRequest {
    data: IRider | IDriver;
}
