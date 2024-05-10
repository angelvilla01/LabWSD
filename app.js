// app.js

import express from 'express';
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
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });


  const upload = multer({ storage: storage });

  app.post('/upload', upload.single('file'), (req, res) => {
    
    
    const imageUrl = '/uploads/' + req.file.filename; 
    res.json({ imageUrl: imageUrl });
  });

// main-route for notes

import { notesRouter } from './routes/notesRoutes.js';
app.use('/notes', notesRouter);



//main-route for user

import { userRouter } from './routes/userRoutes.js';
app.use('/users', userRouter);
app.get('/', (_req, res) => res.redirect('/users'));

//main-route for friendships

import { friendshipRouter } from './routes/friendshipRoutes.js';
app.use('/friendships', friendshipRouter);


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


