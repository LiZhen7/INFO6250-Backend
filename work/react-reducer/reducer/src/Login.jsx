import { useState, useContext } from 'react';
import { fetchLogin } from './services';
import todoContext from './todoContext';

function Login() {
    const [loginUsername, setLoginUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { onLogin, onUpdateTodo } = useContext(todoContext);

    function login(username) {
        fetchLogin(username)
            .then(todos => {
                onUpdateTodo(todos)
                onLogin(username)
            })
            .catch(err => {
                setErrorMessage('Invalid Username');
            });
    }

    return (
        <div className="login">
            <form>
                <label>
                    <span>Username:</span>
                </label>
                <input value={loginUsername} onInput={(e) => setLoginUsername(e.target.value)} />
                <button onClick={() => login(loginUsername)} disabled={!loginUsername}>Login</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;