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
  console.log(group);
  const expense = await Expenses.create({
    group_id: group[0].dataValues.group_id,
    expense_description: req.body.expenseDescription,
    expense_amount: req.body.expenseAmount,
  });
  console.log(expense);
  const groupMembers = await UsersGroups.findAll({
    where: {
      group_id: group[0].dataValues.group_id,
    },
  });
  console.log(groupMembers);
  const splitAmount = (expense.dataValues.expense_amount / groupMembers.length);
  console.log(splitAmount);
  const finalMap = groupMembers.map((groupMember) => (
    req.body.userId === groupMember.dataValues.user_id
      ? {
        expense_id: expense.dataValues.expense_id,
        paid_user_id: req.body.userId,
        owed_user_id: groupMember.user_id,
        split_amount: splitAmount,
        status: true,
      }
      : {
        expense_id: expense.dataValues.expense_id,
        paid_user_id: req.body.userId,
        owed_user_id: groupMember.user_id,
        split_amount: splitAmount,
        status: false,
      }));
  console.log(finalMap);
  await Transactions.bulkCreate(finalMap);
  res.send();
});
module.exports = router;
