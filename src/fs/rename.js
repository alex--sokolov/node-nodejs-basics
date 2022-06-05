import * as fs from 'fs';
import {access} from 'fs/promises';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ERROR = 'FS operation failed';
const filesFolder = 'files';
const fileWithWrongName = path.resolve(__dirname, filesFolder, 'wrongFilename.txt');
const fileWithProperName = path.resolve(__dirname, filesFolder, 'properFilename.md');

export const rename = async () => {
  await fs.access(fileWithProperName, fs.F_OK, async (err)  => {
    if (!err) {
      console.log(fileWithProperName, 'already exists')
      throw new Error(ERROR);
    }

    await fs.rename(fileWithWrongName, fileWithProperName,function(err) {
      if ( err ) {
        console.log('There is no file: ', fileWithWrongName);
        throw new Error(ERROR);
      }
      console.log('File was renamed successfully');
    });
  });
};

await rename();