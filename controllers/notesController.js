import { NotesModel } from '../models/note.js';
import { ShareModel } from '../models/share.js';



export const notesController = {

  getAllNotesFromUser: async (req, res) => {
    try {
      const username = req.session.user.username;
      let notes = [];
      let shareBtnVisible = true;
      if (username === 'admin') 
      {
         shareBtnVisible = false;
         notes = await NotesModel.getAllNotes();
      } else {
         notes = await NotesModel.getAllNotesOfUser(username);
      }



      res.render('./index.ejs', { notes, username, shareBtnVisible });
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
      res.render(view, { note });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  getNotesByIds: async (notesIds) => {
    try {
      const note = await NotesModel.getNotesByIds(notesIds);
      return note;
    } catch (err) {
      console.error(err);
    }
  },


  createNote: async (req, res) => {
    try {
      
      const { title, content } = req.body;
      //this is done to use the proper way to use the uploads route...
      const updatedContent = content.replace(/src="\.\.\/uploads\//g, 'src="/uploads/');

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
      await NotesModel.deleteNoteFromCollections(noteId);
      await ShareModel.deleteShareByNoteId(noteId);
      res.redirect('/notes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteAllNotes: async (username) => {
    try {
      

      const notes = await NotesModel.getAllNotesOfUser(username);
      for (const noteId of notes) {
        await ShareModel.deleteShareByNoteId(noteId.id);
      }
      await NotesModel.deleteAllNotes(username);
     
    } catch (err) {
      console.error(err);
      
    }
  },


};


