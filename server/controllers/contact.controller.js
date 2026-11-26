import Contact from '../models/contact.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';

// POST /api/contacts - add new contact
const create = async (req, res) => {
  try {
    const contact = await new Contact(req.body).save();
    return res.status(201).json(contact);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/contacts - get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// middleware - load contact by id (runs after requireSignin on protected routes)
const contactByID = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/contacts/:id - get contact by id
const read = (req, res) => res.json(req.contact);

// PUT /api/contacts/:id - update contact by id
const update = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.contact._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json(contact);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/contacts/:id - remove contact by id
const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    return res.json({ message: 'Contact deleted successfully', deleted: req.contact });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/contacts - remove all contacts
const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    return res.json({ message: `${result.deletedCount} contacts were deleted successfully` });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, contactByID, read, update, remove, removeAll };
