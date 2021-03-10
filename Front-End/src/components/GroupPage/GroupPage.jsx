import React, { Component } from 'react';
import '../../App.css';
import './GroupPage.css';
import { Redirect } from 'react-router';
import {
  Container, Row, Col, Button, ListGroup, Modal,
} from 'react-bootstrap';
import cookie from 'react-cookies';
import axios from 'axios';
import Navigationbar from '../Navigationbar/Navigationbar';
import DashboardSideBar from '../Dashboard/DashboardSideBar';
import AddExpenseForm from './AddExpenseForm';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: 0,
      redirectFlag: false,
      groupDatas: [],
      isModalOpen: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    const { groupId } = nextProps.location.state;
    return ({
      groupId,
    });
  }

  async componentDidMount() {
    const { groupId } = this.state;
    const res = await axios.get('http://localhost:3001/groupPage', { params: { groupId } });
    this.setState({
      groupDatas: [...res.data],
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { groupId } = this.state;
    if (groupId !== prevState.groupId) {
      const res = await axios.get('http://localhost:3001/groupPage', { params: { groupId } });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        groupDatas: [...res.data],
      });
    }
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    if (!cookie.load('cookie')) {
      this.setState({
        redirectFlag: true,
      });
    }
    const { redirectFlag } = this.state;
    const { groupId } = this.state;
    const { groupDatas } = this.state;
    const groupDataList = [];
    groupDatas.forEach((groupData) => {
      groupDataList.push(
        <ListGroup.Item>{`${groupData.expenseName} ${groupData.paidUserName} ${groupData.owedUserName} ${groupData.splitAmount} ${groupData.status}` }</ListGroup.Item>,
      );
    });
    const { isModalOpen } = this.state;
    return (
      <div>
        {redirectFlag ? <Redirect to="/" /> : null}
        <Navigationbar />
        <div className="container">
          <div className="groupcontainer">
            <Container>
              <Row>
                <Col lg={2}>
                  <DashboardSideBar />
                </Col>
                <Col>
                  <div id="grouppagetop">
                    <Row>
                      <Col lg={7}>
                        <h3>Group Name</h3>
                      </Col>
                      <Col><Button id="addanexpense" onClick={this.openModal}>Add an expense</Button></Col>
                      <Modal show={isModalOpen}>
                        <Modal.Header id="modaltop">
                          <Modal.Title>Add an expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <AddExpenseForm groupId={groupId} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={this.closeModal} id="closemodal">Close Modal</Button>
                        </Modal.Footer>
                      </Modal>
                    </Row>
                  </div>
                  <Row>
                    <ListGroup variant="flush">
                      {groupDataList}
                    </ListGroup>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupPage;
