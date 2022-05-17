import React, { useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from '@firebase/firestore';
import { db } from '../../../service/firebase';
import { getUserId } from '../../../utils';

import './AddContactModal.css';

const AddContactModal = ({
  setIsAddContactModalShowed,
  showSuccessMsg,
  setContacts,
  client,
}) => {
  const [newContact, setNewContact] = useState('');

  const closeModal = () => {
    setIsAddContactModalShowed(false);
  };

  const updateContactList = async () => {
    const userInfo = await getDoc(doc(db, 'users', getUserId()));

    const { friend_list } = userInfo.data();

    const response = await client.queryUsers({
      id: { $in: friend_list },
    });
    setContacts(response.users);

    if (!response.users.map(user => user.id).includes(newContact))
      alert('Sorry, corresponding user is not found');
    else showSuccessMsg();
  };

  const sendContact = () => {
    updateDoc(doc(db, 'users', getUserId()), {
      friend_list: arrayUnion(newContact),
    });

    updateContactList();
    closeModal();
  };

  return (
    <div className="addGroupModal">
      <div className="modal__msg">
        <header className="modal__header">
          <h1 className="modal__title">Add a new contact</h1>
          <div className="header__line" />
        </header>
        <form className="modal__form">
          <label htmlFor="groupName">User ID</label>
          <input
            className="modal__input"
            type="text"
            placeholder="Type a user ID"
            onChange={e => setNewContact(e.target.value)}
            value={newContact}
          />
        </form>
        <footer className="modal__footer">
          <div className="footer__line" />
          <button className="modal__btn__cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="modal__btn__add" onClick={sendContact}>
            Add
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddContactModal;
