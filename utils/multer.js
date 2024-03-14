import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Indica la carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      // Obtén la extensión del archivo original
      const extname = path.extname(file.originalname);
      // Genera un nombre único para el archivo basado en la fecha actual y la extensión original
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
  });

export const upload = multer({ storage: storage});
