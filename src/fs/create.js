import * as fs from 'fs';

const ERROR = 'FS operation failed';

export const create = async (file, text) => {
  fs.writeFile(file, text, {flag: 'wx'}, function (err) {
    if (err) {
      if (err.code === 'EEXIST') throw new Error(ERROR);
    }
    else {
      console.log('File is created successfully.');
    }
  });
};

await create('files/fresh.txt', 'I am fresh and young');
