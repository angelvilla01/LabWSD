import { CollectionsModel } from '../models/collections.js';
import { NotesModel } from '../models/note.js';

export const collectionsController = {

    getAllCollectionsFromUser: async (req, res) => {
        try {
            const username = req.session.user.username;
            let shareBtnVisible = true;
            let collections = [];
            let notes = [];
            if (username === 'admin') {
                shareBtnVisible = false;
                notes = await NotesModel.getAllNotes();
                collections = await CollectionsModel.getAllCollections();
                //notes = await NotesModel.getAllNotes();
            } else {
                collections = await CollectionsModel.getAllCollectionsOfUser(username);
                notes = await NotesModel.getAllNotesOfUser(username);
            }

            res.render('./collections.ejs', { collections, notes, username, shareBtnVisible });
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
            const allNotes = await NotesModel.getAllNotesOfUser(user.username);

            const notesInCollection = await CollectionsModel.getNotesToAdd(collectionId);

            const notes = allNotes.filter(note => !notesInCollection.find(n => n.note_id === note.id));

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
            const collectionId = req.params.collectionId;
            const notesIds = await NotesModel.getNotesInCollection(collectionId);
            const notes = [];
            for (const id of notesIds) {
                const note = await NotesModel.getNotesByIds(id);
                notes.push(note);
            }

            res.render('./showNotesInCollection.ejs', { notes, collectionId });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteCollection: async (req, res) => {
        try {
            const collectionId = req.params.collectionId;
            await CollectionsModel.deleteCollectionById(collectionId);
            //await CollectionsModel.updateNotesInCollection(collectionId);
            res.redirect('/notes/collections');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteNoteFromCollection: async (req, res) => {
        try {
            const collectionId = req.params.collectionId;
            const noteId = req.params.noteId;
            await CollectionsModel.deleteNoteFromCollection(collectionId, noteId);
            res.redirect('/notes/collections/notesInCollection/' + collectionId);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

   


};


