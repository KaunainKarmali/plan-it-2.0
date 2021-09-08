import express from "express";
import { createList, getLists } from "../controllers/list.js";

const router = express.Router();

router.post("/create-list", createList);
router.get("/get-lists", getLists);

export default router;
