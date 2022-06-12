import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, 'files', 'fileToWrite.txt');

export const write = async () => {
  const writeStream = fs.createWriteStream(filePath, {flags: 'a'});
  process.stdin.pipe(writeStream);
};

await write();
