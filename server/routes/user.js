import express from "express";
import { getUser, createUser } from "../controllers/user.js";

const router = express.Router();

router.get("/get-user", getUser);
router.post("/create-user", createUser);

export default router;
