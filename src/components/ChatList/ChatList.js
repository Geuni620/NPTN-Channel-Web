import { useState } from 'react';

import { ChannelListContainer } from '../ChannelListContainer/ChannelListContainer';
import { ChannelContainer } from '../ChannelContainer/ChannelContainer';
import 'stream-chat-react/dist/css/index.css';

const filters = [
  { type: 'team', demo: 'team' },
  { type: 'messaging', demo: 'team' },
];

const options = { state: true, watch: true, presence: true, limit: 7 };
const sort = { last_message_at: -1, updated_at: -1 };

const ChatList = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <ChannelListContainer
        className="chat-list"
        {...{
          isCreating,
          filters,
          options,
          setCreateType,
          setIsCreating,
          setIsEditing,
          sort,
        }}
      />
      <ChannelContainer
        className="chat-dashboard"
        {...{
          createType,
          isCreating,
          isEditing,
          setIsCreating,
          setIsEditing,
        }}
      />
    </div>
  );
};

export default ChatList;
