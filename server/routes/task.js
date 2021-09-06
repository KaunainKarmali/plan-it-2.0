import express from "express";
import { createTask, getTasks } from "../controllers/task.js";

const router = express.Router();

router.post("/create-task", createTask);
router.get("/get-tasks", getTasks);

export default router;
