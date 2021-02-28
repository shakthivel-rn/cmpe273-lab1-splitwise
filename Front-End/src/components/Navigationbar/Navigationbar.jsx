import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Navbar, Nav, Button } from 'react-bootstrap';

class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
  }

  render() {
    let navLogin = null;
    if (cookie.load('cookie')) {
      navLogin = (
        <Nav className="ml-auto">
          <Button variant="success" onClick={this.handleLogout} href="/">Sign Out</Button>
        </Nav>
      );
    } else {
      navLogin = (
        <Nav className="ml-auto">
          <Button variant="outline-success" className="mr-sm-2" href="/login">Sign In</Button>
          <Button variant="success" href="/register">Sign Up</Button>
        </Nav>
      );
    }
    return (
      <div>
        <Navbar id="nav-bar" bg="light" expand="lg">
          <div className="container">
            <Navbar.Brand id="nav-brand" href="/">Splitwise</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {navLogin}
          </div>
        </Navbar>
      </div>
    );
  }
}
export default Navigationbar;
