import { useEffect, useReducer } from 'react';
import { fetchSession, fetchTodos } from './services';
import { reducer, initialState } from './reducer';
import Login from './Login';
import Todo from './Todo';
import todoContext from './todoContext';
import './app.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(username) {
    dispatch({
      type: 'login',
      username,
    });
  }

  function onLogout() {
    dispatch({
      type: 'logout'
    });
  }

  function onAddTodo(todos) {
    dispatch({
      type: 'addTodo',
      todos,
    });
  }

  function onDeleteTodo() {
    dispatch({
      type: 'deleteTodo',
    });
  }

  function onToggleTodo(id) {
    dispatch({
      type: 'toggleTodo',
      id,
    });
  }

  function onUpdateTodo(todos) {
    dispatch({
      type: 'updateTodo',
      todos,
    });
  }

  useEffect(
    () => {
      fetchSession()
      .then(username => {
        dispatch({
          type: 'login',
          username,
        })
        fetchTodos()
        .then(itemList => {
          dispatch({
            type: 'updateTodo',
            todos: itemList
          })
        })
      })
      .catch(err => {
        console.log(err.error);
      });
    },
    []
  );

  return (
    <div className="app">
      <todoContext.Provider value={{onAddTodo, onDeleteTodo, onLogout, onToggleTodo, onUpdateTodo}}>
        {state.isLoggedIn && <Todo itemList = {state.todos}/>}
      </todoContext.Provider>
      <todoContext.Provider value={{onLogin, onUpdateTodo}}>
        {!state.isLoggedIn && <Login/>}
      </todoContext.Provider>
    </div>
  );
}

export default App;