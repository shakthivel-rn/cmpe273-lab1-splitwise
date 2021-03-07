import React, { Component } from 'react';
import '../../App.css';
import './CreateGroup.css';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import {
  Container, Row, Col, Form, Figure, Button,
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar';

class CreateGroup extends Component {
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
          <div className="creategroup">
            <h1>Create new group page:</h1>
            <div className="groupdetails">
              <Container>
                <Row>
                  <Col lg={3}>
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={`${window.location.origin}/group.png`}
                      />
                    </Figure>
                    <Form>
                      <Form.Group>
                        <Form.File id="userimage" label="Change your avatar" />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <p>START A NEW GROUP</p>
                    <p>My group shall be called...</p>
                    <Form>
                      <Form.Group controlId="formGroupName">
                        <Form.Control type="text" name="groupname" placeholder="Enter Group Name" required />
                      </Form.Group>
                      <p>GROUP MEMBERS</p>
                      <Form.Group controlId="formGroupMember1">
                        <Form.Control type="text" name="groupmember1" placeholder="Enter Email Id" required />
                      </Form.Group>
                      <Form.Group controlId="formGroupMember2">
                        <Form.Control type="text" name="groupmember2" placeholder="Enter Email Id" required />
                      </Form.Group>
                      <Form.Group controlId="formGroupMember3">
                        <Form.Control type="text" name="groupmember3" placeholder="Enter Email Id" required />
                      </Form.Group>
                      <Form.Group controlId="formGroupMember4">
                        <Form.Control type="text" name="groupmember4" placeholder="Enter Email Id" required />
                      </Form.Group>
                      <Button variant="success" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
