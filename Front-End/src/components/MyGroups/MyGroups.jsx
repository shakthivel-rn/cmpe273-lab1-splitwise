import React, { Component } from 'react';
import '../../App.css';
import './MyGroups.css';
import { Redirect } from 'react-router';
import {
  Container, Row, Col, ListGroup, Fade, Button,
} from 'react-bootstrap';
import cookie from 'react-cookies';
import axios from 'axios';
import Navigationbar from '../Navigationbar/Navigationbar';
import DashboardSideBar from '../Dashboard/DashboardSideBar';

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
      redirectFlag: false,
      inviteList: [],
      fadeFlag: false,
    };
    this.handleAcceptInvite = this.handleAcceptInvite.bind(this);
  }

  async componentDidMount() {
    const { userId } = this.state;
    const res = await axios.get('http://localhost:3001/myGroups', { params: { userId } });
    const { inviteList } = this.state;
    this.setState({
      inviteList: inviteList.concat(res.data),
      fadeFlag: true,
    });
  }

  handleAcceptInvite(groupId) {
    const { userId } = this.state;
    const data = {
      userId,
      groupId,
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/myGroups/acceptGroupInvite', data);
  }

  render() {
    if (!cookie.load('cookie')) {
      this.setState({
        redirectFlag: true,
      });
    }
    const { redirectFlag, inviteList, fadeFlag } = this.state;
    const inviteListDetails = [];
    inviteList.forEach((inviteListItem) => {
      inviteListDetails.push(
        <ListGroup.Item>
          <Row>
            <Col lg={8}>{`${inviteListItem.creatorUser} invited you to join ${inviteListItem.groupName} group`}</Col>
            <Col>
              <Button className="acceptinvitebutton" onClick={() => this.handleAcceptInvite(inviteListItem.groupId)}>
                Accept
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>,
      );
    });
    return (
      <div>
        {redirectFlag ? <Redirect to="/" /> : null}
        <Navigationbar />
        <div className="container">
          <div className="mygroups">
            <Container>
              <Row>
                <Col lg={2}>
                  <DashboardSideBar />
                </Col>
                <Col>
                  <h3 id="groupinvitetitle">Group Invites</h3>
                  <Fade in={fadeFlag}>
                    <div id="invitecontainer">
                      <Container>
                        <ListGroup variant="flush">
                          {inviteListDetails}
                        </ListGroup>
                      </Container>
                    </div>
                  </Fade>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default MyGroups;
