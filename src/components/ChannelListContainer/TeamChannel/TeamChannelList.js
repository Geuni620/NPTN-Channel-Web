import React from 'react';
import './TeamChannelList.css';

const ChannelList = props => {
  const { children } = props;

  return <div className="team-channel-list">{children}</div>;
};

export const TeamChannelList = React.memo(ChannelList);
