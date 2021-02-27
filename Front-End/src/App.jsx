import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div>
      <Navbar id="nav-bar" bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand id="nav-brand" href="/">Splitwise</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button variant="outline-success" className="mr-sm-2" href="/login">Sign In</Button>
              <Button variant="success" href="/register">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </div>
  );
}

export default App;
