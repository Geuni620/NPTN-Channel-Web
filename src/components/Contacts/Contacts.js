import React from 'react';
import Silders from '../../assets/Silders';
import UserPlus from '../../assets/UserPlus';
import './Contacts.css';

const Contacts = () => {
  return (
    <div className="contacts">
      <header className="contacts__header">
        <span className="contacts__title">Contacts</span>
        <div className="contacts__icons">
          <Silders />
          <UserPlus />
        </div>
      </header>
    </div>
  );
};

export default Contacts;
