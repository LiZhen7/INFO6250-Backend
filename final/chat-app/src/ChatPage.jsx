import { useState, useEffect } from 'react';
import { fetchLogout, fetchMessages, fetchSendMessage, fetchChangeTheme, fetchUserData } from './services';

function ChatPage({ setLoggedin }) {
    const [messageList, setMessageList] = useState('');
    const [sendMessage, setSendMessage] = useState('');
    const [userData, setUserData] = useState('');
    const [status, setStatus] = useState(true);

    function renderMessage() {
        fetchMessages()
            .then(msg => {
                setMessageList(msg);
            })
            .catch(err => {
                console.log(err.error);
            });
    }

    function renderUserData() {
        fetchUserData()
            .then(data => {
                setUserData(data);
            })
            .catch(err => {
                console.log(err.error);
            })
    }

    function sendMsg(e) {
        e.preventDefault();
        fetchSendMessage(sendMessage)
            .then( () => {
                renderMessage();
                setStatus(!status)
            })
            .catch(err => {
                console.log(err.error);
            })
    }

    function changeTheme() {
        fetchChangeTheme()
            .then( () => {
                renderUserData();
                setStatus(!status)
            })
            .catch(err => {
                console.log(err.error);
            })
    }

    function logout() {
        fetchLogout()
            .then( () =>
                setLoggedin(false)
            )
            .catch(err => {
                console.log(err.error);
            });
    }

    useEffect(
        () => {
            renderMessage();
            renderUserData();
        },
        [status]
    );

    return (
        <div className={`chatPage ${userData.theme}`}>
            <ul>
                {Object.values(messageList).map(message => {
                    return (
                        <li key={message.id}>
                            <p className='user'>{message.sender}:</p>
                            <h3 className='content'>{message.text}</h3>
                        </li>
                    );
                })}
            </ul>
            <form onSubmit={sendMsg}>
                <textarea value={sendMessage} onInput={(e) => setSendMessage(e.target.value)} />
                <button className='send' disabled={!sendMessage}>&#8680;</button>
            </form>
            <div className='controls'>
                <button className='theme' onClick={() => changeTheme()}>
                    Set {userData.theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
                <button className='logout' onClick={() => logout()}>Logout</button>
            </div>
        </div>
    );
}

export default ChatPage;