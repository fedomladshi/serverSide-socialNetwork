import multer from 'multer';
import {v4} from 'uuid';

const storage = multer.diskStorage({
     destination: function(req,file,cb) {
         cb(null, './uploads/img');
     },
     filename: (req, file, cb) => {
         cb(null, v4().toString() + "_" + file.originalname);
     }
   });

const fileFilter= (req, file, cb) => {
     if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         cb(null, true);
     } else {
         cb(new Error("Type file is not access"));
     }
   };



export = multer({
     storage,
     fileFilter,
     limits: {fileSize: 1024 * 1024 * 5} // 5 Мегабайт
   }).single('image');