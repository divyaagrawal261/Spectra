import Project from "../models/Project.js";
import { v4 as uuid } from "uuid";

export const createProject = async (req, res) => {
  const project = await Project.create({
    name: req.body.name,
    userId: req.user._id,
    apiKey: uuid()
  });

  res.status(201).json(project);
};

export const listProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user._id }).sort({
    createdAt: -1
  });

  res.json(projects);
};
