import express from "express";
import {
	createProject,
	listProjects
} from "../controllers/project.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuth, listProjects);
router.post("/", requireAuth, createProject);

export default router;
