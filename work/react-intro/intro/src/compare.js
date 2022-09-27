"use strict";

const secretWord = 'RECAT';

function exactMatch(word) {
    return word.toUpperCase() === secretWord.toUpperCase();
}

function compareWord(word) {
    const letters0 = word.toUpperCase().split('');
    const letters1 = secretWord.toUpperCase().split('');
    let result = 0;

    for (let i = 0; i < letters0.length; i++) {
        for (let j = 0; j < letters1.length; j++) {
            if (letters0[i] === letters1[j]) {
                result = result + 1;
                letters1.splice(j, 1);
                break;
            }
        }
    }
    return result;
}

export function getResult(word) {
    const regex = /^[a-zA-Z]{5}$/;
    if (word === '') {
        return "empty";
    } else if (!word.match(regex)) {
        return "invalid";
    } else if (exactMatch(word)) {
        return "right";
    } else {
        return compareWord(word);
    }
}