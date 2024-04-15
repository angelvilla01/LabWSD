// routes/userRoutes.js

import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userController.js';

userRouter.get('/', (_req, res) => res.render('./register.ejs'))
userRouter.get('/login', (_req, res) => res.render('./login.ejs'));
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.post('/delete', userController.delete);
userRouter.get('/management', (_req, res) => res.render('user-management'));

export { userRouter };



