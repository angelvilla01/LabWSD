import { NotesModel } from '../models/note.js';


export const notesController = {
  getAllNotes: async (_req, res) => {
    try {
      const notes = await NotesModel.getAllNotes();

     
        notes.forEach(note => {
          if (note.list)
            note.list = note.list.split(',').map(item => item.trim());
        });
      
      /*  console.log(notes); */
      res.render('./index.ejs', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  getNoteById: async (req, res, view) => {
    try {
      const noteId = req.params.noteId;
      const note = await NotesModel.getNoteById(noteId);
      if (note.list)
        note.list = note.list.split(',').map(item => item.trim());
      res.render(view, { note });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },


  createNote: async (req, res) => {
    try {
      const { title, content, list} = req.body;
      const file = req.file;

      const filename = file ? file.filename : null;
      await NotesModel.createNote(title, content, filename, list);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },


  updateNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const note = await NotesModel.getNoteById(noteId);

      const { title, content, list} = req.body;

      const file = req.file;
      let filename = file ? file.filename : null;

      console.log('filename', filename);

      if (filename === null)
        filename = note.image_id;

      await NotesModel.updateNoteById(noteId, title, content, filename, list);
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


