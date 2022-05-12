import React from 'react';
import './TeamChannelList.css';

const ChannelList = props => {
  const { children, error = false, type } = props;

  if (error) {
    return type === 'team' ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }
  return <div className="team-channel-list">{children}</div>;
};

export const TeamChannelList = React.memo(ChannelList);
