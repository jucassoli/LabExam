const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017/db?authSource=admin`;

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: true });

exports.mongoose = mongoose;