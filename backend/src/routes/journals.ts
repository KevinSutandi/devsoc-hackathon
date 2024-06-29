import express from "express";
import { Request, Response } from "express";
import {
    dbCreateJournal,
    dbDeleteJournal,
    dbGetAllJournals,
    dbGetJournalById,
    dbUpdateJournal,
} from "../models/journals.models";
import { CustomRequest } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }
        const journals = await dbGetAllJournals(customReq.token.uid);
        return res.send(journals);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});

router.post("/create", async (req: Request, res: Response) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }
        const { title, content, image } = req.body;
        const date = new Date(req.body.date);

        if (!title) {
            return res.status(400).send("Empty title");
        }

        if (!content) {
            return res.status(400).send("Empty content");
        }

        if (!date) {
            return res.status(400).send("Current date was not parsed");
        }

        const journal = await dbCreateJournal(
            customReq.token.uid,
            title,
            content,
            image,
            date,
        );
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
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const journalId = parseInt(req.params.id);
        const { title, content, image } = req.body;

        const currJournal = await dbGetJournalById(journalId);

        if (!currJournal) {
            return res.status(404).send("No journal found");
        }

        const journal = await dbUpdateJournal(
            journalId,
            title || currJournal.title,
            content || currJournal.content,
            image || currJournal.image,
        );

        return res.send(journal);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const journalId = parseInt(req.params.id);

        const currJournal = await dbGetJournalById(journalId);

        if (!currJournal) {
            return res.status(404).send("No journal found");
        }

        await dbDeleteJournal(journalId);

        return res.send("Deletion successful");
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});
export default router;
