import * as fs from 'fs';
import * as path from 'path';
import {readdir, copyFile} from 'fs/promises';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ERROR = 'FS operation failed';


export const copy = async (pathFrom, pathTo) => {

  // check if directory exists
  fs.access(pathTo, async (err) => {
    if (!err) {
      console.log('Directory already exists');
      throw new Error(ERROR);
    }

    // check if directory to copy from exists
    await fs.access(pathFrom, async (err) => {
      if (err) {
        console.log('There is no directory to copy');
        throw new Error(ERROR);
      }

      // create directory
      fs.mkdir(pathTo, {recursive: true}, (err) => {
        if (err) throw new Error(ERROR);
      });

      // read and copy files
      const readFromDir = await readdir(pathFrom, {withFileTypes: 'true'})
      readFromDir.forEach((el) => {
        if (el.isFile()) {
          try {
            copyFile(path.resolve(pathFrom, el.name), path.resolve(pathTo, el.name));
          } catch {
            console.log(`Error when copying file ${el.name}`);
            throw new Error(ERROR);
          }
        } else if (el.isDirectory) {
          copy(path.resolve(pathFrom, el.name), path.resolve(pathTo, el.name))
        }
      });

      console.log('Directory was successfully copied');
    });
  });
};


(async function () {
  const filesCopyPath = path.resolve(__dirname, 'files-copy')
  const filesPath = path.resolve(__dirname, 'files')
  await copy(filesPath, filesCopyPath);
})()
