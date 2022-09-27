const uuid = require('uuid').v4;

const id1 = uuid();
const id2 = uuid();

const messages = {
    [id1]: {
        id: id1,
        sender: "Administrator",
        text: "Welcome everyone! This is a chat app, hope you will like it!",
    },
    [id2]: {
        id: id2,
        sender: "Josh",
        text: "Hello bro, my name is Josh. Nice to meet you!",
    },
};

// const messages = [
//     {
//         sender: "Administrator",
//         text: "Welcome everyone! This is a chat app, hope you will like it!",
//     },
//     {
//         sender: "Josh",
//         text: "Hello bro, my name is Josh. Nice to meet you!",
//     }
// ];

function addMessage(sender, text) {
    const id = uuid();
    messages[id] = {
      id,
      sender,
      text,
    };
}

const chat = {
    messages,
    addMessage,
};

module.exports = chat;