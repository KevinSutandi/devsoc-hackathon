import express from "express";
import { Request, Response } from "express";
import {
    dbCreateJournal,
    dbGetAllJournals,
    dbGetJournalById,
} from "../models/journals.models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;

        if (!uid) {
            return res.status(400).send("Empty uid");
        }

        const journals = await dbGetAllJournals(uid);
        return res.send(journals);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { uid, title, content, image } = req.body;

        if (!uid) {
            return res.status(400).send("Empty uid");
        }

        if (!title) {
            return res.status(400).send("Empty title");
        }

        if (!content) {
            return res.status(400).send("Empty content");
        }

        const journal = await dbCreateJournal(uid, title, content, image);

        return res.send(journal);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const journalId = req.params.id;

        const journal = await dbGetJournalById(parseInt(journalId));

        if (!journal) {
            return res.status(404).send("No journal found");
        }

        return res.send(journal);
    } catch (error) {}
});

export default router;
