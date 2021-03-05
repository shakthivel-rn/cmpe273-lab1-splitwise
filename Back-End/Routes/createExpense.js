const express = require('express');
const UsersGroups = require('../models/Users_Groups')();
const Groups = require('../models/Groups')();
const Expenses = require('../models/Expenses')();
const Transactions = require('../models/Transactions')();

const router = express.Router();

router.post('/', async (req, res) => {
  const group = await Groups.findAll({
    where: {
      group_name: req.body.groupName,
    },
  });
  const expense = await Expenses.create({
    group_id: group[0].dataValues.group_id,
    expense_description: req.body.expenseDescription,
    expense_amount: req.body.expenseAmount,
  });
  const groupMembers = await UsersGroups.findAll({
    where: {
      group_id: group[0].dataValues.group_id,
    },
  });
  const splitAmount = (expense.dataValues.expense_amount / groupMembers.length);
  const finalMap = groupMembers.map((groupMember) => (
    req.body.userId === groupMember.dataValues.user_id
      ? {
        group_id: group[0].dataValues.group_id,
        expense_id: expense.dataValues.expense_id,
        paid_user_id: req.body.userId,
        owed_user_id: groupMember.user_id,
        split_amount: splitAmount,
        status: true,
      }
      : {
        group_id: group[0].dataValues.group_id,
        expense_id: expense.dataValues.expense_id,
        paid_user_id: req.body.userId,
        owed_user_id: groupMember.user_id,
        split_amount: splitAmount,
        status: false,
      }));
  await Transactions.bulkCreate(finalMap);
  res.send();
});
module.exports = router;
