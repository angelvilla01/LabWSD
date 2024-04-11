import express from 'express';
export const notesRouter = express.Router();
import { upload } from '../utils/multer.js';
import { notesController } from '../controllers/notesController.js';
import { requireAuth } from '../middlewares/auth.js';


notesRouter.get('/', requireAuth, notesController.getAllNotes);
notesRouter.get('/new', requireAuth, (_req, res) => res.render('./new.ejs'));
notesRouter.get('/noteInfo/:noteId', requireAuth, (req, res) => notesController.getNoteById(req, res, './noteInfo.ejs'));
notesRouter.post('/new', requireAuth, notesController.createNote);
notesRouter.get('/edit/:noteId', requireAuth, (req, res) => notesController.getNoteById(req, res, './edit.ejs'));
notesRouter.post('/edit/:noteId', requireAuth, upload.single('image'), notesController.updateNote);
notesRouter.post('/delete/:noteId', requireAuth, notesController.deleteNote);

// Path: LabWSD/routes/notesRoutes.js

