"use strict";
(function () {
    const MESSAGES = {
        networkError: 'Trouble connecting to the network.  Please try again',
        invalidValue: 'The number is 0, cannot decrease ',
        requiredUsername: 'Require username, please input',
        dogInsufficient: 'Invalid username, it cannot be "dog".',
        authInsufficient: 'No special characters!',
        default: 'Something went wrong.  Please try again',
    };

    checkForSession();
    addAbilityToLogin();
    addAbilityToLogout();
    addAbilityToIncrease();
    addAbilityToDecrease();

    function setLoggedIn(isLoggedIn) {
        const contentEl = document.querySelector('.content');
        const loginHtml = `
        <div class="login">
        <form action="#">
          <label>
            <span>Username:</span>
          </label>
          <input class="login__username">
          <button class="login__button" type="button">Login</button>
        </form>
        </div>
        `;
        const loggedinHtml = `
        <div class="homePage">
        <button class="logout">Logout</button>
        <div class="inventory_form">
          <button class="decrease">-</button>
          <span></span>
          <button class="increase">+</button>
        </div>
        </div>
        `;
        if (isLoggedIn) {
            contentEl.innerHTML = loggedinHtml;
        } else {
            contentEl.innerHTML = loginHtml;
        }
        renderStatus('');
    }

    function checkForSession() {
        fetchSession()
            .then((num) => {
                setLoggedIn(true);
                render(num);
            })
            .catch(() => setLoggedIn(false));
    }

    function fetchSession() {
        return fetch('/api/session', {
            method: 'GET',
        })
            .catch(() => Promise.reject({ error: 'networkError' }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch(error => Promise.reject({ error }))
                    .then(err => Promise.reject(err));
            });
    }

    function fetchLogin(username) {
        return fetch('/api/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ username }),
        })
            .catch(() => Promise.reject({ error: 'networkError' }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch(error => Promise.reject({ error }))
                    .then(err => Promise.reject(err));
            });
    }

    function fetchLogout() {
        return fetch('/api/session', {
            methos: 'DELETE',
        })
            .catch(() => Promise.reject({ error: 'networkError' }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch(error => Promise.reject({ error }))
                    .then(err => Promise.reject(err));
            });
    }

    function fetchIncrease(number) {
        return fetch('/api/todo', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ number }),
        })
            .catch(() => Promise.reject({ error: 'networkError' }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch(error => Promise.reject({ error }))
                    .then(err => Promise.reject(err));
            });
    }

    function fetchDecrease(number) {
        return fetch('/api/todo', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ number }),
        })
            .catch(() => Promise.reject({ error: 'networkError' }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch(error => Promise.reject({ error }))
                    .then(err => Promise.reject(err));
            });
    }

    function addAbilityToLogin() {
        const buttonEl = document.querySelector('main');
        buttonEl.addEventListener('click', (e) => {
            e.preventDefault();
            if (!e.target.classList.contains('login__button')) {
                return;
            }
            const usernameEl = document.querySelector('.login__username');
            const username = usernameEl.value;
            fetchLogin(username)
                .then((num) => {
                    setLoggedIn(true);
                    render(num);
                })
                .catch(error => renderStatus(error));
        });
    }

    function addAbilityToLogout() {
        const buttonEl = document.querySelector('main');
        buttonEl.addEventListener('click', (e) => {
            e.preventDefault();
            if (!e.target.classList.contains('logout')) {
                return;
            }
            fetchLogout()
                .then(() => setLoggedIn(false))
                .catch(error => renderStatus(error));
        });
    }

    function addAbilityToIncrease() {
        const buttonEl = document.querySelector('main');
        buttonEl.addEventListener('click', (e) => {
            e.preventDefault();
            if (!e.target.classList.contains('increase')) {
                return;
            }
            const decreaseButtonEl = document.querySelector('.decrease');
            const num = document.querySelector('.inventory_form span').innerText;
            const addNum = Number(num) + 1;
            decreaseButtonEl.removeAttribute('disabled');
            fetchIncrease(addNum)
                .then(() => {
                    render(addNum);
                    renderStatus('');
                })
                .catch(error => renderStatus(error));
        });
    }

    function addAbilityToDecrease() {
        const buttonEl = document.querySelector('main');
        buttonEl.addEventListener('click', (e) => {
            e.preventDefault();
            if (!e.target.classList.contains('decrease')) {
                return;
            }
            const num = document.querySelector('.inventory_form span').innerText;
            const reduceNum = Number(num) - 1;
            if(reduceNum == 0) {
                e.target.setAttribute("disabled", "");
            }
            fetchDecrease(reduceNum)
                .then(() => {
                    render(reduceNum);
                    renderStatus('');
                })
                .catch(error => renderStatus(error));
        });
    }

    function render(num) {
        const numberEl = document.querySelector('.inventory_form span')
        numberEl.innerText = num;
    }

    function renderStatus(message) {
        const statusEl = document.querySelector('.status');
        if (!message) {
            statusEl.innerText = '';
            return;
        }
        const key = message?.error ? message.error : 'default';
        statusEl.innerText = MESSAGES[key] || MESSAGES.default;
    }
})();