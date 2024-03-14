import express from 'express';
export const notesRouter = express.Router();
import { upload } from '../utils/multer.js';
import { notesController } from '../controllers/notesController.js';

notesRouter.get('/', notesController.getAllNotes);
notesRouter.get('/new', (_req, res) => res.render('./new.ejs'));
notesRouter.get('/noteInfo/:noteId', notesController.getNoteById);
notesRouter.post('/new', upload.single('image'),notesController.createNote);
notesRouter.get('/edit/:noteId', notesController.updateNote);
notesRouter.post('/edit/:noteId', notesController.updateNote);
notesRouter.post('/delete/:noteId', notesController.deleteNote);

//module.exports = notesRouter;

