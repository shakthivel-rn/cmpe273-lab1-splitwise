import React, { Component } from 'react';
import '../../App.css';
import './Profilepage.css';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import {
  Container, Row, Col, Form, Button, Figure,
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar';

class Profilepage extends Component {
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
          <div className="profilepage">
            <h1>Your Account</h1>
            <div className="userdetails">
              <Container>
                <Row>
                  <Col lg={3}>
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={`${window.location.origin}/dummy_user.png`}
                      />
                    </Figure>
                    <Form>
                      <Form.Group>
                        <Form.File id="userimage" label="Change your avatar" />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <p>Your Name</p>
                    <Form inline>
                      <Form.Group controlId="editUserName">
                        <Form.Control className="mb-2 mr-sm-2" id="username" placeholder="Your Name" />
                      </Form.Group>
                      <Button variant="outline-success" type="submit" className="mb-2">
                        Edit
                      </Button>
                    </Form>
                    <br />
                    <p>Your email address</p>
                    <Form inline>
                      <Form.Group controlId="editUserEmail">
                        <Form.Control className="mb-2 mr-sm-2" id="useremail" placeholder="Your Email" />
                      </Form.Group>
                      <Button variant="outline-success" type="submit" className="mb-2">
                        Edit
                      </Button>
                    </Form>
                    <br />
                    <p>Your phone number</p>
                    <Form inline>
                      <Form.Group controlId="editUserPhone">
                        <Form.Control className="mb-2 mr-sm-2" id="userphone" placeholder="Your Phonenumber" />
                      </Form.Group>
                      <Button variant="outline-success" type="submit" className="mb-2">
                        Edit
                      </Button>
                    </Form>
                  </Col>
                  <Col>
                    <p>Your default currency</p>
                    <Form inline>
                      <Form.Control as="select" className="my-1 mr-sm-2" id="defaultcurrency" custom>
                        <option value="0">Choose Currency</option>
                        <option value="1">USD</option>
                        <option value="2">KWD</option>
                        <option value="3">BHD</option>
                        <option value="4">GBP</option>
                        <option value="5">EUR</option>
                        <option value="6">CAD</option>
                      </Form.Control>
                      <Button variant="outline-success" type="submit" className="my-1">
                        Edit
                      </Button>
                    </Form>
                    <br />
                    <p>Your time zone</p>
                    <Form inline>
                      <Form.Control as="select" className="my-1 mr-sm-2" id="defaulttimezone" custom>
                        <option value="0">Choose Timezone</option>
                        <option value="1">Atlantic Standard Time (AST)</option>
                        <option value="2">Eastern Standard Time (EST)</option>
                        <option value="3">Central Standard Time (CST)</option>
                        <option value="4">Mountain Standard Time (MST)</option>
                        <option value="5">Pacific Standard Time (PST)</option>
                        <option value="6">Alaskan Standard Time (AKST)</option>
                        <option value="7">Hawaii-Aleutian Standard Time (HST)</option>
                        <option value="8">Samoa standard time (UTC-11)</option>
                        <option value="9">Chamorro Standard Time (UTC+10)</option>
                      </Form.Control>
                      <Button variant="outline-success" type="submit" className="my-1">
                        Edit
                      </Button>
                    </Form>
                    <br />
                    <p>Language</p>
                    <Form inline>
                      <Form.Control as="select" className="my-1 mr-sm-2" id="defaultlanguage" custom>
                        <option value="0">Choose Language</option>
                        <option value="1">English</option>
                        <option value="2">Spanish</option>
                        <option value="3">Chinese</option>
                        <option value="5">Japanese</option>
                        <option value="6">French</option>
                      </Form.Control>
                      <Button variant="outline-success" type="submit" className="my-1">
                        Edit
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

export default Profilepage;
