import './App.css';
import Navigate from './Navigate/Navigate';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigate></Navigate>
      </header>
      <div className='App-body'>
        <Home></Home>
      </div>
    </div>
  );
}

export default App;
