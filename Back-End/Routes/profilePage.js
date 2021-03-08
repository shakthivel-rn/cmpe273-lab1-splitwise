const express = require('express');
const Users = require('../models/Users')();

const router = express.Router();

router.get('/getUserDetails', async (req, res) => {
  const user = await Users.findAll({
    where: {
      user_id: req.query.userId,
    },
  });
  console.log(user);
  res.send(user);
});

router.post('/editName', async (req, res) => {
  await Users.update({ name: req.body.name }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editEmail', async (req, res) => {
  let status = 500;
  const userEmail = await Users.findAll({
    where: {
      email: req.body.email,
    },
  });
  console.log(userEmail);
  if (userEmail.length === 0) {
    await Users.update({ email: req.body.email }, {
      where: {
        user_id: req.body.userId,
      },
    });
    status = 200;
  } else {
    status = 500;
  }
  res.sendStatus(status);
});

router.post('/editPhoneNumber', async (req, res) => {
  await Users.update({ phone_number: req.body.phone }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editDefaultCurrency', async (req, res) => {
  await Users.update({ default_currency: req.body.defaultcurrency }, {
    where: {
      user_id: req.body.userId,
    },
  });
  res.send();
});

router.post('/editTimeZone', async (req, res) => {
  await Users.update({ timezone: req.body.timezone }, {
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
