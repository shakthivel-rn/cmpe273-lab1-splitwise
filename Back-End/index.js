/* eslint-disable no-console */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const login = require('./Routes/login');
const register = require('./Routes/register');
const createGroup = require('./Routes/createGroup');
const profilePage = require('./Routes/profilePage');
const createExpense = require('./Routes/createExpense');

app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
  secret: 'cmpe273_splitwise',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/login', login);
app.use('/register', register);
app.use('/createGroup', createGroup);
app.use('/profilePage', profilePage);
app.use('/createExpense', createExpense);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
