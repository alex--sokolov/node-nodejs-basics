import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ERROR = 'Smth went wrong';
const filesFolder = 'files';
const fileName = 'fileToRead.txt';

const filePath = path.resolve(__dirname, filesFolder, fileName);

export const read = async () => {
  const newStream = new fs.ReadStream(filePath, {encoding: 'utf-8'});

  newStream.on('readable', function(){
    let data = newStream.read();
    if(data != null)
      process.stdout.write(data);
  });

  newStream.on('error', function(err){
    if(err.code == 'ENOENT'){
      console.log("Файл не найден");
    }else{
      console.error(ERROR);
    }
  });

};

await read();
