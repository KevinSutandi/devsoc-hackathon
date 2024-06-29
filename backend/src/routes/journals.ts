import express from "express";
import { Request, Response } from "express";
import { dbGetAllJournals } from "../models/journals.models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;

        if (!uid) {
            return res.status(404).send("Profile not found");
        }

        const journals = await dbGetAllJournals(uid);
        return res.send(journals);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
});

export default router;
