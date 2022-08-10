require('dotenv/config');
const mongodbconn = process.env.MONGO_DB;
module.exports = mongodbconn;
