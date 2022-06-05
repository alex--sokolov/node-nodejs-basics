import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
import {readFile} from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ERROR = 'FS operation failed';
const filesFolder = 'files';
const fileName = 'fileToRead.txt';
const filePath = path.resolve(__dirname, filesFolder, fileName);

export const read = async () => {
  try {
  const readFromFile = await readFile(filePath, {encoding: 'utf-8'});
  console.log(readFromFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR);
    }
  }
};

await read();
