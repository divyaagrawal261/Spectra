import express from "express";
import { collectEvent } from "../controllers/collect.controller.js";

const router = express.Router();

router.post("/", collectEvent);

export default router;
