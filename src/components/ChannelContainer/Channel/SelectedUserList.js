import React from 'react';
import { Avatar } from 'stream-chat-react';
import './SelectedUserList.css';

export const SelectedUserList = props => {
  const { selectedUsersInfo } = props;
  return (
    <div className="user-list__items--selected">
      {selectedUsersInfo.map(user => {
        return (
          <div key={user.id} className="user-item__name-wrapper-selected">
            <Avatar image={user.image} name={user.name || user.id} size={40} />
            <div className="user-item__info-selected">
              <p className="user-item__name-selected">{user.name || user.id}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
