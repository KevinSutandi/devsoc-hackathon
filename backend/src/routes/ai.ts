import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { dbGetAllJournals } from "../models/journals.models";
import { CustomRequest } from "../middleware/auth.middleware";

dotenv.config();

const router = express.Router();

const apiKey = process.env.GOOGLE_API_KEY?.toString();
const configuration = new GoogleGenerativeAI(apiKey as string);
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

const combineJournals = async (uid: string, limit?: number) => {
    try {
        const journals = await dbGetAllJournals(uid, limit);
        return journals
            .map((journal) => `${journal.title}: ${journal.content}`)
            .join("\n");
    } catch (error) {
        console.error("Error fetching journals:", error);
        throw error;
    }
};

export const generateResponse = async (req: Request, res: Response) => {
    try {
        const customReq = req as CustomRequest;

        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const chat = model.startChat();

        const textForAI = combineJournals(customReq.token.uid, 7);

        const prompt = `Pretend you're a therapist. This is your patient journals. Give a short advice to your patient.
        Remove the heading on your response
        ${textForAI}`;

        const result = await chat.sendMessage(prompt);
        const responseText = result.response.text();

        res.send(responseText);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error ${error}`);
    }
};

router.post("/", generateResponse);

export default router;
