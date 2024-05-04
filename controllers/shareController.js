import { ShareModel } from "../models/share.js";
import { NotesModel } from "../models/note.js";
import { UserModel } from "../models/user.js";

export const shareController = {
    
        

        shareNote: async (req, res) => {
            console.log('req.body', req.params);
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
                console.log('sharedNotesIds', sharedNotesIds);
                //const notesIds = sharedNotes.map(note => note.note_id);
                const notes = [];
                for (const noteId of sharedNotesIds) {
                    const note = await NotesModel.getNotesByIds(noteId.note_id);
                    notes.push(note);
                }
                res.render('shared', { notes, username });
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        }
    }