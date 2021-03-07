import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import {
  Navbar, Nav, Button, Dropdown,
} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
    const { onLogoutUser } = this.props;
    onLogoutUser();
  }

  render() {
    let navLogin = null;
    if (cookie.load('cookie')) {
      navLogin = (
        <Nav className="ml-auto">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profilepage">Profile Page</Dropdown.Item>
              <Dropdown.Item href="/creategroup">Create Group</Dropdown.Item>
              <Dropdown.Item onClick={this.handleLogout} href="/">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
            <Navbar.Brand id="nav-brand" href="/dashboard">Splitwise</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {navLogin}
          </div>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogoutUser: () => dispatch({ type: 'REMOVE_USER' }),
});

Navigationbar.defaultProps = {
  onLogoutUser: () => {},
};

Navigationbar.propTypes = {
  onLogoutUser: propTypes.func,
};
export default connect(mapDispatchToProps)(Navigationbar);
