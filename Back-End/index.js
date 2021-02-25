/* eslint-disable no-console */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

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

const Users = [{
  username: 'admin',
  password: 'admin',
}];

app.post('/login', (req, res) => {
  console.log('Inside Login Post Request');
  console.log('Req Body: ', req.body);
  // eslint-disable-next-line array-callback-return
  Users.filter((user) => {
    if (user.username === req.body.username && user.password === req.body.password) {
      res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
      req.session.user = user;
      res.status(200);
    // eslint-disable-next-line no-else-return
    } else {
      res.status(500);
    }
  });
  res.send();
});

app.post('/register', (req, res) => {
  console.log('Inside Register Post Request');
  console.log('Req Body: ', req.body);
  const userdata = {
    username: req.body.username,
    password: req.body.password,
  };
  Users.push(userdata);
  res.send('Success');
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
