import React, { useEffect, useState } from 'react';

import { useChatContext } from 'stream-chat-react';

import _debounce from 'lodash.debounce';

import './Contacts.css';
import ContactsDashboard from './ContactsDashboard/ContactsDashboard';
import { UserPlus, SearchIcon, Silders } from '../../assets/Icons';
import { BiUser } from 'react-icons/bi';
import AddGroupModal from './AddGroupModal/AddGroupModal';

const Contacts = () => {
  const { client } = useChatContext();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [query, setQuery] = useState('');
  const [isAddGroupModalShowed, setIsAddGroupModalShowed] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      const response =
        query === ''
          ? await client.queryUsers({
              id: { $ne: client.userID },
            })
          : await client.queryUsers({ id: { $autocomplete: query } });

      setContacts(response.users);
    };

    const getContactsDebounce = _debounce(getContacts, 2000, {
      trailing: true,
    });

    getContactsDebounce();
  }, [client, query]);

  const showAddgroupModal = () => {
    setIsAddGroupModalShowed(true);
  };

  return (
    <div className="contacts">
      {isAddGroupModalShowed && (
        <AddGroupModal
          setIsAddGroupModalShowed={setIsAddGroupModalShowed}
          client={client}
        />
      )}
      <div className="contactList">
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
                    <img
                      className="contact__avatar"
                      src={contact.image}
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
      <ContactsDashboard user={selectedContact} />
    </div>
  );
};

export default Contacts;
