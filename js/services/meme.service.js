'use strict'

var gImgs = [{ id: 1, url: 'img/square/1.jpg', keywords: ['funny', 'lame'] }]

var gMeme = {
    selectedImgId: 1,
    selectedImgUrl: 'img/square/1.jpg',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 45,
            color: 'white',
            outline: 'orange',
            font: 'Arial',
            lineWidth: 2
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setLineTxt(val) {
    const {lines, selectedLineIdx:idx} = gMeme
    lines[idx].txt = val
}

function getMeme() {
    return gMeme
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}