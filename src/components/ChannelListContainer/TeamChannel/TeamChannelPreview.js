import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import './TeamChannelPreview.css';

import { TeamTypingIndicator } from './TeamTypingIndicator';

export const TeamChannelPreview = props => {
  const { channel, setActiveChannel, setIsCreating, setIsEditing, type } =
    props;

  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id || 'random'}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const defaultName = 'Johnny Blaze';

    if (!members.length || members.length === 1) {
      return (
        <div className="channel-preview__item single">
          <Avatar
            image={members[0]?.user.image || undefined}
            name={members[0]?.user.name || members[0]?.user.id}
            size={24}
          />
          <p>{members[0]?.user.name || members[0]?.user.id || defaultName}</p>
          <TeamTypingIndicator type="list" />
        </div>
      );
    }

    return (
      <div className="channel-preview__item multi">
        <span>
          <Avatar
            image={members[0]?.user.image || undefined}
            name={members[0]?.user.name || members[0]?.user.id}
            size={18}
          />
        </span>
        <Avatar
          image={members[1]?.user.image || undefined}
          name={members[1]?.user.name || members[1]?.user.id}
          size={18}
        />
        <p>
          {members[0]?.user.name || members[0]?.user.id || defaultName},{' '}
          {members[1]?.user.name || members[1]?.user.id || defaultName}
        </p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
      }}
    >
      {/* {type === 'team' ? <ChannelPreview /> : <DirectPreview />} */}
      <DirectPreview />
    </div>
  );
};
