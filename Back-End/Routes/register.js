const express = require('express');
const Users = require('../models/Users')();
const encrypt = require('../Encryption/encryption');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Inside Register Post Request');
  console.log('Req Body: ', req.body);
  let userData = {};
  try {
    const encryptedPassword = encrypt(req.body.password);
    const user = await Users.create(
      {
        name: req.body.name,
        password: encryptedPassword,
        email: req.body.email,
      },
    );
    res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
    req.session.user = user;
    userData = {
      id: user.user_id,
      name: user.name,
      email: user.email,
    };
    res.status(200);
    console.log(`Inserted info of ${user.email}`);
  } catch (e) {
    res.status(500);
  } finally {
    res.send(userData);
  }
});

module.exports = router;
