const chatWeb = {
  chatPage: function (chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return `<ol class="messages">` +
    //Fill in!
      Object.values(chat.messages).map(message => `
      <li>
        <div class="message">
          <span class="messagetext">${message.text}</span>
        </div>
      </li>
    `).join('') +
      `</ol>`;
  },
  getUserList: function (chat) {
    return `<ul class="users">` +
      Object.values(chat.users).map(user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;
  },
  getOutgoing: function () {
    // Fill in!
    return `<form action="/chat" method="POST" class="chat-form">
      <input type="hidden" name="username" id="username" value="ZhenLi">
      <div class="chat-form-text">
        <input type="text" name="text" id="text" required>
      </div>
      <div class="chat-form-submit">
        <input type="submit" value="Submit">
      </div>
    </form>
    `;
  }
};
module.exports = chatWeb;
