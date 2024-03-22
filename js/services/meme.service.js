'use strict'

var gImgs = _createImgs()
var gMeme

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const FONTS = ['Impact', 'Arial', 'Verdana', 'Courier New', 'Trebuchet MS', 'Lucida Sans', 'Times New Roman', 'Segoe UI', 'monospace', 'cursive']

const STORAGE_KEY = 'memeDB'
var gSavedMemes = []

function setCanvasSize(isSmall) {
    gMeme.isCanvasSmall = isSmall
    const { lines } = gMeme

    if (lines.length < 2) return
    lines[1].pos.y = 300
    console.log('lines[1].pos:',lines[1].pos)
}

function setImg(id, txt, color, outline, font) {
    const img = getImgById(id)
    gMeme = {
        selectedImgId: img.id,
        selectedImgUrl: img.url,
        selectedLineIdx: 0,
        isCanvasSmall: false,
        lines: []
    }
    _createLine(txt, color, outline, font)
}

function addLine(randomLine) {
    const { lines, selectedLineIdx } = gMeme
    if (!lines.length) {
        _createLine()
        gMeme.selectedLineIdx = 0
        return
    } else if (lines.length === 1) {
        var newLine = randomLine || structuredClone(lines[0])
        // newLine.pos.y = 400
        newLine.pos.y = gMeme.isCanvasSmall ? 300 : 450
    } else if (lines.length >= 2) {
        if (selectedLineIdx === -1) var newLine = structuredClone(lines[lines.length - 1])
        else var newLine = structuredClone(lines[selectedLineIdx])
        newLine.pos.y = 80 + (lines.length - 1) * 40
    }
    if (!randomLine) newLine.txt = 'Add Text Here'
    lines.push(newLine)
    gMeme.selectedLineIdx = lines.length - 1
}

function deleteLine() {
    const { lines, selectedLineIdx } = gMeme
    lines.splice(selectedLineIdx, 1)

    if (selectedLineIdx === 0 && lines.length >= 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx--
}

function setSelectedLineIdx(offsetX, offsetY) {
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
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt = val
}

function setFontType(val) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].font = val
}

function setFontSize(diff) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].size += diff
}

function setStrokeColor(val) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].outline = val
}

function setFillColor(val) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].color = val
}

function updateLineXPos(x) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].pos.x = x
}

function getSelectedTxt() {
    const { lines, selectedLineIdx } = gMeme
    return lines[selectedLineIdx].txt
}

function getStrokeColor() {
    const { selectedLineIdx, lines } = gMeme
    return lines[selectedLineIdx].outline
}

function getFillColor() {
    const { selectedLineIdx, lines } = gMeme
    return lines[selectedLineIdx].color
}

function getSelectedFont() {
    const { selectedLineIdx, lines } = gMeme
    return lines[selectedLineIdx].font
}

function getFonts() {
    return FONTS
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

function unMarkLine() {
    gMeme.selectedLineIdx = -1
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

function _createLine(txt, color, outline, font, randomLine = false) {
    const line = {
        pos: { x: 40, y: 80 },
        markPos: {},
        txt: txt || 'Add Text Here',
        size: 45,
        color: color || 'white',
        outline: outline || 'black',
        font: font || 'Impact',
        lineWidth: 1.5,
    }
    if (randomLine) return line
    gMeme.lines.push(line)
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

function addSavedMeme() {
    console.log('gSavedMemes:', gSavedMemes)
    gSavedMemes.push(gMeme)
    console.log('gSavedMemes:', gSavedMemes)
}

function getSavedMemes() {
    return gSavedMemes
}

function _saveMemes() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

