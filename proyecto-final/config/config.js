require('dotenv/config')
const parseArgs = require('minimist');
let args = parseArgs(process.argv.slice(2));

const persistencia = () => {
  if (args.persistence == 'MONGOLOCAL') {
    ret = process.env.MONGO_LOCAL;
  } else {
    ret = process.env.MONGO_DB;
  }
  return ret;

}

module.exports = {
  persistencia
}