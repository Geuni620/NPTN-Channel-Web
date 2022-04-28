import './App.css';
import Nav from './components/Nav/Nav';
import ListContainer from './components/ListContainer/ListContainer';
import DashBoard from './components/DashBoard/DashBoard';

function App() {
  return (
    <div className="App">
      <Nav />
      <ListContainer />
      <DashBoard />
    </div>
  );
}

export default App;
