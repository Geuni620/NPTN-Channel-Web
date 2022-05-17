import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { UserList } from './UserList';

import { SelectedUserList } from './SelectedUserList';
import './CreateChannel.css';

export const CreateChannel = props => {
  const { createType, filters, setIsCreating } = props;

  const { client, setActiveChannel } = useChatContext();

  const [channelName, setChannelName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [selectedListUsers, setSelectedListUsers] = useState([]);

  const [selectedUsersInfo, setSelectedUsersInfo] = useState([]);

  const createChannel = async event => {
    event.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
        demo: 'team',
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-channel__container">
      <UserList
        {...{
          filters,
          setSelectedUsers,
          selectedListUsers,
          setSelectedListUsers,
          setSelectedUsersInfo,
          selectedUsersInfo,
        }}
      />
      <SelectedUserList {...{ selectedUsersInfo }} />
      <div className="create-channel__wrapper">
        <div className="create-channel__wrapper--button">
          <p className="create-channel__wrapper--add" onClick={createChannel}>
            Add
          </p>
          <p
            className="create-channel__wrapper--cancel"
            onClick={prev => setIsCreating(!prev)}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
};
