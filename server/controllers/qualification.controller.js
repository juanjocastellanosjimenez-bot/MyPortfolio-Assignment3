import Qualification from '../models/qualification.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';

// POST /api/qualifications - add new qualification
const create = async (req, res) => {
  try {
    const qualification = await new Qualification(req.body).save();
    return res.status(201).json(qualification);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/qualifications - get all qualifications
const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    return res.json(qualifications);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// middleware - load qualification by id (runs after requireSignin on protected routes)
const qualificationByID = async (req, res, next) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) return res.status(404).json({ error: 'Qualification not found' });
    req.qualification = qualification;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/qualifications/:id - get qualification by id
const read = (req, res) => res.json(req.qualification);

// PUT /api/qualifications/:id - update qualification by id
const update = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(req.qualification._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json(qualification);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/qualifications/:id - remove qualification by id
const remove = async (req, res) => {
  try {
    await req.qualification.deleteOne();
    return res.json({ message: 'Qualification deleted successfully', deleted: req.qualification });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/qualifications - remove all qualifications
const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    return res.json({ message: `${result.deletedCount} qualifications were deleted successfully` });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, qualificationByID, read, update, remove, removeAll };
