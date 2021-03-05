const express = require('express');
const Groups = require('../models/Groups')();
const UsersGroups = require('../models/Users_Groups')();

const router = express.Router();

router.get('/getGroupNames', async (req, res) => {
  const memberGroups = await UsersGroups.findAll({
    where: {
      user_id: req.query.userId,
    },
  });
  const groupIds = memberGroups.map((memberGroup) => memberGroup.dataValues.group_id);
  let groupNames = await Groups.findAll({
    where: {
      group_id: groupIds,
    },
  });
  groupNames = JSON.parse(JSON.stringify(groupNames));
  console.log(groupNames);
  res.send(groupNames);
});

module.exports = router;
