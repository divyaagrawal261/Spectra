import express from "express";
import { addEventsBatch } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/batch", addEventsBatch)

export default router;
