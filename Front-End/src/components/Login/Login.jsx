/* eslint-disable no-alert */
import React, { Component } from 'react';
import '../../App.css';
import './Login.css';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  submitLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const data = {
      username,
      password,
    };
    axios.post('http://localhost:3001/login', data)
      .then(() => {
        alert('Successfull Login');
      })
      .catch(() => {
        alert('Invalid Username or Password');
      });
  }

  render() {
    return (
      <div className="container">
        <Form id="login-form" method="post" onSubmit={this.submitLogin}>
          <h1>Sign In</h1>
          <p>Enter your details to login</p>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={this.handleChangeUsername} type="text" name="username" placeholder="Enter Username" required />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChangePassword} type="password" name="password" placeholder="Enter Your Password" required />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
export default Login;
