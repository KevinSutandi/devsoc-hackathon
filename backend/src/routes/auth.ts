import express from "express";
import validator from "validator";
import { sign } from "jsonwebtoken";
import { validateName, validatePassword } from "../utils/auth.utils";
import { sha256 } from "js-sha256";
import { dbAddUser, dbFindUserByEmail, dbFindUserByResetToken, dbSetNewPassword, dbSetResetToken } from "../models/auth.models";

const router = express.Router();

interface JwtUser {
  id: string;
  email: string;
}

router.post("/register", async (req, res) => {
  const { email, password, fullname } = req.body;

  if (!email || !password || !fullname) {
    return res.status(400).send("Some details are missing");
  }

  // Check if the fields are valid
  if (
    !validateName(fullname) ||
    !validator.isEmail(email) ||
    validatePassword(password)
  ) {
    return res.status(400).send("A field is invalid");
  }

  // Check if the email is already in use
  try {
    const profile = await dbFindUserByEmail(email);
    if (profile) {
      return res.status(400).send("Email already in use");
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }

  // Hash the password
  const hashedPassword = sha256(password);

  try {
    // Adds the user to the database
    const profile = await dbAddUser(email, hashedPassword);

    // Makes the token and sends it to the user
    const jwtUser: JwtUser = { id: profile.id, email: profile.email };
    if (!process.env.JWT_HASH) {
      throw new Error("JWT_HASH not defined");
    }
    const token = sign(jwtUser, process.env.JWT_HASH, { expiresIn: "1d" });
    res.cookie("token", token);
  } catch (error) {
    return res.status(500).send(error);
  }

  // Send a success message
  res.status(200).send("User registered");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send("Some details are missing");
    }
    
    // Check if the email is already in use
    try {
        const profile = await dbFindUserByEmail(email);
        if (!profile) {
        return res.status(400).send("Invalid email or password");
        }
        if (profile.password !== sha256(password)) {
        return res.status(400).send("Invalid email or password");
        }
    
        // Makes the token and sends it to the user
        const jwtUser: JwtUser = { id: profile.id, email: profile.email };
        if (!process.env.JWT_HASH) {
        throw new Error("JWT_HASH not defined");
        }
        const token = sign(jwtUser, process.env.JWT_HASH, { expiresIn: "1d" });
        res.cookie("token", token);
    } catch (error) {
        return res.status(500).send("Server error");
    }
    
    // Send a success message
    res.status(200).send("User logged in");
});

router.post("/reset-password", async (req, res) => {
    // Gets the email from the request body
    const { email } = req.body;

    // Check if the email is wrong
    if (!email || !validator.isEmail(email)) {
        return res.status(400).send("Email is required");
    }

    // Check if the email exists in the database
    const user = await dbFindUserByEmail(email);
    if (!user) {
        return res.status(400).send("Email is not registered");
    }

    // Generate a reset token
    const resetToken = sha256((Math.random() + 1).toString(36).substring(7));

    // TODO send an email with a reset link
    // Setting it in the db
    try {
        await dbSetResetToken(email, resetToken);
    } catch (error) {
        console.log("setting reset token issue");
        return res.status(500).send("Server error");
    }
    console.log("Reset token: " + resetToken);

    res.status(200).send("Reset link sent");
});

router.post("/change-password", async (req, res) => {
    const { resetToken, password } = req.body;

    if (!resetToken || !password) {
        return res.status(400).send("Reset token and password are required");
    }

    const hashedPassword = sha256(password);

    console.log("reseting password: ", resetToken, hashedPassword);

    // TODO check the reset token equals the one in the db
    try {
        const user = await dbFindUserByResetToken(resetToken);

        if (!user) {
            return res.status(400).send("Invalid reset token");
        }

        await dbSetNewPassword(resetToken, hashedPassword);
    } catch (error) {
        console.log("setting new password issue");
        return res.status(500).send("Server error");
    }
    res.status(200).send("Password changed");
});

export default router;
