import React from 'react';
import '../../App.css';
import './LandingPage.css';
import Navigationbar from '../Navigationbar/Navigationbar';

function LandingPage() {
  return (
    <div>
      <Navigationbar />
      <div className="container">
        <div className="description">
          <h1> Less stress when </h1>
          <br />
          <h1>sharing expenses</h1>
          <br />
          <h1>on trips</h1>
          <br />
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
