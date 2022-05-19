import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import './TeamChannelPreview.css';

export const TeamChannelPreview = props => {
  const { channel, setActiveChannel } = props;
  const { channel: activeChannel, client } = useChatContext();
  const [lastMessage, setLastMessage] = useState('');

  const putTheMessage = useCallback(async () => {
    setLastMessage(
      await channel.state.messages[channel.state.messages.length - 1]?.text
    );
  }, [channel.state.messages]);

  useEffect(() => {
    putTheMessage();
  }, [putTheMessage]);

  const deleteChannel = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await channel.delete();
    }
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    if (!members.length || members.length === 1) {
      return (
        <div className="channel-preview__item--single">
          <div className="channel-preview__item--AvatarSingle">
            <Avatar
              image={members[0]?.user.image || undefined}
              name={members[0]?.user.name || members[0]?.user.id || 'Hyojung'}
              size={32}
            />
          </div>
          <div className="channel-preview__item--textSingle">
            <p className="channel-preview__item--id">
              {members[0]?.user.name || members[0]?.user.id || 'Hyojeong'}
            </p>
            <p className="channel-preview__item--content">{lastMessage}</p>
          </div>
          <div
            className="channel-preview__item--delete"
            onClick={deleteChannel}
          >
            Delete
          </div>
        </div>
      );
    }

    return (
      <div className="channel-preview__item--multi">
        <div className="channel-preview__item--Avatar">
          <Avatar
            image={members[0]?.user.image || undefined}
            name={members[0]?.user.name || members[0]?.user.id}
            size={24}
          />
          <Avatar
            image={members[1]?.user.image || undefined}
            name={members[1]?.user.name || members[1]?.user.id}
            size={24}
          />
        </div>
        <div className="channel-preview__item--text">
          <p className="channel-preview__item--id">
            {members[0]?.user.name || members[0]?.user.id},{' '}
            {members[1]?.user.name || members[1]?.user.id}
            {members[2] ? '...' : null}
          </p>
          <p className="channel-preview__item--content">{lastMessage}</p>
        </div>
        <div className="channel-preview__item--delete" onClick={deleteChannel}>
          Delete
        </div>
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
        setActiveChannel(channel);
      }}
    >
      <DirectPreview />
    </div>
  );
};
