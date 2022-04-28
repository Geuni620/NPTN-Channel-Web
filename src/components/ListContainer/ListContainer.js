import React from 'react';
import ChatList from '../ChatList/ChatList';
import Contacts from '../Contacts/Contacts';
import './ListContainer.css';

const ListContainer = () => {
  return (
    <div>
      <ChatList />
      <Contacts />
    </div>
  );
};

export default ListContainer;
