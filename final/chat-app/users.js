const users = {};

function getUserData(username) {
  return users[username];
};

function addUser(username) {
  users[username] = {
    name: username,
    theme: 'light',
    color: 'black',
  };
};

function changeTheme(username) {
  if (users[username].theme == 'light') {
    users[username].theme = 'dark';
  } else {
    users[username].theme = 'light';
  }
};

module.exports = {
  getUserData,
  changeTheme,
  addUser,
};