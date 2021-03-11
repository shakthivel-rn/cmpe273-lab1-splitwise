import React, { Component } from 'react';
import '../../App.css';
import './CreateGroup.css';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import {
  Container, Row, Col, Form, Figure, Button,
} from 'react-bootstrap';
import axios from 'axios';
import Navigationbar from '../Navigationbar/Navigationbar';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
      groupName: '',
      redirectFlag: false,
      inputs: ['Enter Group Member Email'],
      memberEmails: [],
    };
    this.appendInput = this.appendInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeGroupName = this.handleChangeGroupName.bind(this);
    this.submitGroup = this.submitGroup.bind(this);
  }

  handleChangeGroupName(e) {
    this.setState({
      groupName: e.target.value,
    });
  }

  handleChange(event, i) {
    const { memberEmails } = this.state;
    memberEmails[i] = event.target.value;
    this.setState({
      memberEmails,
    });
  }

  submitGroup = (e) => {
    e.preventDefault();
    const { memberEmails, groupName, userId } = this.state;
    const data = {
      userId,
      memberEmails,
      groupName,
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/createGroup', data);
  }

  appendInput() {
    const { inputs } = this.state;
    const newInput = 'Enter Group Member Email';
    this.setState({
      inputs: inputs.concat(newInput),
    });
  }

  removeInput() {
    const { inputs, memberEmails } = this.state;
    inputs.pop();
    memberEmails.pop();
    this.setState({
      inputs,
      memberEmails,
    });
  }

  render() {
    if (!cookie.load('cookie')) {
      this.setState({
        redirectFlag: true,
      });
    }
    const { redirectFlag, inputs } = this.state;
    const formInputs = inputs.map((input, i) => (
      <Form.Group>
        <Form.Control type="text" onChange={(e) => this.handleChange(e, i)} placeholder={input} required />
      </Form.Group>
    ));
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
                    <Form method="post" onSubmit={this.submitGroup}>
                      <Form.Group controlId="formGroupName">
                        <Form.Control type="text" onChange={this.handleChangeGroupName} name="groupname" placeholder="Enter Group Name" required />
                      </Form.Group>
                      <p>GROUP MEMBERS</p>
                      {formInputs}
                      <Button className="groupButtons" variant="success" onClick={this.appendInput}>Add Member</Button>
                      <Button className="groupButtons" variant="success" onClick={this.removeInput}>Remove Member</Button>
                      <Button className="groupButtons" variant="success" type="submit">
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
