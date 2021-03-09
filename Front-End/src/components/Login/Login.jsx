/* eslint-disable no-alert */
import React, { Component } from 'react';
import '../../App.css';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { propTypes } from 'react-bootstrap/esm/Image';
import Navigationbar from '../Navigationbar/Navigationbar';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectFlag: false,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  submitLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = {
      email,
      password,
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/login', data)
      .then((response) => {
        const { onSubmitUser } = this.props;
        onSubmitUser(response.data);
        localStorage.setItem('userId', response.data.id);
        this.setState({
          redirectFlag: true,
        });
      })
      .catch(() => {
        alert('Invalid Username or Password');
      });
  }

  render() {
    const { redirectFlag } = this.state;
    return (
      <div>
        {redirectFlag ? <Redirect to="/dashboard" /> : null}
        <Navigationbar />
        <div className="container">
          <Form id="login-form" method="post" onSubmit={this.submitLogin}>
            <h1>Sign In</h1>
            <p>Enter your details to login</p>
            <Form.Group controlId="formUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={this.handleChangeEmail} type="email" name="email" placeholder="Enter Your Email" required />
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

const mapStateToProps = (state) => ({
  userId: state.id,
  userName: state.name,
  userEmail: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitUser: (userData) => dispatch({ type: 'REGISTER_USER', value: userData }),
});

Login.defaultProps = {
  onSubmitUser: () => {},
};

Login.propTypes = {
  onSubmitUser: propTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
