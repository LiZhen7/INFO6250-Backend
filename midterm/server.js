const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const app = express();
const PORT = 3000;

const words = require('./words');
const guessingGame = require('./guessing-game');
const login = require('./login');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};
const gameinfo = {};
const gamescore = {};
const gamestatus = {};
let secretWord = "";

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!gameinfo[username]) {
            gameinfo[username] = {};
        }
        if(!gamestatus[username]) {
            gamestatus[username] = {};
        }
        if(!gamescore[username]) {
            gamescore[username] = 0;
        }
        res.send(guessingGame.homePage(words, username, gameinfo, gamescore, gamestatus));
        return;
    }
    res.send(login.loginPage());
});

app.post('/guess', (req, res) => {
    const guessInput = req.body.guessword.trim();
    const sid = req.cookies.sid;
    if(!sessions[sid]) {
        res.send(login.loginPage("invalidSessionId"));
        return;
    }
    
    const username = sessions[sid].username;
    if(!words.includes(guessInput) || gameinfo[username][guessInput]) {
        gamestatus[username]["InputStatus"] = "invalid";
    }else {
        if(guessingGame.exactMatch(guessInput, secretWord)) {
            gamestatus[username]["InputStatus"] = "correct";
        }else {
            gamestatus[username]["InputStatus"] = "valid";
        }
        const num = guessingGame.findMatchLetters(guessInput, secretWord);
        gameinfo[username][guessInput] = num;
        gamescore[username]++;
        gamestatus[username]["mostRecentGuess"] = guessInput;
        gamestatus[username]["lettersMatch"] = num;
    }

    res.redirect('/');
});

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    if(!sessions[sid]) {
        res.send(login.loginPage("invalidSessionId"));
        return;
    }

    secretWord = guessingGame.pickWord(words);
    console.log(`Username: ${username}, Secret Word: ${secretWord}`);
    gameinfo[username] = {};
    gamestatus[username]= {};
    gamescore[username] = 0;
    res.redirect('/');
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const regex = /^[a-zA-Z0-9_-]{4,16}$/;
    if(username === 'dog' || !username || !username.match(regex)) {
        res.status(401).send(login.loginPage("invalidUsername"));
        return;
    }

    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie('sid', sid);

    if(!gameinfo[username]) {
        secretWord = guessingGame.pickWord(words);
        console.log(`Username: ${username}, Secret Word: ${secretWord}`);
    }

    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.cookie('sid', maxAge = 0);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));