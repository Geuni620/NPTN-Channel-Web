import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ChatList from './components/ChatList/ChatList';
import Contacts from './components/Contacts/Contacts';
import Profile from './components/Profile/Profile';
import './styles/common.css';
import './styles/reset.css';
import './styles/variables.css';

const reducer = (state = <ChatList />, action) => {
  switch (action.type) {
    case 'chatList':
      return <ChatList />;
    case 'contacts':
      return <Contacts />;
    case 'profile':
      return <Profile />;

    default:
      return state;
  }
};

const store = createStore(reducer, [<ChatList key="0" />]);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
