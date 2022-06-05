import * as fs from 'fs';

export const create = async (file, text, error) => {

  fs.writeFile(file, text, {flag: 'wx'}, function (err) {
    if (err && err.code === 'EEXIST') {
      throw new Error(error);
    }
    console.log('File is created successfully.');
  });
};

await create('files/fresh.txt', 'I am fresh and young', 'FS operation failed');
