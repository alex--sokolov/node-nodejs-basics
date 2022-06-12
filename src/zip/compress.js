import {
  createReadStream,
  createWriteStream
} from 'fs';
import {createGzip} from 'zlib';
import {pipeline} from 'stream';

import * as path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileFolder = 'files';
const fileInitial = path.resolve(__dirname, fileFolder, 'fileToCompress.txt');
const fileCompressed = path.resolve(__dirname, fileFolder, 'archive.gz');

export const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(fileInitial);
  const destination = createWriteStream(fileCompressed);
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error('An error occurred:', err);
      process.exitCode = 1;
    }
  });
};

await compress();
