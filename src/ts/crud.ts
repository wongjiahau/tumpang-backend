import express from "express";
import { DBCreate } from "./db/dbCreate";
import { DBLogin } from "./db/dbLogin";
import { ICreateUserRequest } from "./interfaces/crud/createUserRequest";
import { ILoginRequest } from "./interfaces/crud/loginRequest";

export function addCrudFunction(app: express.Express): void {
    app.post("/login", async (req, res) => {
        try {
            const loginRequest = req.body as ILoginRequest;
            const db = new DBLogin();
            const result = await db.login(loginRequest);
            res.send(result);
        } catch (error) {
            res.send("ERROR: " + error);
        }
    });

    app.post("/createUser", async (req, res) => {
        try {
            const createUserRequest = req.body as ICreateUserRequest;
            const db = new DBCreate();
            await db.createUser(createUserRequest.data);
        } catch (error) {
            res.send("ERROR: " + error);
        }
    });

    app.get("/retrieveUser", (req, res) => {
        res.send("Unimplemented yet");
    });

    app.get("/updateUser", (req, res) => {
        res.send("Unimplemented yet");
    });

    app.get("/deleteUser", (req, res) => {
        res.send("Unimplemented yet");
    });
}
