import express from "express";
import {
  eventOverview,
  eventsOverTime,
  topEvents,
  eventByPage,
  funnelStats
} from "../controllers/insights.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { requireProjectAccess } from "../middleware/projectAccess.middleware.js";

const router = express.Router();

router.get(
  "/:projectId/event/:eventName",
  requireAuth,
  requireProjectAccess,
  eventOverview
);

router.get(
  "/:projectId/event/:eventName/timeline",
  requireAuth,
  requireProjectAccess,
  eventsOverTime
);

router.get(
  "/:projectId/event/:eventName/pages",
  requireAuth,
  requireProjectAccess,
  eventByPage
);

router.post(
  "/:projectId/funnel",
  requireAuth,
  requireProjectAccess,
  funnelStats
);

router.get(
  "/:projectId/top-events",
  requireAuth,
  requireProjectAccess,
  topEvents
);

export default router;
