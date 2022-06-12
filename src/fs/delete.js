import { unlink } from 'fs/promises';

const ERROR = 'FS operation failed';

export const remove = async () => {
  try {
    await unlink('files/fileToRemove.txt');
    console.log('successfully deleted fileToRemove.txt');
  } catch (error) {
    console.error('there was an error:', error.message);
    throw new Error(ERROR);
  }
};

await remove();