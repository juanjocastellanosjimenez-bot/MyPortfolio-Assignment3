import express from 'express';
import qualificationCtrl from '../controllers/qualification.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router
  .route('/api/qualifications')
  .get(qualificationCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.removeAll);

router
  .route('/api/qualifications/:id')
  .get(qualificationCtrl.qualificationByID, qualificationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.qualificationByID, qualificationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.qualificationByID, qualificationCtrl.remove);

export default router;
