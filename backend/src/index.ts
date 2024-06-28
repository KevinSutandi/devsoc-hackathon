import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/api/get", (req: Request, res: Response) => {
  return res.json({ message: "hi" });
});

app.post("/api/post", (req: Request, res: Response) => {
  const value = req.body.value;

  if (value) {
    return res.json({ value });
  }

  return res.json({ value: "No value" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
