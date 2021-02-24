import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import Register from './Register/Register';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path='/' component={LandingPage} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
            </div>
        )
    }
}

export default Main;