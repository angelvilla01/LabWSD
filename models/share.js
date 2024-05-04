import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

//for you to know, my table SharedNotes has the following columns: id, note_id, shared_with (this is a userId)

export class ShareModel {
    
    static getSharedNotes = async (noteId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM SharedNotes WHERE note_id = ?  ', [noteId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    static shareNoteWithUser = async (noteId, sharedWith) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO SharedNotes (note_id, shared_with) VALUES (?, ?)', [noteId, sharedWith], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    static getSharedNotesWithUser = async (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT note_id FROM SharedNotes WHERE shared_with = ? ', [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };
      
    }