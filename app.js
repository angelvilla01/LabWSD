// app.js

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const notesController = require('./controllers/notesController'); // Importa el controlador

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas
app.get('/', notesController.getAllNotes);
app.get('/new', (req, res) => res.render('new'));
app.post('/new', notesController.createNote);
app.get('/edit/:noteId', notesController.editNote);
app.post('/edit/:noteId', notesController.updateNote);
app.post('/delete/:noteId', notesController.deleteNote);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

