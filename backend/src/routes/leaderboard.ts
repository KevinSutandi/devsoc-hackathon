import express from "express";
import {
    dbGetMyHapiness,
    dbGetTopHappiness,
} from "../models/leaderboard.models";
import { CustomRequest } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const top = await dbGetTopHappiness();
        res.status(200).send(top);
    } catch (error) {
        res.status(500).send("Error Server");
    }
});

router.get("/", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const top = await dbGetMyHapiness(customReq.token.uid);
        res.status(200).send(top);
    } catch (error) {
        res.status(500).send("Error Server");
    }
});

export default router;
