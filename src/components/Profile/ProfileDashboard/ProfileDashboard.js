import React from 'react';
import './ProfileDashboard.css';
import { AiOutlineEdit } from 'react-icons/ai';

const ProfileDashboard = () => {
  return (
    <div className="profile-dashboard">
      <div className="dashboard-background" />
      <div className="avatar">
        {/* <img className="avatar__img" src="./images/profile.jpg" alt="avatar" /> */}
      </div>
      <div className="userInfo">
        <div className="userInfo__name">Steve Yoo</div>
        <div className="userInfo__company">Neptune Cloud</div>
        <div className="userInfo__description">Description comes here</div>
        <button className="edit__btn">
          <AiOutlineEdit />
          Edit profile
        </button>
        <div className="dashboard__taps">
          <div className="tap">Activities</div>
          <div className="tap">Achievements</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
