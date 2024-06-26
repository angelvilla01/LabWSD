import express from 'express';
export const notesRouter = express.Router();
import { notesController } from '../controllers/notesController.js';
import { collectionsController } from '../controllers/collectionsController.js';
import { requireAuth } from '../middlewares/auth.js';
import { backHomeAdmin } from '../middlewares/auth.js';
import { friendshipController } from '../controllers/friendshipController.js';
import { shareController } from '../controllers/shareController.js';



notesRouter.get('/', requireAuth, notesController.getAllNotesFromUser);
notesRouter.get('/new', requireAuth, (_req, res) => res.render('./new.ejs'));
notesRouter.get('/noteInfo/:noteId', requireAuth, (req, res) => notesController.getNoteById(req, res, './noteInfo.ejs'));
notesRouter.post('/new', requireAuth, notesController.createNote);
notesRouter.get('/edit/:noteId', requireAuth, (req, res) => notesController.getNoteById(req, res, './edit.ejs'));
notesRouter.post('/edit/:noteId', requireAuth, notesController.updateNote);
notesRouter.post('/delete/:noteId', requireAuth, notesController.deleteNote);

//collections
notesRouter.get('/NoteCollections', requireAuth, backHomeAdmin, (_req, res) => res.render('NoteCollections'));
notesRouter.get('/collections', requireAuth, collectionsController.getAllCollectionsFromUser);
notesRouter.post('/collections/addNoteToCollection/:noteId/:collectionId', requireAuth, (req, res) => collectionsController.addNoteToCollection(req, res));
notesRouter.get('/collections/showNotes/:collectionId', requireAuth, (req, res) => collectionsController.showNotesToAdd(req, res));

notesRouter.get('/collections/addCollection', requireAuth, (_req, res) => res.render('createCollection'));
notesRouter.post('/collections/addCollection', requireAuth, collectionsController.createCollection);
notesRouter.get('/collections/notesInCollection/:collectionId', requireAuth, (req, res) => collectionsController.getNotesInCollection(req, res));
notesRouter.post('/collections/delete/:collectionId', requireAuth, collectionsController.deleteCollection);
notesRouter.post('/collections/deleteNote/:noteId/:collectionId', requireAuth, (req, res) => collectionsController.deleteNoteFromCollection(req, res));

//shared notes

notesRouter.get('/shared/addUserToShareWith/:noteId', requireAuth, friendshipController.getFriendsToShareWith);
notesRouter.post('/shared/addUserToShareWith/:noteId/:friendId', requireAuth, shareController.shareNote);
notesRouter.get('/shared', requireAuth, shareController.getSharedNotesWithUser);
notesRouter.get('/collections/shared/addUserToShareWith/:collectionId', requireAuth, friendshipController.getFriendsToShareWithCollection);
notesRouter.post('/collections/shared/addUserToShareWith/:collectionId/:friendId', requireAuth, shareController.shareCollection);

//notesRouter.get('/shared',requireAuth, notesController.getSharedNotes);
