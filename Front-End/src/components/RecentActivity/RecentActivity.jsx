import React, { Component } from 'react';
import '../../App.css';
import './RecentActivity.css';
import { Redirect } from 'react-router';
import {
  Container, Row, Col, ListGroup, Fade,
} from 'react-bootstrap';
import cookie from 'react-cookies';
import axios from 'axios';
import Navigationbar from '../Navigationbar/Navigationbar';
import DashboardSideBar from '../Dashboard/DashboardSideBar';

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
      redirectFlag: false,
      recentactivitylogs: [],
      fadeFlag: false,
    };
  }

  async componentDidMount() {
    const { userId } = this.state;
    const res = await axios.get('http://localhost:3001/recentActivity', { params: { userId } });
    const { recentactivitylogs } = this.state;
    this.setState({
      recentactivitylogs: recentactivitylogs.concat(res.data),
      fadeFlag: true,
    });
  }

  render() {
    if (!cookie.load('cookie')) {
      this.setState({
        redirectFlag: true,
      });
    }
    const { redirectFlag, recentactivitylogs, fadeFlag } = this.state;
    const recentactivityloglist = [];
    recentactivitylogs.forEach((recentactivitylog) => {
      if (recentactivitylog.status === 'added') {
        recentactivityloglist.push(
          <ListGroup.Item>{`${recentactivitylog.paidUserName} ${recentactivitylog.status} ${recentactivitylog.expenseName} expense of ${recentactivitylog.expenseAmount}$ in ${recentactivitylog.groupName} group` }</ListGroup.Item>,
        );
      }
      if (recentactivitylog.status === 'owes') {
        if (recentactivitylog.owedUserName === 'You') {
          recentactivityloglist.push(
            <ListGroup.Item>{`${recentactivitylog.owedUserName} owe ${recentactivitylog.paidUserName} ${recentactivitylog.splitAmount}$ in ${recentactivitylog.expenseName} expense` }</ListGroup.Item>,
          );
        } else {
          recentactivityloglist.push(
            <ListGroup.Item>{`${recentactivitylog.owedUserName} ${recentactivitylog.status} ${recentactivitylog.paidUserName} ${recentactivitylog.splitAmount}$ in ${recentactivitylog.expenseName} expense` }</ListGroup.Item>,
          );
        }
      }
      if (recentactivitylog.status === 'paid') {
        recentactivityloglist.push(
          <ListGroup.Item>{`${recentactivitylog.owedUserName} ${recentactivitylog.status} ${recentactivitylog.paidUserName} ${recentactivitylog.splitAmount}$ in ${recentactivitylog.expenseName} expense` }</ListGroup.Item>,
        );
      }
    });
    return (
      <div>
        {redirectFlag ? <Redirect to="/" /> : null}
        <Navigationbar />
        <div className="container">
          <div className="recentactivity">
            <Container>
              <Row>
                <Col lg={2}>
                  <DashboardSideBar />
                </Col>
                <Col>
                  <h3 id="recentactivitytitle">Recent Activity</h3>
                  <Fade in={fadeFlag}>
                    <div id="recentactivitycontent">
                      <ListGroup variant="flush">
                        {recentactivityloglist}
                      </ListGroup>
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

export default RecentActivity;
