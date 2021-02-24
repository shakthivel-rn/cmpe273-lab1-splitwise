import React, { Component } from 'react';
import '../../App.css';
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
  };

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
        alert('Login Successfull');
      })
      .catch(() => {
        alert('Invalid Username or Password');
      });
  }

  render() {
    return (
      <div className="container">
        <form method="post" onSubmit={this.submitLogin}>
          <h1>Sign In</h1>
          <p>Enter your details to login</p>
          <div style={{ width: '30%' }} className="form-group">
            <label htmlFor="username" className="form-label">
              Username
              <input onChange={this.handleChangeUsername} type="text" className="form-control" name="username" placeholder="Enter Username" required />
            </label>
          </div>
          <div style={{ width: '30%' }} className="form-group">
            <label htmlFor="password" className="form-label">
              Password
              <input onChange={this.handleChangePassword} type="password" className="form-control" name="password" placeholder="Enter Your Password" required />
            </label>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}
export default Login;
