import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

export class NotesModel {

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
    console.log('username', username);
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
}
