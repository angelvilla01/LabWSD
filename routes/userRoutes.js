// routes/userRoutes.js

import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userController.js';
import { requireAdminAuth } from '../middlewares/auth.js';

userRouter.post('/postUser', requireAdminAuth, userController.postUser);
userRouter.get('/postUser', requireAdminAuth, (_req, res) => res.render('createUserFromAdmin'));
userRouter.get('/allUsers', requireAdminAuth, userController.getAllUsers);
userRouter.get('/', (_req, res) => res.render('./register.ejs'))
userRouter.get('/login', (_req, res) => res.render('./login.ejs'));
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.post('/delete/:userId', userController.delete);
userRouter.get('/management', requireAdminAuth,(_req, res) => res.render('user-management'));

export { userRouter };



