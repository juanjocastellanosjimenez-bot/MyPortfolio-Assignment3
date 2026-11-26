import express from 'express';
import projectCtrl from '../controllers/project.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router
  .route('/api/projects')
  .get(projectCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.removeAll);

router
  .route('/api/projects/:id')
  .get(projectCtrl.projectByID, projectCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.projectByID, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.projectByID, projectCtrl.remove);

export default router;
