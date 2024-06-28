import express from "express";
import validator from "validator";
import { sign } from "jsonwebtoken";
import { validateName, validatePassword } from "../utils/auth.utils";
import { sha256 } from "js-sha256";
import { dbAddUser, dbFindUserByEmail } from "../models/auth.models";

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

export default router;
