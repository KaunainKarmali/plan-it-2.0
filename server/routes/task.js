import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateDuration,
} from "../controllers/task.js";

const router = express.Router();

router.post("/create-task", createTask);
router.put("/update-duration", updateDuration);
router.get("/get-tasks", getTasks);
router.get("/get-task-by-id", getTaskById);

export default router;
