import { expect } from "chai";
import { DBLogin } from "../dbLogin";

describe("dbLogin", () => {
    describe("login", () => {
        it("positive case", async () => {
            const db = new DBLogin();
            const PHONE_NUMBER_THAT_EXISTS = "0123456789";
            const result = await db.login({phoneNumber: PHONE_NUMBER_THAT_EXISTS});
            expect(result.ok).to.eq(true);
        });

        it("negative case", async () => {
            const db = new DBLogin();
            const PHONE_NUMBER_THAT_DONT_EXISTS = "999";
            const result = await db.login({phoneNumber: PHONE_NUMBER_THAT_DONT_EXISTS});
            expect(result.ok).to.eq(false);
            expect(result.message).to.eq("Unauthorized user.");
        });

    });

});
