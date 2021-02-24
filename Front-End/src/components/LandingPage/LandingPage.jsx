import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  const register = (
    <ul>
      <li><Link to="/register">Register</Link></li>
    </ul>
  );
  const login = (
    <ul>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
  return (
    <div>
      {register}
      {login}
    </div>
  );
}
export default LandingPage;
