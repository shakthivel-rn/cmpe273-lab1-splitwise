import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : ""
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    handleChangeUsername = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        axios.post("http://localhost:3001/login", data)
        .then(response => {
            alert('Login Successfull');
        })
        .catch(err => {
            alert('Invalid Username or Password');
        })
    }

    render() {
        return (
            <div class='container'>
            <form method="post" onSubmit={this.submitLogin}>
                <h1>Sign In</h1>
                <p>Enter your details to login</p>
                    <div style={{width: '30%'}} class="form-group">
                        <label for="username" class="form-label">Username</label>
                        <input onChange={this.handleChangeUsername} type="text" class="form-control" name="username" placeholder="Enter Username" required/>
                    </div>
                    <div style={{width: '30%'}} class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input onChange={this.handleChangePassword} type="password" class="form-control" name="password" placeholder="Enter Your Password" required/>
                    </div>
                    <button type="submit">Sign In</button>    
            </form>
        </div>
        )
    }
}

export default Login;