import * as path from 'path';
import {fileURLToPath} from 'url';
import {fork} from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptFileName = 'files/script.js';
const scriptFilePath = path.resolve(__dirname, scriptFileName);

export const spawnChildProcess = async (args) => {
  const child = fork(scriptFilePath, args.slice(2), {stdio: [0, null, null, 'ipc']});
  child.stdout.on('data', (data) => {
    console.log('Receive from childs stdout: ', data.toString());
  });
}
await spawnChildProcess(process.argv);
