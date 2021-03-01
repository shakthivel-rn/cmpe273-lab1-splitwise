const express = require('express');
const Users = require('../models/Users');
const encrypt = require('../Encryption/encryption');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Inside Register Post Request');
  console.log('Req Body: ', req.body);
  const encryptedPassword = encrypt(req.body.password);
  const user = await Users.create(
    {
      name: req.body.name,
      password: encryptedPassword,
      email: req.body.email,
    },
  );
  console.log(`Inserted info of ${user.email}`);
  res.send();
});

module.exports = router;
