import { useState } from 'react';
import { fetchLogin } from './services';

function Login() {
    const [username, setUsername] = useState('');

    function login(username) {
        fetchLogin(username)
        .catch(err => {
            console.log(err.error);
        });
    }

    return (
        <div className="login">
            <form>
                <label>
                    <span>Username:</span>
                </label>
                <input value={username} onInput={ (e) => setUsername(e.target.value)}/>
                <button onClick={ () => login(username) } disabled={!username}>Login</button>
            </form>
        </div>
    );
}

export default Login;