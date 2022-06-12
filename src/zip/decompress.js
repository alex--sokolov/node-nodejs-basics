import {
  createReadStream,
  createWriteStream
} from 'fs';
import {createUnzip} from 'zlib';
import {pipeline} from 'stream';

import * as path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileFolder = 'files';
const fileInitial = path.resolve(__dirname, fileFolder, 'archive.gz');
const fileUncompressed = path.resolve(__dirname, fileFolder, 'fileDecompressed.txt');

export const decompress = async () => {
  const gzip = createUnzip();
  const source = createReadStream(fileInitial);
  const destination = createWriteStream(fileUncompressed);
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error('An error occurred:', err);
      process.exitCode = 1;
    }
  });
};

await decompress();
