// Can be checked using this format:
// npm run cli-args -- --propName value --prop2Name value2

export const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsArr = [];
  let i =0;
  while (i < args.length) {
    if (args[i].slice(0, 2) === '--') {
      let curValue = '';
      let cur = `${args[i]} is undefined`;
      if (args[i + 1] && args[i + 1].slice(0, 2) !== '--') {
        curValue = args[i + 1];
        cur = `${args[i]} is ${curValue}`;
        i++;
      }
      argsArr.push(cur);
    }
    i++;
  }
  console.log(argsArr.join(', '));
};

await parseArgs();
