import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

export class CollectionsModel {


    static getCollectionsById = async (collectionId) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM collections WHERE id = ?', [collectionId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static getAllCollectionsOfUser = async (username) => {
        console.log('username', username);
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM collections WHERE username = ?', [username], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    static getNotesToAdd = async (collectionId) => {
       
        console.log('collectionId', collectionId);
        return new Promise((resolve, reject) => {
            db.all('SELECT note_id FROM note_collections WHERE collection_id = ?', [collectionId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    static addNoteToCollection = async (collectionId, noteId) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO note_collections (note_id, collection_id) VALUES (?,?)', [noteId, collectionId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    static createCollection = async (name, username) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO collections (name, username) VALUES (?, ?)', [name, username], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    static deleteCollectionById = async (collectionId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM collections WHERE id = ?', [collectionId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    db.run('DELETE FROM note_collections WHERE collection_id = ?', [collectionId], (err) => {
                        if (err) {
                            reject(err);
                        } else { resolve();
                        }
                    });
                   
                }
            });
        });
    };

    static updateNotesInCollection = async (collectionId) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE notes SET collection_id = NULL WHERE collection_id = ?', [collectionId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    static deleteNoteFromCollection = async (collectionId, noteId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM note_collections WHERE collection_id = ? AND note_id = ?', [collectionId, noteId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}