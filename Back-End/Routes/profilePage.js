const express = require('express');
const Users = require('../models/Users')();

const router = express.Router();

router.post('/editName', async (req, res) => {
  await Users.update({ name: req.body.name }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editEmail', async (req, res) => {
  await Users.update({ email: req.body.email }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editPhoneNumber', async (req, res) => {
  await Users.update({ phone_number: req.body.phoneNumber }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editDefaultCurrency', async (req, res) => {
  await Users.update({ default_currency: req.body.defaultCurrency }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editTimeZone', async (req, res) => {
  await Users.update({ timezone: req.body.timeZone }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editLanguage', async (req, res) => {
  await Users.update({ language: req.body.language }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});
module.exports = router;
