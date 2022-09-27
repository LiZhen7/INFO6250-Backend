import { useState, useEffect } from 'react';
import { fetchAddTodo, fetchLogout, fetchTodos, fetchDeleteTodo, fetchUpdateTodo } from './services';
import spinner from './logo.svg';

function Todo({ setLoggedin }) {
    const [addItem, setAddItem] = useState('');
    const [itemList, setItemList] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    function render() {
        fetchTodos()
        .then(itemList => {
            setIsLoading(false);
            setItemList(itemList);
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err.error);
        });
    }

    function logout() {
        fetchLogout()
        .then(
            setLoggedin(false)
        )
        .catch(err => {
            console.log(err.error);
        });
    }

    function addTodo(item) {
        fetchAddTodo(item)
        .then( () => {
            render()
        })
        .catch(err => {
            console.log(err.error);
        });
    }

    function updateTodo(e) {
        e.preventDefault();
        const id = e.target.dataset.id;
        fetchUpdateTodo(id, {done: !itemList[id].done})
        .then(
            render()
        )
        .catch(err => {
            console.log(err.error);
        });
    }

    function deleteTodo(e) {
        e.preventDefault();
        fetchDeleteTodo(e.target.dataset.id)
        .then(
            render()
        )
        .catch(err => {
            console.log(err.error);
        });
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
                            <input type='checkbox' data-id={item.id} checked={item.done} onChange={(e) => updateTodo(e)}/>
                            <span className={`itemName ${item.done ? 'done' : 'notdone'}`} data-id={item.id}>{item.task}</span>
                            <button className='delete' data-id={item.id} onClick={(e) => deleteTodo(e)}>X</button>
                        </li>
                    );
                })}
            </ul>
            <form>
                <input value={addItem} onInput={(e) => setAddItem(e.target.value)} />
                <button className='add' onClick={() => addTodo(addItem)}>Add</button>
            </form>
        </div>
    );
}

export default Todo;