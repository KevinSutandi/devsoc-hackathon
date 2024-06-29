import express from "express";
import {
    dbGetUserProfileByUid,
    dbUpdateUserProfile,
} from "../models/users.models";
import { CustomRequest } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * Route to get the user's profile
 */
router.get("/", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const profile = await dbGetUserProfileByUid(customReq.token.uid);
        if (!profile) {
            return res.status(400).send("Profile not found");
        }

        return res.status(200).send(profile);
    } catch (error) {
        return res.status(500).send("Server error");
    }
});

/**
 * Route to update the user's profile
 */
router.put("/", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const { fullname, image } = req.body;
        await dbUpdateUserProfile(customReq.token.uid, fullname, image);
    } catch (error) {}
});



// router.get("/:uid", async (req, res) => {
//     // TODO CHECK IF USER IS FRIENDS

//     const { uid } = req.params;
//     try {
//         const profile = await dbGetUserProfileByUid(uid);
//         if (!profile) {
//             return res.status(400).send("Profile not found");
//         }

//         return res.status(200).send(profile);
//     } catch (error) {
//         return res.status(500).send("Server error");
//     }
// })

export default router;
