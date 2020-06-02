import fs from "fs";
import path from "path";

export const createFolder = async(url) => {
     await fs.mkdir(
          path.join(__dirname, url),
          (err) => {
            if (err) throw err;
          }
        );
}