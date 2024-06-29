import express from "express";
import { dbGetMonthByUid, dbUpsertCalendar } from "../models/calendar.models";
import { CustomRequest } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/month", async (req, res) => {
    const { date } = req.query;
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        return await dbGetMonthByUid(
            customReq.token.uid,
            new Date(date as string),
        );
    } catch (error) {
        return res.status(500).send("Server error");
    }
});

router.post("/log", async (req, res) => {
    try {
        const { date, mood } = req.body;

        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        return await dbUpsertCalendar(date, customReq.token.uid, mood);
    } catch (error) {
        return res.status(500).send("Server error");
    }
});

export default router;
