import React, { Component } from 'react';
import '../../App.css';
import {
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DashboardSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:3001/dashboard/getGroupNames', { params: { userId: 1 } });
    const { groups } = this.state;
    this.setState({
      groups: groups.concat(res.data),
    });
  }

  render() {
    const { groups } = this.state;
    const groupNames = groups.map((group) => (
      <ListGroup.Item><Link to="/dashboard">{group.group_name}</Link></ListGroup.Item>
    ));
    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            <Link to="/dashboard">Dashboard</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/recentactivity">Recent Activity</Link>
          </ListGroup.Item>
        </ListGroup>
        <p id="grouptag">GROUPS</p>
        <ListGroup>
          {groupNames}
        </ListGroup>
      </div>
    );
  }
}

export default DashboardSideBar;
