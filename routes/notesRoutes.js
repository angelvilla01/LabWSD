import express from 'express';
export const notesRouter = express.Router();

// Importar controlador
import { notesController } from '../controllers/notesController.js';

notesRouter.get('/', notesController.getAllNotes);
//notesRouter.get('/:noteId', notesController.getNoteById);
notesRouter.get('/new', (_req, res) => res.render('./new.ejs'));
notesRouter.get('/noteInfo/:noteId', notesController.getNoteById);
notesRouter.post('/new', notesController.createNote);
notesRouter.get('/edit/:noteId', notesController.editNote);
notesRouter.post('/edit/:noteId', notesController.updateNote);
notesRouter.post('/delete/:noteId', notesController.deleteNote);

// module.exports = notesRouter;