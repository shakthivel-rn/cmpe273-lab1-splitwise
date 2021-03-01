const express = require('express');
const con = require('../DatabaseConnection/db_connection');
const encrypt = require('../Encryption/encryption');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('Inside Register Post Request');
  console.log('Req Body: ', req.body);
  const encryptedPassword = encrypt(req.body.password);
  con.query(`INSERT INTO Users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${encryptedPassword}')`, (err) => {
    if (err) throw err;
    console.log('User values inserted');
    res.send();
  });
});

module.exports = router;
