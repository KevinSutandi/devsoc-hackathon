import express from "express";
import { dbGetUserProfileByUid } from "../models/users.models";

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:uid", async (req, res) => {
    // TODO CHECK IF USER IS FRIENDS

    const { uid } = req.params;
    try {
        const profile = await dbGetUserProfileByUid(uid);
        if (!profile) {
            return res.status(400).send("Profile not found");
        }

        return res.status(200).send(profile);
    } catch (error) {
        return res.status(500).send("Server error");
    }
})

export default router;