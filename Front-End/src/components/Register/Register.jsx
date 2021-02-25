import React, { Component } from 'react';
import '../../App.css';
import './Register.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectFlag: false,
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
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

  submitRegister = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const data = {
      username,
      password,
    };
    axios.post('http://localhost:3001/register', data)
      .then(() => {
        this.setState({
          redirectFlag: true,
        });
      })
      .catch(() => {
        alert('Invalid Registration');
      });
  }

  render() {
    const { redirectFlag } = this.state;
    return (
      <div>
        {redirectFlag ? <Redirect to="/login" /> : null}
        <div className="container">
          <Form id="signup-form" method="post" onSubmit={this.submitRegister}>
            <h1>Sign Up</h1>
            <p>Enter your details to create an account</p>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleChangeUsername} type="text" name="username" placeholder="Enter Your Username" required />
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
      </div>
    );
  }
}
export default Register;
