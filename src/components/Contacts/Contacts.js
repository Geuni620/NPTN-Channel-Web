import React, { useEffect, useState, useCallback } from 'react';

import { useChatContext, Avatar } from 'stream-chat-react';

import _debounce from 'lodash.debounce';

import './Contacts.css';
import ContactsDashboard from './ContactsDashboard/ContactsDashboard';
import { UserPlus, SearchIcon, Silders } from '../../assets/Icons';
import { BiUser } from 'react-icons/bi';
import { Success } from '../../assets/Icons';
import AddContactModal from './AddContactModal/AddContactModal';
import { getDoc, doc } from '@firebase/firestore';
import { db } from '../../service/firebase';
import { getUserId } from '../../utils';

const Contacts = () => {
  const { client } = useChatContext();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [query, setQuery] = useState('');
  const [isAddContactModalShowed, setIsAddContactModalShowed] = useState(false);
  const [isSuccessShowed, setIsSuccessShowed] = useState(false);
  const [isChannelShowed, setIsChannelShowed] = useState(false);

  const showSuccessMsg = () => {
    setIsSuccessShowed(true);

    setTimeout(() => setIsSuccessShowed(false), 3000);
  };

  const getContactList = useCallback(async () => {
    if (query !== '') return;
    // get list from firestore
    const userInfo = await getDoc(doc(db, 'users', getUserId()));

    const { friend_list } = userInfo.data();

    // get list from getstream
    const response = await client.queryUsers({
      id: { $in: friend_list },
    });
    setContacts(response.users);
  }, [client, query]);

  useEffect(() => {
    getContactList();
  }, [getContactList]);

  useEffect(() => {
    const searchContacts = async () => {
      if (query === '') return;
      const response = await client.queryUsers({
        id: { $autocomplete: query },
      });

      setContacts(response.users);
    };

    const searchContactsDebounce = _debounce(searchContacts, 2000, {
      trailing: true,
    });

    searchContactsDebounce();
  }, [client, query]);

  const showAddgroupModal = () => {
    setIsAddContactModalShowed(true);
  };

  const closeChannel = () => {
    setIsChannelShowed(false);
  };

  return (
    <div className="contacts">
      {isAddContactModalShowed && (
        <AddContactModal
          setIsAddContactModalShowed={setIsAddContactModalShowed}
          client={client}
          setContacts={setContacts}
          showSuccessMsg={showSuccessMsg}
        />
      )}
      <div className={isSuccessShowed ? 'success__msg show' : 'success__msg'}>
        <Success />
        <span>A new contact has been added successfully.</span>
      </div>

      <div className="contactList" onClick={closeChannel}>
        <header className="contacts__header">
          <span className="contacts__title">Contacts</span>
          <div className="contacts__icons">
            <button className="btn__sliders">
              <Silders />
            </button>
            <button className="btn__add__group" onClick={showAddgroupModal}>
              <UserPlus />
            </button>
          </div>
          <input
            value={query}
            className="contacts__input"
            type="text"
            placeholder="Search name of user, group, company"
            onInput={e => setQuery(e.target.value)}
          />
          <SearchIcon />
        </header>

        <button className="button__all">All ({contacts?.length})</button>
        {contacts.length > 0 ? (
          <div className="contacts__list">
            {contacts?.map((contact, idx) => (
              <div
                key={idx}
                className="contact__item"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="contact__profile">
                  {contact.image ? (
                    <Avatar
                      className="contact__avatar"
                      image={contact.image}
                      size={40}
                      alt="profile"
                    />
                  ) : (
                    <div className="default__avatar">
                      <BiUser />
                    </div>
                  )}
                  <div
                    className={
                      contact.online
                        ? 'contact__status--online'
                        : 'contact__status--offline'
                    }
                  />
                </div>
                <div className="contact__id">{contact.id} </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no__contactList">
            <div>No matching results</div>
            <p>Search with user's name, company</p>
          </div>
        )}
      </div>
      <ContactsDashboard
        user={selectedContact}
        setIsChannelShowed={setIsChannelShowed}
        isChannelShowed={isChannelShowed}
      />
    </div>
  );
};

export default Contacts;
