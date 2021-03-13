const express = require('express');
const Users = require('../models/Users')();
const Groups = require('../models/Groups')();
const UsersGroups = require('../models/Users_Groups')();

const router = express.Router();

router.post('/', async (req, res) => {
  const group = await Groups.create(
    {
      group_name: req.body.groupName,
    },
  );
  await UsersGroups.create(
    {
      user_id: req.body.userId,
      group_id: group.dataValues.group_id,
    },
  );
  const members = await Users.findAll({
    where: {
      email: req.body.memberEmails,
    },
  });
  const finalMap = members.map((member) => ({
    user_id: member.dataValues.user_id,
    group_id: group.dataValues.group_id,
  }));
  await UsersGroups.bulkCreate(finalMap);
  res.send();
});

router.get('/getMemberEmails', async (req, res) => {
  const memberEmails = await Users.findAll({
    attributes: ['email'],
  });
  res.send(memberEmails);
});

module.exports = router;
