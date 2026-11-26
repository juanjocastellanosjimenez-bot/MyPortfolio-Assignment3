import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router
  .route('/api/contacts')
  .get(authCtrl.requireSignin, contactCtrl.list)
  .post(contactCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll);

router
  .route('/api/contacts/:id')
  .get(authCtrl.requireSignin, contactCtrl.contactByID, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.contactByID, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.contactByID, contactCtrl.remove);

export default router;
