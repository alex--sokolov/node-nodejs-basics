import {parseEnv} from "./env.js";

export const parseArgs = () => {
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i = i + 2) {
    console.log(i);
    console.log(args[i].slice(0, 2));
    // if (args[i].slice(0,4))
  }

  // const args =

};

await parseArgs();
