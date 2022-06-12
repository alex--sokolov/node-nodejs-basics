import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
import {readdir} from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ERROR = 'FS operation failed';
const filesFolder = 'files';
const filePath = path.resolve(__dirname, filesFolder);

export const list = async () => {

  // check if directory exists
  fs.access(filePath, async (err) => {
    if (err) {
      console.log('There is no directory:', filePath);
      throw new Error(ERROR);
    }

    let fileNames = [];

    const addFilesToArr =  async (filePath) => {
      const readFromDir = await readdir(filePath, {withFileTypes: 'true'});
      for (const el of readFromDir) {
        if (el.isFile()) {
          fileNames.push(el.name);
        } else if (el.isDirectory) {
          await addFilesToArr(path.resolve(filePath, el.name));
        }
      }
    }

    await addFilesToArr(filePath);

    console.log(fileNames.length === 0 ? `There are no files in dir: ${filePath}` : fileNames);
  });
};

await list();
