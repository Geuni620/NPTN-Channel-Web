import { BrowserRouter } from 'react-router-dom';
import ListContainer from './components/ListContainer/ListContainer';

import 'stream-chat-react/dist/css/index.css';
import Nav from './components/Nav/Nav';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <ListContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
