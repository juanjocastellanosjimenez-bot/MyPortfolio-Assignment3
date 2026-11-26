import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

// POST /api/users - add new user (sign up)
const create = async (req, res) => {
  const { role, ...body } = req.body; // role can never be set from the request
  const user = new User(body);
  try {
    await user.save();
    return res.status(201).json({
      message: "Successfully signed up!",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/users - get all users
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// load the user by id and attach it as req.profile (runs after requireSignin)
const userByID = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/users/:id - get user by id
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// PUT /api/users/:id - update user by id
const update = async (req, res) => {
  try {
    let user = req.profile;
    const { role, ...body } = req.body; // role can never be changed from the request
    user = extend(user, body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/users/:id - remove user by id
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/users - remove all users
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    return res.json({ message: `${result.deletedCount} users were deleted successfully` });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, userByID, read, list, remove, update, removeAll };
