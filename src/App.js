import { useEffect, useState, useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import Nav from './components/Nav/Nav';
import ListContainer from './components/ListContainer/ListContainer';
import Login from './components/Login/Login';
import { getUserId, setGetstreamToken } from './utils';
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const App = () => {
  const api_key = 'sneuhatc2xf3';
  const userId = getUserId();

  const [accessToken, setAccessToken] = useState();
  const [isLogged, setIsLogged] = useState(false);

  const getToken = useCallback(async () => {
    const res = await fetch('/data/userTokens.json');
    const users = await res.json();
    const token = userId
      ? await users.filter(user => user.user_id === userId)[0].token
      : '';
    setAccessToken(token);
    setGetstreamToken(token);
  }, [userId]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  // const client = StreamChat.getInstance(api_key, {
  //   enableInsights: true,
  //   enableWSFallback: true,
  // });

  // client.connectUser({ id: userId, name: userId }, accessToken);

  return (
    <div className="App">
      {!isLogged && <Login setIsLogged={setIsLogged} />}
      <Nav />
      <ListContainer />
    </div>
  );
};

export default App;
