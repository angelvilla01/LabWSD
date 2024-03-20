// app.js
import sqlite3 from 'sqlite3';
import express, {json} from 'express';// Importa el controlador
//import bodyParser from 'body-parser';
const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.set('view engine', 'ejs'); 
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas
import { notesRouter } from './routes/notesRoutes.js';
app.use('/notes', notesRouter);
app.get('/', (_req, res) => res.redirect('/notes'));

app.post('/notes/edit/:id', async (req, res) => {
    const noteId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    const updatedFontFamily = req.body['font-family'];
    const updatedFontSize = req.body['font-size'];
    const updatedFontColor = req.body['font-color'];

    
    try {
        await updateNoteInDatabase(noteId, updatedTitle, updatedContent, updatedFontFamily, updatedFontSize, updatedFontColor);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating note');
    }
});


async function updateNoteInDatabase(noteId, title, content, fontFamily, fontSize, fontColor) {
    const sql = `
        UPDATE notes
        SET title = $title, content = $content, fontFamily = $fontFamily, fontSize = $fontSize, fontColor = $fontColor
        WHERE id = $id
    `;

    const params = {
        $id: noteId,
        $title: title,
        $content: content,
        $fontFamily: fontFamily,
        $fontSize: fontSize,
        $fontColor: fontColor
    };

    return new Promise((resolve, reject) => {
        db.run(sql, params, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve(this.changes);
            }
        });
    });
}

const PORT = process.env.PORT || 4000



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));