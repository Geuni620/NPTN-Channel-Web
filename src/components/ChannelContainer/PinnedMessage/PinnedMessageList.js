import React from 'react';
import {
  Message,
  MessageTeam,
  useChannelStateContext,
} from 'stream-chat-react';

import './PinnedMessageList.css';

export const PinnedMessageList = props => {
  const { selectedChannel } = props;
  const { channel } = useChannelStateContext();

  const pickedChannel = selectedChannel || channel;

  return (
    <div className="pinned-messages__container">
      <div className="pinned-messages__header">
        <p className="pinned-messages__header-text">Pins</p>
      </div>
      <div className="pinned-messages__list">
        {pickedChannel.state.pinnedMessages.map((message, i) => {
          <Message
            groupStyles={[`single`]}
            Message={MessageTeam}
            key={message.id}
            message={message}
          />;
        })}
      </div>
    </div>
  );
};
