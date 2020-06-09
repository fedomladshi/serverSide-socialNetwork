import fs from "fs";
import path from "path";

export const createFolder = (url) => {
  fs.mkdirSync(path.join(__dirname, url));
};
