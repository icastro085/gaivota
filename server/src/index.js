const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./model/User');

const { PORT, JWT_PW } = process.env;

const mongoose = require('./config/mongoose');
const app = express();

mongoose.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Login route
 * @param {String} email - Email of login user
 * @param {String} password - Password of login user
 * @return {String} token
 */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      throw new Error('Login error: email or password is invalid');
    }

    const token = jwt.sign(user.toJSON(), JWT_PW);
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
});

app.get('/auth', (req, res) => {
  try {
    const authorization = req.header('Authorization') || '';
    const [, token] = authorization.split(' ');
    const ok = jwt.verify(token, JWT_PW);
    res.status(200).send(ok);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('Gaivota Test');
});

app.listen(PORT || 5000, () => {
  console.warn(`App is running at http://localhost:${PORT}`);
});

module.exports = app;
