import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {
  Button, Form,
} from 'react-bootstrap';

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const { groupId } = props;
    this.state = {
      userId: localStorage.getItem('userId'),
      groupId,
      expenseDescription: '',
      expenseAmount: 0,
    };
    this.handleChangeExpenseDescription = this.handleChangeExpenseDescription.bind(this);
    this.handleChangeExpenseAmount = this.handleChangeExpenseAmount.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  handleChangeExpenseDescription = (e) => {
    this.setState({
      expenseDescription: e.target.value,
    });
  }

  handleChangeExpenseAmount = (e) => {
    this.setState({
      expenseAmount: e.target.value,
    });
  }

  submitExpense = (e) => {
    e.preventDefault();
    let {
      userId,
    } = this.state;
    const {
      groupId, expenseDescription, expenseAmount,
    } = this.state;
    userId = Number(userId);
    const data = {
      userId,
      groupId,
      expenseDescription,
      expenseAmount,
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/createExpense', data);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { userId } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { groupId } = this.state;
    return (
      <Form method="post" onSubmit={this.submitExpense}>
        <Form.Group controlId="formExpenseDescription">
          <Form.Control onChange={this.handleChangeExpenseDescription} type="text" placeholder="Enter a description" />
        </Form.Group>

        <Form.Group controlId="formExpenseAmount">
          <Form.Control onChange={this.handleChangeExpenseAmount} type="number" placeholder="$ 0.0" />
        </Form.Group>
        <Button variant="success" type="submit">Save</Button>
      </Form>
    );
  }
}

export default AddExpenseForm;
