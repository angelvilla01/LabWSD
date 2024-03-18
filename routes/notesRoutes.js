import express from 'express';
export const notesRouter = express.Router();
import { upload } from '../utils/multer.js';
import { notesController } from '../controllers/notesController.js';

notesRouter.get('/', notesController.getAllNotes);
notesRouter.get('/new', (_req, res) => res.render('./new.ejs'));
notesRouter.get('/noteInfo/:noteId',(req,res) => notesController.getNoteById(req,res,'./noteInfo.ejs'));
notesRouter.post('/new', upload.single('image'),notesController.createNote);
notesRouter.get('/edit/:noteId', (req,res) => notesController.getNoteById(req,res,'./edit.ejs'));
notesRouter.post('/edit/:noteId', upload.single('image'), notesController.updateNote);
notesRouter.post('/delete/:noteId', notesController.deleteNote);

// Path: LabWSD/routes/notesRoutes.js

