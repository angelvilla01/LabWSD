import { notesModel } from '../models/note.js';

export const notesController = {
  getAllNotes: async (req, res) => {
    try {
      const notes = await notesModel.getAllNotes();
      res.render('./index.ejs', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  createNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      await notesModel.createNote(title, content);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  editNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const note = await notesModel.getNoteById(noteId);
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
      await notesModel.updateNoteById(noteId, title, content);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      await notesModel.deleteNoteById(noteId);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};


