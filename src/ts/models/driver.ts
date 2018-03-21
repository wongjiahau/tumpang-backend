import { Car } from "./car";
import { Rider } from "./rider";

export class Driver extends Rider {
    public readonly car: Car;
}
