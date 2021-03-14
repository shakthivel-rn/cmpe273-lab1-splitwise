const express = require('express');
const UsersGroups = require('../models/Users_Groups')();
const Expenses = require('../models/Expenses')();
const Transactions = require('../models/Transactions')();

const router = express.Router();

router.post('/', async (req, res) => {
  let allowCreateExpense = true;
  let status = 500;
  const groupMembers = await UsersGroups.findAll({
    where: {
      group_id: req.body.groupId,
    },
  });
  const inviteStatus = groupMembers.map((groupMember) => (
    groupMember.dataValues.invite_status
  ));
  if (inviteStatus.includes(false)) {
    allowCreateExpense = false;
  }
  if (allowCreateExpense) {
    const expense = await Expenses.create({
      group_id: req.body.groupId,
      expense_description: req.body.expenseDescription,
      expense_amount: req.body.expenseAmount,
    });
    const splitAmount = (expense.dataValues.expense_amount / groupMembers.length);
    const finalMap = groupMembers.map((groupMember) => (
      req.body.userId === groupMember.dataValues.user_id
        ? {
          group_id: req.body.groupId,
          expense_id: expense.dataValues.expense_id,
          paid_user_id: req.body.userId,
          owed_user_id: groupMember.user_id,
          split_amount: splitAmount,
          status: true,
        }
        : {
          group_id: req.body.groupId,
          expense_id: expense.dataValues.expense_id,
          paid_user_id: req.body.userId,
          owed_user_id: groupMember.user_id,
          split_amount: splitAmount,
          status: false,
        }));
    console.log(typeof req.body.userId);
    console.log(typeof groupMembers[0].dataValues.user_id);
    await Transactions.bulkCreate(finalMap);
    status = 200;
  }
  res.sendStatus(status);
});
module.exports = router;
