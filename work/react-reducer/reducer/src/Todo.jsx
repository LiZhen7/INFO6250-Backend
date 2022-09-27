import { useState, useEffect, useContext } from 'react';
import { fetchAddTodo, fetchLogout, fetchTodos, fetchDeleteTodo, fetchUpdateTodo } from './services';
import todoContext from './todoContext';
import spinner from './logo.svg';

function Todo({ itemList }) {
    const [isLoading, setIsLoading] = useState(true);
    const [addItem, setAddItem] = useState('');
    const { onAddTodo, onDeleteTodo, onLogout, onToggleTodo, onUpdateTodo } = useContext(todoContext);

    function addTodo(todo) {
        fetchAddTodo(todo)
            .then(newTodo => {
                onAddTodo(newTodo);
                render()
            })
            .catch(err => {
                console.log(err.error);
            });
    }

    function deleteTodo(e) {
        e.preventDefault();
        fetchDeleteTodo(e.target.dataset.id)
            .then(
                onDeleteTodo(e.target.dataset.id),
                render()
            )
            .catch(err => {
                console.log(err.error);
            });
    }

    function toggleTodo(e) {
        e.preventDefault();
        const id = e.target.dataset.id;
        fetchUpdateTodo(id, { done: !itemList[id].done })
            .then(
                onToggleTodo(id),
                render()
            )
            .catch(err => {
                console.log(err.error);
            })
    }

    function render() {
        fetchTodos()
            .then(todos => {
                onUpdateTodo(todos);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err.error);
            })
    }

    function logout() {
        fetchLogout()
            .then(() => {
                onLogout();
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.error);
            })
    }

    useEffect(
        () => {
            setTimeout(render, 500);
        },
        []
    );

    return (
        <div className="todo">
            <div className='controls'>
                <button className='refresh' onClick={() => render()}>Refresh</button>
                <button className='logout' onClick={() => logout()}>Logout</button>
            </div>
            <ul>
                {isLoading && <img src={spinner} className='spinner' alt='spinner' role="status" />}
                {!isLoading && Object.values(itemList).map(item => {
                    return (
                        <li key={item.id}>
                            <input type='checkbox' data-id={item.id} checked={item.done} onChange={(e) => toggleTodo(e)} />
                            <span className={`itemName ${item.done ? 'done' : 'notdone'}`} data-id={item.id}>{item.task}</span>
                            <button className='delete' data-id={item.id} onClick={(e) => deleteTodo(e)}>X</button>
                        </li>
                    );
                })}
            </ul>
            <form>
                <input value={addItem} onInput={(e) => setAddItem(e.target.value)} />
                <button className='add' onClick={() => addTodo(addItem)} disabled={!addItem}>Add</button>
            </form>
        </div>
    );
}

export default Todo;