import React, { Component } from 'react';
import '../../App.css';
import './MyGroups.css';
import { Redirect } from 'react-router';
import {
  Container, Row, Col, ListGroup, Fade, Button,
} from 'react-bootstrap';
import cookie from 'react-cookies';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Navigationbar from '../Navigationbar/Navigationbar';
import DashboardSideBar from '../Dashboard/DashboardSideBar';

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem('userId'),
      redirectFlag: false,
      inviteList: [],
      fadeFlag: false,
      inviteFlag: false,
      redirectPage: '',
    };
    this.handleAcceptInvite = this.handleAcceptInvite.bind(this);
  }

  async componentDidMount() {
    const { userId } = this.state;
    const res = await axios.get('http://localhost:3001/myGroups', { params: { userId } });
    this.setState({
      inviteList: [...res.data],
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
    axios.post('http://localhost:3001/myGroups/acceptGroupInvite', data)
      .then(() => {
        this.setState({
          inviteFlag: true,
        });
      });
  }

  render() {
    if (!cookie.load('cookie')) {
      this.setState({
        redirectFlag: true,
      });
    }
    const {
      redirectFlag, inviteList, fadeFlag, inviteFlag, redirectPage,
    } = this.state;
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
        {inviteFlag ? (
          <SweetAlert
            success
            title="Invite accepted"
            onConfirm={() => {
              this.setState({
                redirectPage: <Redirect to="/dashboard" />,
              });
            }}
          />
        ) : null}
        {redirectFlag ? <Redirect to="/" /> : null}
        {redirectPage}
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
