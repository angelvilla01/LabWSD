import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

export const notesModel = {
  getAllNotes: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM notes', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  createNote: (title, content) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  getNoteById: (noteId) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM notes WHERE id = ?', [noteId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  updateNoteById: (noteId, title, content) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, noteId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  deleteNoteById: (noteId) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM notes WHERE id = ?', [noteId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

//module.exports = notesModel;
