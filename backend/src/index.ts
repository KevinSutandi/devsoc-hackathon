import express from "express";
import { Request, Response } from "express";
import { authMiddleWare } from "./middleware/auth.middleware";
import cors from "cors";
import auth from "./routes/auth";

const app = express();
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
