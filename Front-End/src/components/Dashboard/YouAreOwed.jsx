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
      owed: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:3001/dashboard/getIndividualPaidAmount', { params: { userId: 1 } });
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
        <div>
          <ListGroup variant="flush">
            {owedlist}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default YouAreOwed;
