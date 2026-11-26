import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/users")
  .get(userCtrl.list)
  .post(userCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.removeAll);

router
  .route("/api/users/:id")
  .get(authCtrl.requireSignin, userCtrl.userByID, userCtrl.read)
  .put(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.remove);

export default router;
