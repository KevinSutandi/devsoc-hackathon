import express from "express";
import { CustomRequest } from "../middleware/auth.middleware";
import { dbUpsertCalendar } from "../models/calendar.models";
import { dbCreateJournal } from "../models/journals.models";

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

export default router;
