import React from 'react';
import './ContactsDashboard.css';
import { FaUserAlt } from 'react-icons/fa';
import { IoCallOutline } from 'react-icons/io5';
import { BsChatLeft } from 'react-icons/bs';

const ContactsDashboard = ({ user }) => {
  const { image, id } = user;

  return (
    <div className="contacts-dashboard">
      {id ? (
        <div className="dashboard__selected">
          <div className="dashboard-background">
            <img
              src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="background"
            />
          </div>
          <div className="avatar">
            {image ? (
              <img className="avatar__img" src={image} alt="avatar" />
            ) : (
              <FaUserAlt className="basic__user" />
            )}
          </div>
          <div className="userInfo">
            <div className="userInfo__name">{id}</div>
            <div className="userInfo__company">Neptune Cloud</div>
            <div className="userInfo__description">Description comes here</div>
          </div>
          <button className="btn btn__call">
            <IoCallOutline />
            <span>Call</span>
          </button>
          <button className="btn btn__chat">
            <BsChatLeft />
            <span>Chat</span>
          </button>
        </div>
      ) : (
        <div className="dashboard__notSelected">
          <h3>No chatroom is selected</h3>
          <p>
            What you select the classroom from the left list, <br />
            It will be displayed here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactsDashboard;
