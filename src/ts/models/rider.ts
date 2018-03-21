export class Rider {
    public readonly id: string;
    public readonly name: string;
    public readonly phone: string;
    public readonly address: string;
    public readonly schedule: string;
    public readonly departure: string;
    public readonly arrival: string;
    public readonly type: "rider" | "driver";
}
