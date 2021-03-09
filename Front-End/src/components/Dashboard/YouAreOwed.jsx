import axios from 'axios';
import React, { Component } from 'react';
import '../../App.css';
import './YouAreOwed.css';
import {
  ListGroup,
} from 'react-bootstrap';

class YouAreOwed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
      owed: [],
    };
  }

  async componentDidMount() {
    const { userId } = this.state;
    const res = await axios.get('http://localhost:3001/dashboard/getIndividualPaidAmount', { params: { userId } });
    const { owed } = this.state;
    this.setState({
      owed: owed.concat(res.data),
    });
  }

  render() {
    const { owed } = this.state;
    const owedlist = owed.map((individualowed) => <ListGroup.Item>{`${individualowed.owedUserName} owes you ${individualowed.individualPaidAmount}$ in ${individualowed.groupName}` }</ListGroup.Item>);
    return (
      <div>
        <div className="youareowedcontainer">
          <h4>You Are Owed</h4>
          <ListGroup variant="flush">
            {owedlist}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default YouAreOwed;
