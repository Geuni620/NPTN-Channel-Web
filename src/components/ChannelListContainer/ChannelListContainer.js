import React, { useState, useMemo } from 'react';
import { ChannelList } from 'stream-chat-react';
import { TeamChannelList } from './TeamChannel/TeamChannelList';
import debounce from 'lodash.debounce';
import { PlusBox, SearchIcon } from '../../assets/Icons';
import { TeamChannelPreview } from '../ChannelListContainer/TeamChannel/TeamChannelPreview';
import './ChannelListContainer.css';
import '../ChannelSearch/ChannelSearch.css';

const customChannelMessagingFilter = channels => {
  return channels.filter(channel => channel.type === 'messaging');
};

export const ChannelListContainer = props => {
  const { options, setCreateType, setIsCreating, setIsEditing, sort } = props;
  const [query, setQuery] = useState('');

  const filtersOrigin = [{ type: 'messaging', demo: 'team' }];
  const filters = { members: { $in: [query] } };
  const onSearch = e => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        setQuery(query);
      }, 200),
    []
  );

  return (
    <div className="container">
      <header className="container__header">
        <span className="container__title">Chats</span>
        <PlusBox
          {...{ setCreateType, setIsCreating, setIsEditing }}
          type="messaging"
        />
      </header>

      <div className="channel-search__container">
        <input
          className="channel-search__input__text"
          onChange={onSearch}
          placeholder="Search people, company, message"
          type="text"
        />
        <SearchIcon />
      </div>

      {query.length === 0 ? (
        <ChannelList
          channelRenderFilterFn={customChannelMessagingFilter}
          filters={filtersOrigin[0]}
          options={options}
          setActiveChannelOnMount={false}
          sort={sort}
          List={listProps => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={previewProps => (
            <TeamChannelPreview
              {...previewProps}
              {...{ setIsCreating, setIsEditing }}
              type="messaging"
            />
          )}
        />
      ) : (
        <ChannelList
          channelRenderFilterFn={customChannelMessagingFilter}
          filters={filters}
          options={options}
          setActiveChannelOnMount={false}
          sort={sort}
          List={listProps => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={previewProps => (
            <TeamChannelPreview
              {...previewProps}
              {...{ setIsCreating, setIsEditing }}
              type="messaging"
            />
          )}
        />
      )}
    </div>
  );
};
