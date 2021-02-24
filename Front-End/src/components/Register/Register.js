import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            redirectFlag : false
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
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

    submitRegister = (e) => {
        e.preventDefault()
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        axios.post("http://localhost:3001/register", data)
        .then(response => {
            this.setState({
                redirectFlag : true
            })
        })
        .catch(err => {
            alert('Invalid Registration');
        })
    }

    render() {
        let redirectPage = null;
        if(this.state.redirectFlag) {
            redirectPage = <Redirect to="/login" />
        }
        return (
            <div>
            {redirectPage}
            <div class="container">
            <form method="post" onSubmit={this.submitRegister}>
                <h1>Sign Up</h1>
                <p>Enter your details to create an account</p>
                <div style={{width: '30%'}} class="form-group">
                    <label for="username" class="form-label">Username</label>
                    <input onChange={this.handleChangeUsername} type="text" class="form-control" name="username" placeholder="Enter Your Username" required/>
                </div>
                <div style={{width: '30%'}} class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input onChange={this.handleChangePassword} type="password" class="form-control" name="password" placeholder="Enter Your Password" required/>
                </div>
                <button type="submit">Sign Up</button>
            </form>   
        </div>
        </div>
        )
    }

}

export default Register;