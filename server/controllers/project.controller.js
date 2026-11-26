import Project from '../models/project.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';

// POST /api/projects - add new project
const create = async (req, res) => {
  try {
    const project = await new Project(req.body).save();
    return res.status(201).json(project);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/projects - get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.json(projects);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// middleware - load project by id (runs after requireSignin on protected routes)
const projectByID = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/projects/:id - get project by id
const read = (req, res) => res.json(req.project);

// PUT /api/projects/:id - update project by id
const update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.project._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json(project);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/projects/:id - remove project by id
const remove = async (req, res) => {
  try {
    await req.project.deleteOne();
    return res.json({ message: 'Project deleted successfully', deleted: req.project });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/projects - remove all projects
const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    return res.json({ message: `${result.deletedCount} projects were deleted successfully` });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, projectByID, read, update, remove, removeAll };
