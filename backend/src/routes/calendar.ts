import express from "express";
import {
    dbGetCalendarByUid,
    dbGetMonthByUid,
    dbUpsertCalendar,
} from "../models/calendar.models";
import { CustomRequest } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/month", async (req, res) => {
    const date = new Date(req.query.date as string);
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }
        const data = await dbGetMonthByUid(customReq.token.uid, date);

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error");
    }
});

router.get("/", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }
        const data = await dbGetCalendarByUid(customReq.token.uid);

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error");
    }
});

router.post("/log", async (req, res) => {
    try {
        const { mood } = req.body;
        const date = new Date(req.body.date);

        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const data = await dbUpsertCalendar(date, customReq.token.uid, mood);

        return res.status(200).send(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

export default router;
