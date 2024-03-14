import { NotesModel } from '../models/note.js';


export const notesController = {
  getAllNotes: async (_req, res) => {
    try {
      const notes = await NotesModel.getAllNotes();
      res.render('./index.ejs', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  getNoteById: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const note = await NotesModel.getNoteById(noteId);
      res.render('./noteInfo.ejs', { note });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  createNote: async (req, res) => {
    
    try {
      const { title, content } = req.body;
      const file = req.file;
      console.log(file);
      await NotesModel.createNote(title, content, file.filename );
      res.redirect('/notes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  editNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const note = await NotesModel.getNoteById(noteId);
      res.render('edit', { note });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  updateNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const { title, content } = req.body;
      await NotesModel.updateNoteById(noteId, title, content);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      await NotesModel.deleteNoteById(noteId);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};


