const users = {};

function getUserData(username) {
  return users[username];
};

function changeUserData(username, userData) {
  users[username] = userData;
};

module.exports = {
  getUserData,
  changeUserData,
};