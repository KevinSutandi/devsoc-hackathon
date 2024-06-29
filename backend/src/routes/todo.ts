import express from "express";
import { CustomRequest } from "../middleware/auth.middleware";
import {
    dbCreateTodo,
    dbDeleteTodo,
    dbGetAllTodos,
    dbGetTodoById,
    dbUpdateTodo,
} from "../models/todo.models";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const todos = await dbGetAllTodos(customReq.token.uid);

        return res.status(200).send(todos);
    } catch (error) {
        console.log(error);
        return res.status(500).send("All error");
    }
});

router.get("/create", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const { note } = req.body;

        if (!note) {
            return res.status(400).send("Missing");
        }

        await dbCreateTodo(customReq.token.uid, note);
        return res.status(200).send("success");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});

router.put("/update", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const { note, check, id } = req.body;

        if (!note || !check || !id) {
            return res.status(400).send("Missing");
        }

        if (!(await dbGetTodoById(id))) {
            return res.status(400).send("Invalid Id");
        }

        await dbUpdateTodo(id, customReq.token.uid, note, check);
        return res.status(200).send("success");
    } catch (error) {
        console.log(error);
        return res.status(500).send("internal server err");
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const customReq = req as CustomRequest;
        if (!customReq.token || typeof customReq.token === "string") {
            throw new Error("Token is not valid");
        }

        const { id } = req.body;

        if (!id) {
            return res.status(400).send("Missing");
        }

        if (!(await dbGetTodoById(id))) {
            return res.status(400).send("Invalid Id");
        }

        await dbDeleteTodo(customReq.token.uid, id);
        return res.status(200).send("success");
    } catch (error) {
        console.log(error);
        return res.status(500).send("internal server err");
    }
});

export default router;
