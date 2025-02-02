import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import users from "./routes/users";
import { authMiddleWare } from "./middleware/auth.middleware";
import journals from "./routes/journals";
import calendar from "./routes/calendar";
import ai from "./routes/ai";
import daily from "./routes/daily";
import todo from "./routes/todo";
import leaderboard from "./routes/leaderboard";

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
app.use("/api/ai", authMiddleWare, ai);
app.use("/api/daily", authMiddleWare, daily);
app.use("/api/todo", authMiddleWare, todo);
app.use("/api/leaderboard", authMiddleWare, leaderboard);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
