import { ShareModel } from "../models/share.js";
import { NotesModel } from "../models/note.js";
import { UserModel } from "../models/user.js";
import { CollectionsModel } from "../models/collections.js";
import { FriendshipModel } from "../models/friendship.js";

export const shareController = {
    
        shareCollection: async (req, res) => {
            const { collectionId, friendId } = req.params;
        
            try {
                await ShareModel.shareCollectionWithUser(collectionId, friendId);
                res.redirect('/notes/collections');
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        },

        shareNote: async (req, res) => {
            const { noteId, friendId } = req.params;
        
            try {
                await ShareModel.shareNoteWithUser(noteId, friendId);
                res.redirect('/notes');
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        },

        getSharedNotesWithUser: async (req, res) => {
            try {
                const username = req.session.user.username;
                const user = await UserModel.findByUsername(username);
                const userId = user.id;
                const sharedNotesIds = await ShareModel.getSharedNotesWithUser(userId);

                const notes = [];
                for (const noteId of sharedNotesIds) {
                    const note = await NotesModel.getNotesByIds(noteId.note_id);
                    notes.push(note);
                }
               
                const sharedCollectionsIds = await ShareModel.getSharedCollectionsWithUser(userId);

                const collections = [];
                for (const collectionId of sharedCollectionsIds) {
                    const collection = await CollectionsModel.getCollectionsById(collectionId.collection_id);
                    collections.push(collection);
                }

                res.render('shared', { notes, username, collections });
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        }
    }