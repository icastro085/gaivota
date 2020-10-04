const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmNdvi = new Schema({
  farmId: String,
  date: Date,
  value: String,
}, { versionKey: false });

module.exports = mongoose.model('FarmNdvi', FarmNdvi);
