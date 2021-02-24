import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { render } from '@testing-library/react';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let register = (
            <ul>
                <li><Link to="/register">Register</Link></li>
            </ul>
        )
        let login = (
            <ul>
                <li><Link to="/login">Login</Link></li>
            </ul>
        )
        return (
            <div>
                <h1>Hello</h1>
                {register}
                {login}
            </div>
        )
    }
}

export default LandingPage;