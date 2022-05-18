import React, { useState } from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import { ChannelInner } from './Channel/ChannelInner';
import { CreateChannel } from './Channel/CreateChannel';
import { EditChannel } from './Channel/EditChannel';
import { TeamMessageInput } from './TeamMessage/TeamMessageInput';

import './ChannelContainer.css';

export const ChannelContainer = props => {
  const {
    createType,
    isCreating,
    isEditing,
    setIsCreating,
    setIsEditing,
    contactChannel,
  } = props;

  const { channel } = useChatContext();

  const selectedChannel = contactChannel || channel;

  // console.log(selectedChannel?.state.members, channel?.state.members);

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

    if (selectedChannel?.state?.members) {
      const channelMembers = Object.keys(selectedChannel.state.members);
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
            selectedChannel,
          }}
        />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
