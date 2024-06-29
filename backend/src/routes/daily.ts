import express from "express";
import { CustomRequest } from "../middleware/auth.middleware";
import {
    dbGetCalandarByDate,
    dbUpsertCalendar,
} from "../models/calendar.models";
import { dbCreateJournal, dbGetJournalByDate } from "../models/journals.models";

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const { title, content, date, mood } = req.body;

        if (!title || !content || !date || !mood) {
            return res.status(400).send("Missing Variable");
        }

        await dbUpsertCalendar(date, customReq.token.uid, mood);
        await dbCreateJournal(customReq.token.uid, title, content, "", date);
    } catch (error) {
        return res.status(500).send(error);
    }

    return res.status(200).send("Success");
});

router.get("/", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const { date } = req.body;

        const journal = await dbGetJournalByDate(customReq.token.uid, date);
        const calendar = await dbGetCalandarByDate(customReq.token.uid, date);

        return res.status(200).send({ journal, calendar });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

export default router;
