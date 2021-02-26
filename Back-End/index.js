/* eslint-disable no-console */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql');

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

const con = mysql.createConnection({
  host: 'lab1-splitwise-rn.c2tiaptrhgwl.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'shakthivel',
  password: 'Sunshine123',
  database: 'dbsplitwise',
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.post('/login', (req, res) => {
  console.log('Inside Login Post Request');
  console.log('Req Body: ', req.body);
  let status = 500;
  con.query('SELECT * FROM users', (err, result) => {
    if (err) throw err;
    result.forEach((entry) => {
      if (entry.username === req.body.username && entry.password === req.body.password) {
        res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
        console.log(entry.username);
        console.log(req.body.username);
        req.session.user = entry;
        status = 200;
      }
    });
    console.log(result);
    res.status(status);
    res.send();
  });
});

app.post('/register', (req, res) => {
  console.log('Inside Register Post Request');
  console.log('Req Body: ', req.body);
  // eslint-disable-next-line no-shadow
  con.query(`INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}')`, (err) => {
    if (err) throw err;
    console.log('User values inserted');
    res.send();
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
