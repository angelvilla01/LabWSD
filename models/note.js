import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

export class NotesModel {

  static deleteNoteFromCollections = async (noteId) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM note_collections WHERE note_id = ?', [noteId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
    );
  };

  static getAllNotesOfUser = async (username) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM notes WHERE username = ?', [username], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static getAllNotes = async () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM notes', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  static createNote = async (title,content, username) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO notes (title, content, username) VALUES (?, ?, ?)', [title, content, username], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  static getNoteById = async (noteId) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM notes WHERE id = ?', [noteId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };


  static updateNoteById = async (noteId, title, content, ) => {
    return new Promise((resolve, reject) => {
      
      db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, noteId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  static deleteNoteById = async (noteId) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM notes WHERE id = ?', [noteId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  static deleteAllNotes = async (username) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM notes WHERE username = ?', [username], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  static getNotesInCollection = async (collectionId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT note_id FROM note_collections WHERE collection_id = ?', [collectionId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const notesIds = rows.map(row => row.note_id);
          resolve(notesIds);
        }
      });
    });
  };

  static getNotesByIds = async (noteId) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM notes WHERE id = ? ', noteId, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}
