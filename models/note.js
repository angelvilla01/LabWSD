import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

export class NotesModel {
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

  static createNote = async (title, content, filename) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO notes (title, content, image_id) VALUES (?, ?, ?)', [title, content,filename], (err) => {
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

  static updateNoteById = async (noteId, title, content, filename) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE notes SET title = ?, content = ?, image_id = ? WHERE id = ?', [title, content,filename, noteId], (err) => {
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
}
