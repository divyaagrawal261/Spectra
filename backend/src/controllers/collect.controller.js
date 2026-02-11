import Project from "../models/Project.js";
import Event from "../models/Event.js";

export const collectEvent = async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  console.log("Received event with API key:", apiKey);
  if (!apiKey) return res.status(401).json({ error: "API key missing" });

  const project = await Project.findOne({ apiKey });
  if (!project) return res.status(403).json({ error: "Invalid API key" });

  const {
    name,
    payload,
    page
  } = req.body;


  await Event.create({
    projectId: project._id,
    name,
    payload,
    page
  });

  res.json({ success: true });
};
