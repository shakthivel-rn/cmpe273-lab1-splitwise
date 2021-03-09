import React, { Component } from 'react';
import '../../App.css';
import './Register.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import Navigationbar from '../Navigationbar/Navigationbar';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectFlag: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
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

  submitRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const data = {
      name,
      email,
      password,
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/register', data)
      .then((response) => {
        const { onSubmitUser } = this.props;
        onSubmitUser(response.data);
        localStorage.setItem('userId', response.data.id);
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
        {redirectFlag ? <Redirect to="/dashboard" /> : null}
        <Navigationbar />
        <div className="container">
          <Form id="signup-form" method="post" onSubmit={this.submitRegister}>
            <h1>Sign Up</h1>
            <p>Enter your details to create an account</p>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={this.handleChangeName} type="text" name="name" placeholder="Enter Your Name" required />
            </Form.Group>
            <Form.Group controlId="formEmail">
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
Register.defaultProps = {
  onSubmitUser: () => {},
};

Register.propTypes = {
  onSubmitUser: propTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
