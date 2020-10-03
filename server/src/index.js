const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { PORT, JWT_PW } = process.env;

const mongo = require('../config/mongo');

const app = express();

mongo.connectToServer();

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
  const { email, password } = req.body;
  const db = mongo.getDb();
  const user = await db.collection('user').findOne({ email, password });
  const token = jwt.sign(user, JWT_PW);
  res.status(200).send({ userData: user, token });
});

app.get('/auth', (req, res) => {
  const authorization = req.header('Authorization') || '';
  const [, token] = authorization.split(' ');
  const ok = jwt.verify(token, JWT_PW);
  res.status(200).send(ok);
});

app.get('/', (req, res) => {
  res.status(200).send('Gaivota Test');
});

app.listen(PORT || 5000, () => {
  console.warn(`App is running at http://localhost:${PORT}`);
});

module.exports = app;
