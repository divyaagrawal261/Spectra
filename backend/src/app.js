import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import collectRoutes from "./routes/collect.routes.js";
import projectRoutes from "./routes/project.routes.js";
import insightsRoutes from "./routes/insights.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/events.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5173", "http://127.0.0.1:5500"],
  credentials: true
}));
app.use(express.json());

app.use("/api/collect", collectRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);



app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
