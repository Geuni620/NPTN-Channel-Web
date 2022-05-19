import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import './UserList.css';

import { CheckBoxIconActive, CheckBoxIconEmpty } from '../../../assets/Icons';

const ListContainer = props => {
  const { children } = props;
  return (
    <div className="user-list__container">
      <div className="user-list__items">{children}</div>
    </div>
  );
};

const UserItem = props => {
  const {
    index,
    setSelectedUsers,
    user,
    setSelectedListUsers,
    setSelectedUsersInfo,
    selectedUsersInfo,
  } = props;

  const [selected, setSelected] = useState(false);

  const getLastActive = i => {
    switch (i) {
      case 0:
        return '12 min ago';
      case 1:
        return '27 min ago';
      case 2:
        return '6 hours ago';
      case 3:
        return '14 hours ago';
      case 4:
        return 'Yesterday';
      default:
        return 'Yesterday';
    }
  };

  const handleUsersInfo = () => {
    selectedUsersInfo?.includes(user)
      ? setSelectedUsersInfo(
          prev => (prev = prev.filter(item => item.id !== user.id))
        )
      : setSelectedUsersInfo(prev => [...prev, user]);
  };

  const handleClick = e => {
    if (selected) {
      setSelectedUsers(prevUsers =>
        prevUsers.filter(prevUser => prevUser !== user.id)
      );

      setSelectedListUsers(prevUsers =>
        prevUsers.filter(prevUser => prevUser !== user.id)
      );
    } else {
      setSelectedUsers(prevUsers => [...prevUsers, user.id]);
      setSelectedListUsers(prevUsers => [...prevUsers, user.id]);
    }
    setSelected(!selected);

    handleUsersInfo();
  };

  return (
    <div className="user-item__wrapper" onClick={handleClick}>
      {selected ? <CheckBoxIconActive /> : <CheckBoxIconEmpty />}
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.name || user.id} size={40} />
        <div className="user-item__info">
          <p className="user-item__name">{user.name || user.id}</p>
          <p className="user-item__last-active">{getLastActive(index)}</p>
        </div>
      </div>
    </div>
  );
};

export const UserList = props => {
  const {
    filters,
    setSelectedUsers,
    selectedListUsers,
    setSelectedListUsers,
    setSelectedUsersInfo,
    selectedUsersInfo,
  } = props;

  const { client } = useChatContext();

  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID }, ...filters },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found.</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        users?.length &&
        users.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            setSelectedUsers={setSelectedUsers}
            selectedListUsers={selectedListUsers}
            user={user}
            {...{
              selectedListUsers,
              setSelectedListUsers,
              setSelectedUsersInfo,
              selectedUsersInfo,
            }}
          />
        ))
      )}
    </ListContainer>
  );
};
