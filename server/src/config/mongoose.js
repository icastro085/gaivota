const mongoose = require('mongoose');
const User = require('../model/User');

const { USER_TEST } = process.env;
const { log } = console;

module.exports = {
  async connect() {
    await mongoose.connect('mongodb://0.0.0.0:27017/gaivota-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    log('Mongo is connected in 27017')

    if (USER_TEST) {
      const [name, email, password] = USER_TEST.split(/\s*,\s*/g);
      await User.deleteMany({ email });
      await User.create({ name, email, password });
    }
  },
};
