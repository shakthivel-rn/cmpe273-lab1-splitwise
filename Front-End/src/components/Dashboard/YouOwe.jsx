import axios from 'axios';
import React, { Component } from 'react';
import '../../App.css';
import './YouOwe.css';
import {
  ListGroup,
} from 'react-bootstrap';

class YouOwe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
      youowes: [],
    };
  }

  async componentDidMount() {
    const { userId } = this.state;
    const res = await axios.get('http://localhost:3001/dashboard/getIndividualOwedAmount', { params: { userId } });
    const { youowes } = this.state;
    this.setState({
      youowes: youowes.concat(res.data),
    });
  }

  render() {
    const { youowes } = this.state;
    const youowelist = youowes.map((youowe) => <ListGroup.Item>{`You owe ${youowe.paidUserName} ${youowe.individualOwedAmount}$ in ${youowe.groupName}` }</ListGroup.Item>);
    return (
      <div>
        <div id="youowecontainer">
          <h4>You Owe</h4>
          <ListGroup variant="flush">
            {youowelist}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default YouOwe;
