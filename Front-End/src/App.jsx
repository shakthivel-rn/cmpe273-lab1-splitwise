import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Profilepage from './components/ProfilePage/Profilepage';
import CreateGroup from './components/CreateGroup/CreateGroup';
import RecentActivity from './components/RecentActivity/RecentActivity';
import GroupPage from './components/GroupPage/GroupPage';

function App() {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profilepage" component={Profilepage} />
      <Route exact path="/creategroup" component={CreateGroup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/recentactivity" component={RecentActivity} />
      <Route path="/grouppage" component={GroupPage} />
    </div>
  );
}

export default App;
