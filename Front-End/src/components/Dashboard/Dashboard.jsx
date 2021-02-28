import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Navigationbar from '../Navigationbar/Navigationbar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectFlag: false,
    };
  }

  render() {
    if (!cookie.load('cookie')) {
      this.setState({
        redirectFlag: true,
      });
    }
    const { redirectFlag } = this.state;
    return (
      <div>
        {redirectFlag ? <Redirect to="/" /> : null}
        <Navigationbar />
        <div className="container">
          <h1>Dashboard Page</h1>
        </div>
      </div>
    );
  }
}

export default Dashboard;
