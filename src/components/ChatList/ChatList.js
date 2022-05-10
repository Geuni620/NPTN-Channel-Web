import { useState } from 'react';
import { StreamChat } from 'stream-chat';

import { Chat, enTranslations, Streami18n } from 'stream-chat-react';

import { ChannelListContainer } from '../ChannelListContainer/ChannelListContainer';
import { ChannelContainer } from '../ChannelContainer/ChannelContainer';
import 'stream-chat-react/dist/css/index.css';

import { getUserId, getGetstreamToken } from '../../utils';

// const userToken = getGetstreamToken();
// const user = getUserId();
// const apiKey = '4qaxnhjezwsf';
const userToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2V1bmk2MjAifQ.mkwnEhGoPyjEsnkhcSt6SpdnL37-1nYh9MFKo6K9wF4`;
const apiKey = '3hr22a3t59ef';
const user = 'geuni620';

const theme = 'light';

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations,
  },
});

const filters = [
  { type: 'team', demo: 'team' },
  { type: 'messaging', demo: 'team' },
];

const options = { state: true, watch: true, presence: true, limit: 10 };
const sort = { last_message_at: -1, updated_at: -1 };

const client = StreamChat.getInstance(apiKey, {
  enableInsights: true,
  enableWSFallback: true,
});
client.connectUser({ id: user, name: user }, userToken);

const ChatList = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <Chat {...{ client, i18nInstance }} theme={`team ${theme}`}>
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
      </Chat>
    </div>
  );
};

export default ChatList;
