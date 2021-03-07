const express = require('express');
const Users = require('../models/Users')();
const Expenses = require('../models/Expenses')();
const Transactions = require('../models/Transactions')();

const router = express.Router();

router.get('/', async (req, res) => {
  const allUsers = await Users.findAll({
    attributes: ['user_id', 'name'],
  });
  const allExpenses = await Expenses.findAll({
    attributes: ['expense_id', 'expense_description'],
  });
  const userNames = {};
  const expenseNames = {};
  allUsers.forEach((eachUser) => {
    userNames[eachUser.dataValues.user_id] = eachUser.dataValues.name;
  });
  allExpenses.forEach((eachExpense) => {
    expenseNames[eachExpense.dataValues.expense_id] = eachExpense.dataValues.expense_description;
  });
  const groupTransactions = await Transactions.findAll({
    attributes: [
      'expense_id',
      'paid_user_id',
      'owed_user_id',
      'split_amount',
    ],
    where: {
      group_id: req.query.groupId,
      status: 0,
    },
  });
  const result = groupTransactions.map((groupTransaction) => ({
    expenseName: expenseNames[groupTransaction.dataValues.expense_id],
    paidUserName: userNames[groupTransaction.dataValues.paid_user_id],
    owedUserName: userNames[groupTransaction.dataValues.owed_user_id],
    splitAmount: groupTransaction.dataValues.split_amount,
  }));
  res.send(result);
});

module.exports = router;
