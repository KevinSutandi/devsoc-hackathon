import express from "express";
// import { Request, Response } from "express";
// import { authMiddleWare } from "./middleware/auth.middleware";
import cors from "cors";
import auth from "./routes/auth";
import users from "./routes/users";
import { authMiddleWare } from "./middleware/auth.middleware";
import journals from "./routes/journals";
import calendar from "./routes/calendar";
import airouter from "./routes/ai.routes";

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

app.use("/api/auth", auth);
app.use("/api/users", authMiddleWare, users);
app.use("/api/journals", authMiddleWare, journals);
app.use("/api/calendar", authMiddleWare, calendar);
app.use("/api/ai", authMiddleWare, airouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
