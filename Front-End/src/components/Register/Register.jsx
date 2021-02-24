import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
    let redirectPage = null;
    const { redirectFlag } = this.state;
    if (redirectFlag) {
      redirectPage = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectPage}
        <div className="container">
          <form method="post" onSubmit={this.submitRegister}>
            <h1>Sign Up</h1>
            <p>Enter your details to create an account</p>
            <div style={{ width: '30%' }} className="form-group">
              <label htmlFor="username" className="form-label">
                Username
                <input onChange={this.handleChangeUsername} type="text" className="form-control" name="username" placeholder="Enter Your Username" required />
              </label>
            </div>
            <div style={{ width: '30%' }} className="form-group">
              <label htmlFor="password" className="form-label">
                Password
                <input onChange={this.handleChangePassword} type="password" className="form-control" name="password" placeholder="Enter Your Password" required />
              </label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
