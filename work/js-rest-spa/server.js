const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(users.getUserData(username));
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if (!username) {
        res.status(400).json({ error: 'requiredUsername' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'dogInsufficient' });
        return;
    }
    if (!username.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
        res.status(403).json({ error: 'authInsufficient' });
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if (!existingUserData) {
        users.changeUserData(username, 8);
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

app.post('/api/todo', (req, res) => {
    const { number } = req.body;
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if (number < 0) {
        res.status(400).json({ error: 'invalidValue' });
        return;
    }
    users.changeUserData(username, number);
    res.json({ number });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));