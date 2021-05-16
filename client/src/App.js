import {useState, useEffect} from 'react';
import './App.css';
import Main from './Main.js';
import Navigation from './Navigation.js';

import axios from './axios.js'

function App() {
  const [pokelist, setPokelist] = useState([]);
  useEffect( () => {
    async function fetchData() {
      const req = await axios.get('/pokemon/');
      setPokelist(req.data);
    }

    fetchData();
  }, [])

  return (
    <div className="App">
      <Navigation/>
      <Main 
        pokelist={pokelist}/>
    </div>
  );
}

export default App;
