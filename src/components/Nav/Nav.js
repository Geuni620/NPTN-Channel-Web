import React, { useState } from 'react';
import Cube from '../../assets/Cube';
import Anchor from '../../assets/Anchor';
import Arrow from '../../assets/Arrow';
import People from '../../assets/People';
import Folder from '../../assets/Folder';
import Setting from '../../assets/Setting';
import './Nav.css';

const Nav = () => {
  const [idCheck, setIdCheck] = useState('');
  const handleIdRead = id => {
    setIdCheck(id);
  };

  return (
    <div className="nav">
      <ul className="nav__items">
        {NAV_DATA.map(({ id, icon, name, count }) => {
          const nav4th = id === 4;
          return (
            <li
              check={idCheck}
              key={id}
              onClick={() => {
                handleIdRead(id);
              }}
              className={id === idCheck ? 'nav__item--active' : 'nav__item'}
            >
              {icon}

              <span className={nav4th ? 'hidden' : 'nav__label'}>{name}</span>
              <span className={nav4th ? 'nav__divider' : 'nav__num'}>
                {nav4th ? '' : count}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="nav__avatar">
        <div className="nav__avatar--image">
          {/* 이미지 넣을 것 */}

          <div className="nav__avatar--active" />
        </div>
        <div className="nav__avatar--name">Steve Yoo</div>
        <div className="nav__avatar--name">Neptune Cloud</div>
      </div>
    </div>
  );
};

export default Nav;

const NAV_DATA = [
  {
    id: 1,
    icon: <Cube />,
    name: 'Marketplace',
    count: 20,
  },
  {
    id: 2,
    icon: <Anchor />,
    name: 'Operation',
    count: 20,
  },
  {
    id: 3,
    icon: <Arrow />,
    name: 'Dashboard',
    count: 20,
  },
  {
    id: 4,
    icon: '',
    name: ' ',
    count: 20,
  },
  {
    id: 5,
    icon: <Cube />,
    name: 'Chats',
    count: 20,
  },
  {
    id: 6,

    icon: <People />,
    name: 'Contacts',
    count: 20,
  },
  {
    id: 7,
    icon: <Folder />,
    name: 'Documents',
    count: 20,
  },
  {
    id: 8,
    icon: <Setting />,
    name: 'Settings',
    count: 20,
  },
];
