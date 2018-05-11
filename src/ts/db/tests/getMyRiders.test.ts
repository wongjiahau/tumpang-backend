import { expect } from "chai";
import { runMatchMaking } from "../../runMatchMaking";
import {getMyRiders} from "../getMyRiders";
import { setupTest } from "./setupTest";

describe("getMyRiders", () => {
    beforeEach((done) => {
        setupTest();
        setTimeout(async () => {
            await runMatchMaking();
        }, 400);
        setTimeout(() => done(), 800);
    } );
    it("case 1", async () => {
        const result = await getMyRiders("0123456789"); // phone number of jackson
        expect(result.sort((x: any) => x.name)).to.deep.eq([
            {
                name: "aiman",
                company: "Queen's College KL",
                checkpoint: "Mentari",
                distance: "pending"
            },
            {
                name: "peter",
                company: "Queen's College KL",
                checkpoint: "Masjid Bandar Sunway",
                distance: "pending"
            }
        ]);
    });
});
