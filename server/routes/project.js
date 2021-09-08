import express from "express";
import { createProject, getProjects } from "../controllers/project.js";

const router = express.Router();

router.get("/get-projects", getProjects);
router.post("/create-project", createProject);

export default router;
