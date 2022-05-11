import React from 'react';
import './TeamChannelList.css';
import { SearchIcon } from '../../../assets/SearchIcon';

const ChannelList = props => {
  const {
    children,
    error = false,
    loading,
    setCreateType,
    setIsCreating,
    setIsEditing,
    type,
  } = props;

  if (error) {
    return type === 'team' ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === 'team' ? 'Channels' : 'Messages'} loading....
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      {/* <SearchIcon /> */}
      {children}
    </div>
  );
};

export const TeamChannelList = React.memo(ChannelList);
