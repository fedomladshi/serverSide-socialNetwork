import multer from "multer";
import { v4 } from "uuid";
import { IUserSchema } from "../models/user.model";
import fs from "fs";
import path from "path";
import {  } from "../interfaces";

const storage = multer.diskStorage({
  destination: async function(req, file, cb) {
    console.log(file)
    const directory = `./uploads/users/${req.user.email}/images/avatar`;
    await fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, v4().toString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(null, true);
  } else {
    cb(new Error("Type file is not access"));
  }
};

export = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 Мегабайт
}).single("avatar");
