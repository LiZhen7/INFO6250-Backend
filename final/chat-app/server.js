const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const sessions = require('./sessions');
const users = require('./users');
const chat = require('./chat');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if (!username) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'No username "dog"' });
        return;
    }
    if (!username.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
        res.status(403).json({ error: 'Invalid input' });
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if (!existingUserData) {
        users.addUser(username);
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username));
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

app.get('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(chat.messages);
});

app.post('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { message } = req.body;
    if (!message) {
        res.status(400).json({ error: 'required-task' });
        return;
    }
    chat.addMessage(username, message);
    res.json(chat.messages);
});

app.get('/api/user', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(users.getUserData(username));
});

app.patch('/api/user', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    users.changeTheme(username);
    res.json({ username });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));