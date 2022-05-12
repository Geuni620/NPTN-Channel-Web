import React, { useState } from 'react';
import { ChannelList } from 'stream-chat-react';
import { useChatContext } from 'stream-chat-react';
import { TeamChannelList } from './TeamChannel/TeamChannelList';
import _debounce from 'lodash.debounce';
import PlusBox from '../../assets/PlusBox';
import { SearchIcon } from '../../assets/SearchIcon';
import './ChannelListContainer.css';
import '../ChannelSearch/ChannelSearch.css';
// import { TeamChannelPreview } from './TeamChannel/TeamChannelPreview';

const customChannelMessagingFilter = channels => {
  return channels.filter(channel => channel.type === 'messaging');
};

export const ChannelListContainer = props => {
  const { options, setCreateType, setIsCreating, setIsEditing, sort } = props;

  const { client, setActiveChannel } = useChatContext();

  const [allChannels, setAllChannels] = useState([]);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);
  const [query, setQuery] = useState('');
  const [focusedId, setFocusedId] = useState('');

  const filtersOrigin = [
    { type: 'team', demo: 'team' },
    { type: 'messaging', demo: 'team' },
  ];

  const filters = { members: { $in: [query] } };

  const setChannel = channel => {
    setQuery('');
    setActiveChannel(channel);
  };

  const getChannels = async text => {
    try {
      const channelResponse = client.queryChannels(
        {
          type: 'team',
          name: { $autocomplete: text },
        },
        {},
        { limit: 5 }
      );

      const userResponse = client.queryUsers(
        {
          id: { $ne: client.userID },
          $and: [{ name: { $autocomplete: text } }],
        },
        { id: 1 },
        { limit: 5 }
      );

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      // if (channels.length) setTeamChannels(channels);
      if (users.length || channels.length) setDirectChannels(users);
      setAllChannels(channels.concat(users));
    } catch (e) {
      setQuery('');
    }

    // setLoading(false);
  };

  const getChannelsDebounce = _debounce(getChannels, 10, {
    trailing: true,
  });

  const onSearch = event => {
    event.preventDefault();

    // setFocused(undefined);
    setQuery(event.target.value);
    if (!event.target.value) return;
    getChannelsDebounce(event.target.value);
  };

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
          value={query}
        />
        <SearchIcon />
      </div>

      {query.length === 0 ? (
        <ChannelList
          // showChannelSearch
          channelRenderFilterFn={customChannelMessagingFilter}
          filters={filtersOrigin[1]}
          options={options}
          setActiveChannelOnMount={false}
          sort={sort}
          List={listProps => (
            <TeamChannelList {...listProps} type="messaging" />
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
        />
      )}
    </div>
  );
};
