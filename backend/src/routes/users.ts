import express from "express";
import { dbGetUserProfileByUid } from "../models/users.models";

const router = express.Router();

router.post("/", async (req, res) => {
    const {uid } = req.body;
    try {
        const profile =  await dbGetUserProfileByUid(uid)
        if(!profile) {
            return res.status(400).send("Profile not found")
        }

        return res.status(200).send(profile)
    } catch (error) {
        return res.status(500).send("Server error");
    }
});
