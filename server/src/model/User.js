const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;
 
const User = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  password: String,
}, { versionKey: false });

module.exports = mongoose.model('User', User);
