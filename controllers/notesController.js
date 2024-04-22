import { NotesModel } from '../models/note.js';


export const notesController = {

  getAllNotesFromUser: async (req, res) => {
    try {
      const username = req.session.user.username;
      let notes = [];
      if (username === 'admin') 
      {
         notes = await NotesModel.getAllNotes();
      } else {
         notes = await NotesModel.getAllNotesOfUser(username);
      }


      res.render('./index.ejs', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

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
      console.log('req.body', req.body);
      const { title, content } = req.body;
      const updatedContent = content.replace(/src="\.\.\/uploads\//g, 'src="/uploads/');

      console.log('content', updatedContent);
      await NotesModel.createNote(title, updatedContent, req.session.user.username);
      res.redirect('/notes');
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
      res.redirect('/notes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteNote: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      await NotesModel.deleteNoteById(noteId);
      res.redirect('/notes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteAllNotes: async (username) => {
    try {
      
      console.log('username', username);
      await NotesModel.deleteAllNotes(username);
     
    } catch (err) {
      console.error(err);
      
    }
  },


};


