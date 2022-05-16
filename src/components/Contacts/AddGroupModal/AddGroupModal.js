import React, { useState } from 'react';
import { Channel } from 'stream-chat-react';
import './AddGroupModal.css';

const AddGroupModal = ({ setIsAddGroupModalShowed, client }) => {
  const [groupName, setGroupName] = useState('');
  const closeModal = () => {
    setIsAddGroupModalShowed(false);
  };

  const createChannel = async () => {
    const channel = client.channel('messaging', {
      name: groupName,
      members: ['hyodduru', 'hoje15v'],
    });

    const state = await channel.watch();
  };

  return (
    <div className="addGroupModal">
      <div className="modal__msg">
        <header className="modal__header">
          <h1 className="modal__title">Add a new group</h1>
          <div className="header__line" />
        </header>
        <form className="modal__form">
          <label htmlFor="groupName">Group name</label>
          <input
            className="modal__input"
            type="text"
            placeholder="Type a group name (Up to 12 characters)"
            onChange={e => setGroupName(e.target.value)}
            value={groupName}
          />
        </form>
        <footer className="modal__footer">
          <div className="footer__line" />
          <button className="modal__btn__cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="modal__btn__add" onClick={createChannel}>
            Add
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddGroupModal;
