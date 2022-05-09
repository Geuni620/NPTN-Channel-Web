import React from 'react';
import './DashBoard.css';

const DashBoard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__notSelected">
        <h3>No chatroom is selected</h3>
        <p>
          What you select the classroom from the left list, <br />
          It will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default DashBoard;
