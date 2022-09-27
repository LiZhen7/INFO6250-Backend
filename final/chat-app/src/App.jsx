import { useState, useEffect } from 'react';
import { fetchSession } from './services';
import './app.css';
import Login from './Login';
import ChatPage from './ChatPage';

function App() {
  const [loggedin, setLoggedin] = useState('');

  function checkSession() {
    fetchSession()
      .then(() => {
        setLoggedin(true)
      })
      .catch(err => {
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
      {loggedin && <ChatPage setLoggedin={setLoggedin} />}
      {!loggedin && <Login setLoggedin={setLoggedin} />}
    </div>
  );
}

export default App;