import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const configuration = new GoogleGenerativeAI(
    process.env.GOOGLE_API_KEY as string,
);
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

const conversationContext: any[] = [];
const currentMessages: any[] = [];

export const generateResponse = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        for (const [inputText, responseText] of conversationContext) {
            currentMessages.push({ role: "user", parts: inputText });
            currentMessages.push({ role: "model", parts: responseText });
        }

        const chat = model.startChat({
            history: currentMessages,
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const responseText = response.text();

        // Stores the conversation
        conversationContext.push([prompt, responseText]);

        res.send({ response: responseText });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

router.post("/generate", generateResponse);

export default router;
