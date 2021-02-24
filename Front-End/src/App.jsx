import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <h1>Splitwise</h1>
      <div>
        <Route path="/" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </div>
  );
}

export default App;
