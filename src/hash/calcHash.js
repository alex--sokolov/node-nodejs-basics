import { createReadStream } from 'fs';
import {createHash} from 'crypto';
import {fileURLToPath} from 'url';
import * as path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileName = 'files/fileToCalculateHashFor.txt';
const filePath = path.resolve(__dirname, fileName);

export const calculateHash = async () => {
  const hash = createHash('sha256');
  const input = createReadStream(filePath);
  input.pipe(hash).setEncoding('hex').pipe(process.stdout);

};

await calculateHash();
