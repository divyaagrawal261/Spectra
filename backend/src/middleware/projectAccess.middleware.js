import Project from "../models/Project.js";

export const requireProjectAccess = async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  if (project.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Access denied" });
  }

  req.project = project;
  next();
};
