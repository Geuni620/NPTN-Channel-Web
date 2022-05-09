import React from 'react';
import { ChannelList } from 'stream-chat-react';

import './ChannelListContainer.css';
import { ChannelSearch } from '../ChannelSearch/ChannelSearch';

import { TeamChannelList } from './TeamChannel/TeamChannelList';
import { TeamChannelPreview } from './TeamChannel/TeamChannelPreview';

import PlusBox from '../../assets/PlusBox';

const customChannelTeamFilter = channels => {
  return channels.filter(channel => channel.type === 'team');
};

const customChannelMessagingFilter = channels => {
  return channels.filter(channel => channel.type === 'messaging');
};

export const ChannelListContainer = props => {
  const { filters, options, setCreateType, setIsCreating, setIsEditing, sort } =
    props;

  return (
    <div className="container">
      <header className="container__header">
        <span className="container__title">Chats</span>
        <PlusBox {...{ setCreateType, setIsCreating, setIsEditing }} />
      </header>
      <ChannelSearch />
      {/* <ChannelList
        channelRenderFilterFn={customChannelTeamFilter}
        filters={filters[0]}
        options={options}
        sort={sort}
        List={listProps => (
          <TeamChannelList
            {...listProps}
            {...{ setCreateType, setIsCreating, setIsEditing }}
            type="team"
          />
        )}
        Preview={previewProps => (
          <TeamChannelPreview
            {...previewProps}
            {...{ setIsCreating, setIsEditing }}
            type="team"
          />
        )}
      /> */}
      <ChannelList
        channelRenderFilterFn={customChannelMessagingFilter}
        filters={filters[1]}
        options={options}
        setActiveChannelOnMount={false}
        sort={sort}
        List={listProps => (
          <TeamChannelList
            {...listProps}
            {...{ setCreateType, setIsCreating, setIsEditing }}
            type="messaging"
          />
        )}
        Preview={previewProps => (
          <TeamChannelPreview
            {...previewProps}
            {...{ setIsCreating, setIsEditing }}
            type="messaging"
          />
        )}
      />
    </div>
  );
};
