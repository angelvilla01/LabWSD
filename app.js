// app.js

import express, {json} from 'express';// Importa el controlador
//import bodyParser from 'body-parser';
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rutas
import { notesRouter } from './routes/notesRoutes.js';
//const notesRoutes = require('./routes/notesRoutes.js');
app.use('/notes', notesRouter);
app.get('/', (_req, res) => res.redirect('/notes'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));