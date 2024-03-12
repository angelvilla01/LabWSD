
// controllers/notesController.js

const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

const notesController = {
  getAllNotes: (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
      if (!err) {
        res.render('index', { notes: rows });
      }
    });
  },

  createNote: (req, res) => {
    const { title, content } = req.body;
    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
    res.redirect('/');
  },

  editNote: (req, res) => {
    const noteId = req.params.noteId;
    db.get('SELECT * FROM notes WHERE id = ?', [noteId], (err, row) => {
      if (!err) {
        res.render('edit', { note: row });
      }
    });
  },

  updateNote: (req, res) => {
    const noteId = req.params.noteId;
    const { title, content } = req.body;
    db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, noteId]);
    res.redirect('/');
  },

  deleteNote: (req, res) => {
    const noteId = req.params.noteId;
    db.run('DELETE FROM notes WHERE id = ?', [noteId]);
    res.redirect('/');
  },
};

module.exports = notesController;