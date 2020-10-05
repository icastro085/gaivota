const mongoose = require('mongoose');

const { Schema } = mongoose;

const FarmPrecipitation = new Schema({
  farmId: String,
  date: Date,
  value: Number,
}, { versionKey: false });

module.exports = mongoose.model('FarmPrecipitation', FarmPrecipitation);
