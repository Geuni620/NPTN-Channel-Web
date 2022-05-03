import React, { useState } from 'react';
import ProfileDashboard from './ProfileDashboard.js/ProfileDashboard';
import { BsDot } from 'react-icons/bs';
import './Profile.css';

const Profile = () => {
  const [clickedItem, setClickedItem] = useState(0);

  return (
    <div className="profile">
      <div className="profile__nav">
        <div className="profile__nav__items">
          {PROFILE_NAV_ITEMS.map(({ title, pages }, idx) => {
            return (
              <div
                key={idx}
                className={
                  clickedItem === idx
                    ? 'profile__nav__item--active'
                    : 'profile__nav__item'
                }
                onClick={() => {
                  setClickedItem(idx);
                }}
              >
                <div className="profile__nav__title">{title}</div>
                <div className="profile__nav__pages">
                  {pages.map((page, idx) => {
                    return (
                      <div key={idx} className="profile__nav__page">
                        <BsDot className="page__dot" />
                        {page}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ProfileDashboard />
    </div>
  );
};

export default Profile;

const PROFILE_NAV_ITEMS = [
  { title: 'My Profile', pages: ['My activities', 'My dashboard'] },
  { title: 'My Organization', pages: ['Members', 'Activities'] },
  { title: '', pages: [] },
  {
    title: 'Account settings',
    pages: ['Log out'],
  },
  { title: 'Billing Information', pages: [] },
];
