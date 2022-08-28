require('dotenv/config');
const parseArgs = require('minimist');
let mongodbconn;
let args = parseArgs(process.argv.slice(2));
console.log(args.persistence);
if(args.persistence == 'MONGOLOCAL'){
     mongodbconn = process.env.MONGO_LOCAL;
}else{
     mongodbconn = process.env.MONGO_DB;
}

module.exports = mongodbconn;
