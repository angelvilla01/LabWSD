import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

//for you to know, my table SharedNotes has the following columns: id, note_id, shared_with (this is a userId)

export class ShareModel {
    


    static deleteByUserId = async (userId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM SharedNotes WHERE shared_with = ?', [userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static shareCollectionWithUser = async (collectionId, sharedWith) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO SharedCollections (collection_id, shared_with) VALUES (?, ?)', [collectionId, sharedWith], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static deleteShareByNoteId = async (noteId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM SharedNotes WHERE note_id = ?', [noteId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static deleteShareByCollectionId = async (collectionId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM SharedCollections WHERE collection_id = ?', [collectionId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
        );
    };

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

    static getSharedCollections = async (collectionId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM SharedCollections WHERE collection_id = ?  ', [collectionId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

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
    
    static getSharedCollectionsWithUser = async (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT collection_id FROM SharedCollections WHERE shared_with = ? ', [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    };
    
    }
