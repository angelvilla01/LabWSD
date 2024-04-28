import { CollectionsModel } from '../models/collections.js';
import { NotesModel } from '../models/note.js';

export const collectionsController = {

    getAllCollectionsFromUser: async (req, res) => {
        try {
            const username = req.session.user.username;
            let collections = [];
            let notes = [];
            if (username === 'admin') {
                //notes = await NotesModel.getAllNotes();
            } else {
                collections = await CollectionsModel.getAllCollectionsOfUser(username);
                notes = await NotesModel.getAllNotesOfUser(username);
            }

            res.render('./collections.ejs', { collections, notes });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    
    addNoteToCollection: async (req, res) => {
        console.log('addNoteToCollection');
        try {
            const collectionId = req.params.collectionId;
            const noteId = req.params.noteId;
            await CollectionsModel.addNoteToCollection(collectionId, noteId);
            res.redirect('/notes/collections');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    showNotesToAdd: async (req, res) => {
        try {
            const user = req.session.user;
            const collectionId = req.params.collectionId;
            const notes = await CollectionsModel.getNotesToAdd(user.username, collectionId);
            console.log('collectionId', collectionId);
            console.log('user', user);
            console.log('notes', notes);
            res.render('./collectionNotes.ejs', { notes, collectionId });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    createCollection: async (req, res) => {
        try {
            const { name } = req.body;
            const username = req.session.user.username;
            await CollectionsModel.createCollection(name, username);
            res.redirect('/notes/collections');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    getNotesInCollection: async (req, res) => {
        try {
            console.log('getNotesInCollection');
            const collectionId = req.params.collectionId;
            const notes = await NotesModel.getNotesInCollection(collectionId);
            console.log('notes', notes);
            console.log('collectionId', collectionId);
            res.render('./showNotesInCollection.ejs', { notes });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteCollection: async (req, res) => {
        try {
            const collectionId = req.params.collectionId;
            await CollectionsModel.deleteCollectionById(collectionId);
            await CollectionsModel.updateNotesInCollection(collectionId);
            res.redirect('/notes/collections');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    //   getAllNotes: async (_req, res) => {
    //     try {
    //       const notes = await NotesModel.getAllNotes();


    //       notes.forEach(note => {
    //         if (note.list)
    //           note.list = note.list.split(',').map(item => item.trim());
    //       });

    //       /*  console.log(notes); */
    //       res.render('./index.ejs', { notes });
    //     } catch (err) {
    //       console.error(err);
    //       res.status(500).send('Internal Server Error');
    //     }
    //   },

    //   getNoteById: async (req, res, view) => {
    //     try {
    //       const noteId = req.params.noteId;
    //       const note = await NotesModel.getNoteById(noteId);
    //       if (note.list)
    //         note.list = note.list.split(',').map(item => item.trim());
    //       res.render(view, { note });
    //     } catch (err) {
    //       console.error(err);
    //       res.status(500).send('Internal Server Error');
    //     }
    //   },


    //   createNote: async (req, res) => {
    //     try {
    //       console.log('req.body', req.body);
    //       const { title, content } = req.body;
    //       const updatedContent = content.replace(/src="\.\.\/uploads\//g, 'src="/uploads/');

    //       console.log('content', updatedContent);
    //       await NotesModel.createNote(title, updatedContent, req.session.user.username);
    //       res.redirect('/notes');
    //     } catch (err) {
    //       console.error(err);
    //       res.status(500).send('Internal Server Error');
    //     }
    //   },



    //   updateNote: async (req, res) => {
    //     try {
    //       const noteId = req.params.noteId;
    //       const { title, content } = req.body;

    //       await NotesModel.updateNoteById(noteId, title, content);
    //       res.redirect('/notes');
    //     } catch (err) {
    //       console.error(err);
    //       res.status(500).send('Internal Server Error');
    //     }
    //   },

    //   deleteNote: async (req, res) => {
    //     try {
    //       const noteId = req.params.noteId;
    //       await NotesModel.deleteNoteById(noteId);
    //       res.redirect('/notes');
    //     } catch (err) {
    //       console.error(err);
    //       res.status(500).send('Internal Server Error');
    //     }
    //   },

    //   deleteAllNotes: async (username) => {
    //     try {

    //       console.log('username', username);
    //       await NotesModel.deleteAllNotes(username);

    //     } catch (err) {
    //       console.error(err);

    //     }
    //   },


};


