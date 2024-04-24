// app.js
import sqlite3 from 'sqlite3';
import express from 'express';// Importa el controlador
import session from 'express-session';
import multer from 'multer';
import path from 'path';
const app = express();


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

// Multer
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (_req, file, cb) {
      // Genera un nombre de archivo único para evitar colisiones
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  // Ruta para manejar la carga de archivos
  app.post('/upload', upload.single('file'), (req, res) => {
    // Aquí deberías construir la URL de la imagen y devolverla en la respuesta
    console.log(req.file);
    const imageUrl = '/uploads/' + req.file.filename; // Esto es un ejemplo, asegúrate de ajustarlo según tu configuración
    res.json({ imageUrl: imageUrl });
  });

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