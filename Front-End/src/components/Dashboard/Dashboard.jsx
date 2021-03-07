import React, { Component } from 'react';
import '../../App.css';
import './Dashboard.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import {
  Container, Row, Col, ListGroup, Button,
} from 'react-bootstrap';
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
          <div className="dashboard">
            <Container>
              <Row>
                <Col lg={2}>
                  <ListGroup>
                    <ListGroup.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="/dashboard">Recent Activity</Link>
                    </ListGroup.Item>
                  </ListGroup>
                  <p id="grouptag">GROUPS</p>
                  <ListGroup>
                    <ListGroup.Item><Link to="/dashboard">Group 1</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/dashboard">Group 2</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/dashboard">Group 3</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/dashboard">Group 4</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/dashboard">Group 5</Link></ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Row>
                        <Col lg={8}><h3>Dashboard</h3></Col>
                        <Col><Button variant="success" href="/dashboard">Add a bill</Button></Col>
                        <Col><Button variant="success" href="/dashboard">Settle Up</Button></Col>
                      </Row>
                      <Row>
                        <Col>total balance</Col>
                        <Col>you owe</Col>
                        <Col>you are owed</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>YOU OWE</Col>
                    <Col>YOU ARE OWED</Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
