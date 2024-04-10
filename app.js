// app.js
import sqlite3 from 'sqlite3';
import express, {json} from 'express';// Importa el controlador
import session from 'express-session';
//import bodyParser from 'body-parser';
const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.set('view engine', 'ejs'); 
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//session

app.use(session({
    secret: 'angelHectorSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Rutas notas
import { notesRouter } from './routes/notesRoutes.js';
app.use('/notes', notesRouter);
// app.get('/', (_req, res) => res.redirect('/notes'));


//routes for user

import { userRouter } from './routes/userRoutes.js';
app.use('/users', userRouter);
app.get('/', (_req, res) => res.redirect('/users'));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));