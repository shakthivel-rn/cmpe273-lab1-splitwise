const express = require('express');
const con = require('../DatabaseConnection/db_connection');
const encrypt = require('../Encryption/encryption');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('Inside Login Post Request');
  console.log('Req Body: ', req.body);
  let status = 500;
  let userData = {};
  con.query('SELECT * FROM Users', (err, result) => {
    if (err) throw err;
    result.forEach((entry) => {
      if (entry.email === req.body.email) {
        const encryptedPassword = encrypt(req.body.password);
        if (encryptedPassword === entry.password) {
          res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
          req.session.user = entry;
          status = 200;
          userData = {
            id: entry.user_id,
            name: entry.name,
            email: entry.email,
          };
        }
      }
    });
    console.log(result);
    res.status(status);
    res.send(userData);
  });
});

module.exports = router;
