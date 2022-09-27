import { useState, useEffect } from 'react';
import { fetchSession } from './services';
import './app.css';
import Login from './Login';
import Todo from './Todo';

function App() {
  const [loggedin, setLoggedin] = useState('');

  function checkSession() {
    fetchSession()
    .then(
      setLoggedin(true)
    )
    .catch( err => {
      setLoggedin(false);
    });
  }

  useEffect(
    () => {
      checkSession();
    },
    []
  );

  return (
    <div className="app">
      {loggedin && <Todo setLoggedin = {setLoggedin} />}
      {!loggedin && <Login/>}
    </div>
  );
}

export default App;