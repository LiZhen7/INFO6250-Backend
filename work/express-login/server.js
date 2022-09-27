const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};
const userinfo = {};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        if (!userinfo[username]) {
            userinfo[username] = '';
        }
        res.send(`
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="data-page">
            <p>Your stored word is: ${userinfo[username]}.</p>
            <form action="/storeddata" method="POST" class="word-form">
                <input type="hidden" name="username" id="username" value="${username}">
                Change your stored word: <input name="storedword">
                <button type="submit">Submit</button>
            </form>
            <form action="/logout" method="POST" class="logout-form">
                If you want log out, press the button.
                <button type="submit">Logout</button>
            </form>
            </div>
        </body>
        </html>
        `);
        return;
    }
    res.send(`
    <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="login-page">
            <form action = "/login" method = "POST" class="login-form">
                Username: <input name = "username">
                <button type = "submit">Login</button>
            </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const regex = /^[0-9a-zA-Z]*$/;
    if (username === 'dog' || !username || !username.match(regex)) {
        res.status(401).send(`
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="error-page">
            <p>Invalid Username! The username shouldn't be empty or "dog" or not made up of letters or numbers only!</p>
            <a href = "http://localhost:3000/">Click this link to login again.</a>
            </div>
        </body>
        </html>
        `);
        return;
    }
    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.cookie('sid', maxAge = 0);
    res.redirect('/');
});

app.post('/storeddata', (req, res) => {
    const storedword = req.body.storedword;
    const username = req.body.username;
    userinfo[username] = storedword;
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));