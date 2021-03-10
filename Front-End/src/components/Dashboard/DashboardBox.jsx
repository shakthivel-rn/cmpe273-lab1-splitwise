import React, { useEffect, useState } from 'react';
import '../../App.css';
import './DashboardBox.css';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import axios from 'axios';

function Dashboardbox() {
  const [userId] = useState(localStorage.getItem('userId'));
  const [totalBalance, setTotalBalance] = useState(0);
  const [youOwe, setYouOwe] = useState(0);
  const [youAreOwed, setYouAreOwed] = useState(0);
  useEffect(() => {
    const getPaidAndOwedAmount = async () => {
      const res = await axios.get('http://localhost:3001/dashboard/getTotalPaidAndOwedAmount', { params: { userId } });
      setYouOwe(res.data.totalOwedAmount);
      setYouAreOwed(res.data.totalPaidAmount);
      setTotalBalance(res.data.totalPaidAmount - res.data.totalOwedAmount);
    };
    getPaidAndOwedAmount();
  }, [userId]);
  return (
    <div>
      <div id="dashboardcontainer">
        <div>
          <Row>
            <Col lg={8}><h3>Dashboard</h3></Col>
            <Col><Button id="addabill" href="/dashboard">Add a bill</Button></Col>
            <Col><Button variant="success" href="/dashboard">Settle Up</Button></Col>
          </Row>
        </div>
        <div id="balance">
          <Row>
            <div className="balancedisplay">
              <Col>
                total balance
                <br />
                {totalBalance}
                $
              </Col>
            </div>
            <div className="balancedisplay">
              <Col>
                you owe
                <br />
                {youOwe}
                $
              </Col>
            </div>
            <Col>
              you are owed
              <br />
              {youAreOwed}
              $
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Dashboardbox;
