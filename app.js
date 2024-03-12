// app.js

import express, {json} from 'express';// Importa el controlador
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// Rutas
import { notesRouter } from './routes/notesRoutes.js';
//const notesRoutes = require('./routes/notesRoutes.js');
app.use('/notes', notesRouter);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));