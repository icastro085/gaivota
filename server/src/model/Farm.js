const mongoose = require('mongoose');

const { Schema } = mongoose;

const Farm = new Schema({
  farmId: String,
  name: String,
  latitude: Number,
  longitude: Number,
  culture: String,
  variety: String,
  totalArea: Number,
  yieldEstimation: Number,
  price: Number,
}, { versionKey: false });

module.exports = mongoose.model('Farm', Farm);
