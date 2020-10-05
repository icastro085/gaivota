const mongoose = require('mongoose');

const { Schema } = mongoose;

const FarmNdvi = new Schema({
  farmId: String,
  date: Date,
  value: Number,
}, { versionKey: false });

module.exports = mongoose.model('FarmNdvi', FarmNdvi);
