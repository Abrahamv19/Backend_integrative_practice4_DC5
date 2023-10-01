import express from 'express';
import UserController from '../controller/users.controller.js';
import { checkRequiredDocuments, isAdmin } from '../middleware/auth.js';
import { uploader } from '../middleware/multer.js';
const usersRouter = express.Router();
const userController = new UserController();

usersRouter.get('/admincontrol', isAdmin, userController.userDataBase);
usersRouter.get('/premium/:uid', isAdmin, userController.renderChangeUserRole);
usersRouter.post('/premium/:uid', isAdmin, checkRequiredDocuments, userController.changeUserRole);
usersRouter.post('/:uid/documents', uploader.array('documents'), userController.uploadDocuments);
usersRouter.post('/:uid/profile-image', uploader.single('profiles'), userController.uploadProfileImage);
usersRouter.post('/:uid/documents/:documentName', userController.completeDocument);

export default usersRouter;
