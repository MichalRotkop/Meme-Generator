'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function makeLorem(wordCount = 4) {
    const words = ['the sky', 'above', 'love', 'was', 'color', 'of television', 'tuned', 'to', 'a', 'cats', 'a pengiun',
        'dead spider', 'in', 'all', 'this happened', 'more or less', 'you', 'I', 'take', 'the story', 'even though', 'do not',
        'bit by bit', 'from', 'people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'eat', 'very nice',
        'it', 'was', 'a different', 'story', 'man', 'should', 'think', 'a pleasure', 'to', 'burn', 'more', 'funny', 'laugh at']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
