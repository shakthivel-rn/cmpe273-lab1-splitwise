const express = require('express');
const Users = require('../models/Users');
const Groups = require('../models/Groups')();
const UsersGroups = require('../models/Users_Groups')();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const group = await Groups.create(
      {
        group_name: req.body.groupName,
        group_image: req.body.groupImage,
      },
    );
    console.log(group.dataValues.group_id);
    const usersGroup1 = await UsersGroups.create(
      {
        user_id: req.body.userId,
        group_id: group.dataValues.group_id,
      },
    );
    console.log(usersGroup1);
    const members = await Users.findAll({
      where: {
        email: req.body.memberEmails,
      },
    });
    console.log(members);
    const finalMap = members.map((member) => ({
      user_id: member.dataValues.user_id,
      group_id: group.dataValues.group_id,
    }));
    console.log(finalMap);
    await UsersGroups.bulkCreate(finalMap);
    res.status = 200;
  } catch (e) {
    res.status = 500;
  } finally {
    res.send();
  }
});

module.exports = router;
