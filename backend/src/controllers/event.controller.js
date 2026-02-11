import Event from "../models/Event.js";
import Project from "../models/Project.js";

export const addEventsBatch = async (req, res) =>{
    try {
        console.log("Received events batch:", req.body);
        const apiKey = req.headers["x-api-key"];
        console.log("Received events batch with API key:", apiKey);

          if (!apiKey) return res.status(401).json({ error: "API key missing" });
        
          const project = await Project.findOne({ apiKey });
          if (!project) return res.status(403).json({ error: "Invalid API key" });

        const events = req.body;
    
        if (!Array.isArray(events)) {
          return res.status(400).json({ error: "Expected array of events" });
        }
    
        await Event.insertMany(events.map(event => ({ ...event, projectId: project._id })));
    
        res.status(200).json({ success: true });
      } catch (err) {
        console.error("Batch insert error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
}