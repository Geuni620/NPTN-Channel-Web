import React, { useState } from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import { ChannelInner } from './Channel/ChannelInner';
import { CreateChannel } from './Channel/CreateChannel';
import { EditChannel } from './Channel/EditChannel';
import { TeamMessageInput } from './TeamMessage/TeamMessageInput';

import './ChannelContainer.css';

export const ChannelContainer = props => {
  const { createType, isCreating, isEditing, setIsCreating, setIsEditing } =
    props;

  const { channel } = useChatContext();

  const [pinsOpen, setPinsOpen] = useState(false);

  if (isCreating) {
    const filters = {};

    return (
      <div className="channel__container">
        <CreateChannel {...{ createType, filters, setIsCreating }} />
      </div>
    );
  }

  if (isEditing) {
    const filters = {};

    if (channel?.state?.members) {
      const channelMembers = Object.keys(channel.state.members);
      if (channelMembers.length) {
        filters.id = { $nin: channelMembers };
      }
    }

    return (
      <div className="channel__container">
        <EditChannel {...{ filters, setIsEditing }} />
      </div>
    );
  }

  return (
    <div className="channel__container">
      <Channel Input={TeamMessageInput}>
        <ChannelInner
          {...{
            pinsOpen,
            setIsEditing,
            setPinsOpen,
            channel,
          }}
        />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
