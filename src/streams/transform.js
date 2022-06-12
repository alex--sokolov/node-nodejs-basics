import { Transform } from "stream";

export const transform = async () => {
  const myTransform = new Transform({
    transform(chunk, encoding) {
      const newChunk = chunk.toString().trim().split('').reverse().join('');
      process.stdout._write(`${newChunk}\n`, encoding, null);
    },
  });
  process.stdin
      .on('data', data => myTransform._transform(data, 'utf-8', null))
};

await transform();
