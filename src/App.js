import { useEffect, useState, useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import Nav from './components/Nav/Nav';
import ListContainer from './components/ListContainer/ListContainer';
import Login from './components/Login/Login';
import { getUserId, setGetstreamToken } from './utils';
import 'stream-chat-react/dist/css/index.css';
import './App.css';

import { Chat, enTranslations, Streami18n } from 'stream-chat-react';

// const userToken = getGetstreamToken();
// const user = getUserId();
// const apiKey = '4qaxnhjezwsf';

// const userToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2V1bmk2MjAifQ.mkwnEhGoPyjEsnkhcSt6SpdnL37-1nYh9MFKo6K9wF4`;
const apiKey = '3hr22a3t59ef';
// const user = 'geuni620';

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaHlvZGR1cnUifQ.kFj-vrP-WDohgVgt3531T0OsMfoDQZ9esqjivRATf1w';
const user = 'hyodduru';

const theme = 'light';

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations,
  },
});

const client = StreamChat.getInstance(apiKey, {
  enableInsights: true,
  enableWSFallback: true,
});
client.connectUser({ id: user, name: user }, userToken);

const App = () => {
  const userId = getUserId();
  const [isLogged, setIsLogged] = useState(false);

  const getToken = useCallback(async () => {
    const res = await fetch('/data/userTokens.json');
    const users = await res.json();
    const token = userId
      ? await users.filter(user => user.user_id === userId)[0].token
      : '';
    setGetstreamToken(token);
  }, [userId]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <div className="App">
      {getUserId() === null && !isLogged ? (
        <Login setIsLogged={setIsLogged} />
      ) : (
        <>
          <Nav />
          <Chat {...{ client, i18nInstance }} theme={`team ${theme}`}>
            <ListContainer />
          </Chat>
        </>
      )}
    </div>
  );
};

export default App;
