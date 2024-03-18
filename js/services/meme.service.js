'use strict'

var gImgs = _createImgs()
var gMeme

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setImg(id) {
    const img = getImgById(id)
    gMeme = {
        selectedImgId: img.id,
        selectedImgUrl: img.url,
        selectedLineIdx: 0,
        lines: []
    }
    _createFirstLine()
}

function addLine() {
    const { lines, selectedLineIdx } = gMeme
    if (!lines.length) {
        _createFirstLine()
        gMeme.selectedLineIdx = 0
        return
    } else if (lines.length === 1) {
        var newLine = structuredClone(lines[0])
        newLine.pos.y = 500
    } else if (lines.length >= 2) {
        if (selectedLineIdx === -1) var newLine = structuredClone(lines[lines.length - 1])
        else var newLine = structuredClone(lines[selectedLineIdx])
        newLine.pos.y = 100 + (lines.length - 1) * 40
    }
    newLine.txt = 'Add Text Here'
    lines.push(newLine)
    gMeme.selectedLineIdx = lines.length - 1
}

function setSelectedLineIdxOnClick(offsetX, offsetY) {
    const lineIdx = gMeme.lines.findIndex(line => {
        var { x, y, width, height } = line.markPos
        return (offsetX >= x && offsetX <= (width + x) &&
            offsetY >= y && offsetY <= (height + y))
    })
    gMeme.selectedLineIdx = lineIdx
}

function saveTxtMarkPos(x, y, width, height, idx) {
    gMeme.lines[idx].markPos = { x, y, width, height }
}

function switchLine() {
    const { lines, selectedLineIdx } = gMeme
    if (selectedLineIdx === lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function setLineTxt(val) {
    const { lines, selectedLineIdx: idx } = gMeme
    lines[idx].txt = val
}

function setFontSize(diff) {
    const { lines, selectedLineIdx: idx } = gMeme
    lines[idx].size += diff
}

function setStrokeColor(val) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].outline = val
}

function setFillColor(val) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].color = val
}

function getSelectedTxt() {
    const { lines, selectedLineIdx } = gMeme
    return lines[selectedLineIdx].txt
}

// function getSelectedLineFontSize() {
//     const { lines, selectedLineIdx } = gMeme
//     return lines[selectedLineIdx].size
// }

// function getSelectedLinePos() {
//     const { lines, selectedLineIdx } = gMeme
//     return lines[selectedLineIdx].pos
// }

function getMarkPos() {
    const { lines, selectedLineIdx } = gMeme
    return (selectedLineIdx === -1) ? null : lines[selectedLineIdx].markPos
}

function resetSelectedLine() {
    // for when done with line - reset color? 
}

function getMeme() {
    return gMeme
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function getImgs() {
    return gImgs
}

function _createFirstLine() {
    const firstLine = {
        pos: { x: 100, y: 100 },
        markPos: {},
        txt: 'Add Text Here',
        size: 45,
        color: 'white',
        outline: 'black',
        font: 'Arial',
        lineWidth: 1,
    }
    gMeme.lines.push(firstLine)
}

function _createImgs() {
    return [
        { id: 1, url: 'img/1.jpg', keywords: ['funny', 'mock', 'success'] },
        { id: 2, url: 'img/2.jpg', keywords: ['happy', 'dogs', 'animal'] },
        { id: 3, url: 'img/3.jpg', keywords: ['sleep', 'baby', 'dogs', 'animal'] },
        { id: 4, url: 'img/4.jpg', keywords: ['animal', 'sleep'] },
        { id: 5, url: 'img/5.jpg', keywords: ['funny', 'success', 'baby'] },
        { id: 6, url: 'img/6.jpg', keywords: ['funny', 'mock'] },
        { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'happy', 'surprised'] },
        { id: 8, url: 'img/8.jpg', keywords: ['funny', 'mock'] },
        { id: 9, url: 'img/9.jpg', keywords: ['funny', 'mock', 'baby'] },
        { id: 10, url: 'img/10.jpg', keywords: ['funny', 'mock', 'success'] },
        { id: 11, url: 'img/11.jpg', keywords: ['funny'] },
        { id: 12, url: 'img/12.jpg', keywords: ['mock', 'success', 'surprised'] },
        { id: 13, url: 'img/13.jpg', keywords: ['success', 'happy'] },
        { id: 14, url: 'img/14.jpg', keywords: ['mock', 'surprised'] },
        { id: 15, url: 'img/15.jpg', keywords: ['mock', 'surprised'] },
        { id: 16, url: 'img/16.jpg', keywords: ['funny', 'surprised', 'happy', 'success'] },
        { id: 17, url: 'img/17.jpg', keywords: ['mock', 'success'] },
        { id: 18, url: 'img/18.jpg', keywords: ['funny', 'mock'] },
    ]
}