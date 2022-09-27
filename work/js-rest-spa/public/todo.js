/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/


(function () {
  var MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    invalidValue: 'The number is 0, cannot decrease ',
    requiredUsername: 'Require username, please input',
    dogInsufficient: 'Invalid username, it cannot be "dog".',
    authInsufficient: 'No special characters!',
    "default": 'Something went wrong.  Please try again'
  };
  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  addAbilityToIncrease();
  addAbilityToDecrease();

  function setLoggedIn(isLoggedIn) {
    var contentEl = document.querySelector('.content');
    var loginHtml = "\n        <div class=\"login\">\n        <form action=\"#\">\n          <label>\n            <span>Username:</span>\n          </label>\n          <input class=\"login__username\">\n          <button class=\"login__button\" type=\"button\">Login</button>\n        </form>\n        </div>\n        ";
    var loggedinHtml = "\n        <div class=\"homePage\">\n        <button class=\"logout\">Logout</button>\n        <div class=\"inventory_form\">\n          <button class=\"decrease\">-</button>\n          <span></span>\n          <button class=\"increase\">+</button>\n        </div>\n        </div>\n        ";

    if (isLoggedIn) {
      contentEl.innerHTML = loggedinHtml;
    } else {
      contentEl.innerHTML = loginHtml;
    }

    renderStatus('');
  }

  function checkForSession() {
    fetchSession().then(function (num) {
      setLoggedIn(true);
      render(num);
    })["catch"](function () {
      return setLoggedIn(false);
    });
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET'
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        username: username
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchLogout() {
    return fetch('/api/session', {
      methos: 'DELETE'
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchIncrease(number) {
    return fetch('/api/todo', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        number: number
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchDecrease(number) {
    return fetch('/api/todo', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        number: number
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function addAbilityToLogin() {
    var buttonEl = document.querySelector('main');
    buttonEl.addEventListener('click', function (e) {
      e.preventDefault();

      if (!e.target.classList.contains('login__button')) {
        return;
      }

      var usernameEl = document.querySelector('.login__username');
      var username = usernameEl.value;
      fetchLogin(username).then(function (num) {
        setLoggedIn(true);
        render(num);
      })["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function addAbilityToLogout() {
    var buttonEl = document.querySelector('main');
    buttonEl.addEventListener('click', function (e) {
      e.preventDefault();

      if (!e.target.classList.contains('logout')) {
        return;
      }

      fetchLogout().then(function () {
        return setLoggedIn(false);
      })["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function addAbilityToIncrease() {
    var buttonEl = document.querySelector('main');
    buttonEl.addEventListener('click', function (e) {
      e.preventDefault();

      if (!e.target.classList.contains('increase')) {
        return;
      }

      var decreaseButtonEl = document.querySelector('.decrease');
      var num = document.querySelector('.inventory_form span').innerText;
      var addNum = Number(num) + 1;
      decreaseButtonEl.removeAttribute('disabled');
      fetchIncrease(addNum).then(function () {
        render(addNum);
        renderStatus('');
      })["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function addAbilityToDecrease() {
    var buttonEl = document.querySelector('main');
    buttonEl.addEventListener('click', function (e) {
      e.preventDefault();

      if (!e.target.classList.contains('decrease')) {
        return;
      }

      var num = document.querySelector('.inventory_form span').innerText;
      var reduceNum = Number(num) - 1;

      if (reduceNum == 0) {
        e.target.setAttribute("disabled", "");
      }

      fetchDecrease(reduceNum).then(function () {
        render(reduceNum);
        renderStatus('');
      })["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function render(num) {
    var numberEl = document.querySelector('.inventory_form span');
    numberEl.innerText = num;
  }

  function renderStatus(message) {
    var statusEl = document.querySelector('.status');

    if (!message) {
      statusEl.innerText = '';
      return;
    }

    var key = message !== null && message !== void 0 && message.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES["default"];
  }
})();
/******/ })()
;
//# sourceMappingURL=todo.js.map