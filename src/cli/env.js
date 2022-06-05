// import * as process from 'process';

export const parseEnv = () => {
  // console.log(process.env.RSS_value1);

  const rssArr = [];
  for (const obj in process.env) {
    if (obj.slice(0,4) === 'RSS_') {
      rssArr.push(`${obj}=${process.env[obj]}`);
    }
  }

  console.log(rssArr.join('; '));

}

parseEnv();
