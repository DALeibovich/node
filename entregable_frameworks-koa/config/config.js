require('dotenv/config') 
const parseArgs = require('minimist');


let args = parseArgs(process.argv.slice(2));

const persistencia = () => {
  let ret = args.persistence || process.env.PERSISTENCE || 'FILE';
  return ret;
  
}

module.exports = {
    persistencia
}