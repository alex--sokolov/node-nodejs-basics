import * as path from 'path';
import {fileURLToPath} from 'url';
import os from 'os';
import { Worker } from 'worker_threads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js';
const workerFilePath = path.resolve(__dirname, workerFileName);
const cores = os.cpus();
const BASE_DIGIT = 10;

export const performCalculations = async () => {

  const workerPromiseFunc = (digit) => {
    return new Promise((res, rej) => {
      const worker = new Worker(workerFilePath);
      worker.postMessage(digit);
      worker.on('message', res);
      worker.on('error', rej);
    })
  }

  const promisesArr = [];

  cores.forEach((x, index) => {
    promisesArr.push(workerPromiseFunc(BASE_DIGIT + index))
  });

  console.log(await Promise.all(promisesArr));
};

await performCalculations();
