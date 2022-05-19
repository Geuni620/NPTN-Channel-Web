import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { useChatContext } from 'stream-chat-react';
import { getUserId } from '../../utils';

import {
  Cube,
  Anchor,
  Arrow,
  People,
  Folder,
  Settings,
} from '../../assets/Icons';
import './Nav.css';

const Nav = () => {
  const { client } = useChatContext();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [idCheck, setIdCheck] = useState('');
  const [unreadMsg, setUnreadMsg] = useState(0);

  const handleIdRead = id => {
    setIdCheck(id);
  };
  const showPage = pageName => {
    if (pageName !== 'Chats' && pageName !== 'Contacts') return;

    if (pageName === 'Chats') dispatch({ type: 'chatList' });
    else if (pageName === 'Contacts') dispatch({ type: 'contacts' });
  };

  client.on(event => {
    if (event.total_unread_count !== undefined) {
      setUnreadMsg(event.total_unread_count);
    }
  });

  useEffect(() => {
    const getAvatar = async () => {
      const userInfo = await getDoc(doc(db, 'users', getUserId()));
      const { images } = userInfo.data();
      if (images) {
        setImages(prev => (prev = JSON.parse(images)));
      }
    };

    getAvatar();
  }, []);

  return (
    <div className="nav">
      <ul className="nav__items">
        {NAV_DATA.map(({ id, icon, name }) => {
          const nav4th = id === 4;
          const chatTab = id === 5;
          return (
            <li
              check={idCheck}
              key={id}
              onClick={() => {
                handleIdRead(id);
                showPage(name);
              }}
              className={id === idCheck ? 'nav__item--active' : 'nav__item'}
            >
              {icon}
              <span className={nav4th ? 'hidden' : 'nav__label'}>{name}</span>
              <span className={nav4th ? 'nav__divider' : 'nav__num hidden'} />
              <span className={chatTab ? 'nav__num' : 'nav__num hidden'}>
                {unreadMsg}
              </span>
            </li>
          );
        })}
      </ul>
      <div
        className="nav__avatar"
        onClick={() => {
          dispatch({ type: 'profile' });
        }}
      >
        <div className="nav__avatar--image">
          <img className="avatar__img" src={images[1]?.dataURL} alt="avatar" />
          <div className="nav__avatar--active" />
        </div>
        <div className="nav__avatar--name">{getUserId()}</div>
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
    icon: <Settings />,
    name: 'Settings',
    count: 20,
  },
];
