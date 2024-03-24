'use strict'

var gImgs = _createImgs()
var gMeme

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

const FONTS = ['Impact', 'Arial', 'Verdana', 'Courier New', 'Trebuchet MS', 'Lucida Sans', 'Times New Roman', 'Segoe UI', 'monospace', 'cursive']
const MEMES_KEY = 'memeDB'
const IMGS_KEY = 'imgDB'

function setMeme(id, txt, color, outline, font, size) {
    const img = getImgById(id)
    gMeme = {
        selectedImgId: img.id,
        selectedImgUrl: img.url,
        selectedLineIdx: 0,
        isCanvasSmall: false,
        dataUrl: '',
        lines: []
    }
    const line = _createLine(txt, color, outline, font, size)
    gMeme.lines.push(line)
}



function addLine(randomLine) {
    const { lines, selectedLineIdx } = gMeme
    if (!lines.length) {
        const line = _createLine()
        gMeme.lines.push(line)
        gMeme.selectedLineIdx = 0
        return
    } else if (lines.length === 1) {
        var newLine = randomLine || structuredClone(lines[0])
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

function setLineDrag(isDrag) {
    const { lines, selectedLineIdx } = gMeme
    if (selectedLineIdx === -1) return
    lines[selectedLineIdx].isDrag = isDrag
}

function getSelectedLineIsDrag() {
    const { selectedLineIdx, lines } = gMeme
    if (selectedLineIdx === -1) return null
    return lines[selectedLineIdx].isDrag
}

function moveLine(dx, dy) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].pos.x += dx
    lines[selectedLineIdx].pos.y += dy
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

function getMarkPos() {
    const { lines, selectedLineIdx } = gMeme
    return (selectedLineIdx === -1) ? null : lines[selectedLineIdx].markPos
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
    const imgs = loadFromStorage(IMGS_KEY)
    if (imgs) return imgs

    _saveImgs(gImgs)
    return gImgs
}

function setCanvasSize(isSmall) {
    gMeme.isCanvasSmall = isSmall
    const { lines } = gMeme

    if (lines.length < 2) return
    lines[1].pos.y = 300
}

function _createLine(txt, color, outline, font, size) {
    const line = {
        pos: { x: 40, y: 80 },
        markPos: {},
        isDrag: false,
        txt: txt || 'Add Text Here',
        size: size || 45,
        color: color || 'white',
        outline: outline || 'black',
        font: font || 'Impact',
        lineWidth: 1.5,
    }
    return line
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
        { id: 19, url: 'img/19.jpg', keywords: [] },
        { id: 20, url: 'img/20.jpg', keywords: [] },
        { id: 21, url: 'img/21.jpg', keywords: [] },
        { id: 22, url: 'img/22.jpg', keywords: [] },
        { id: 23, url: 'img/23.jpg', keywords: [] },
        { id: 24, url: 'img/24.jpg', keywords: [] },
        { id: 25, url: 'img/25.jpg', keywords: [] }
    ]
}

function _createImg(img) {
    return {
        id: makeId(3),
        url: img.src,
        keywords: []
    }
}

function addImg(img) {
    const newImg = _createImg(img)

    gImgs.unshift(newImg)
    _saveImgs(gImgs)
}

// Saved Memes
function deleteSavedMeme(idx) {
    const memes = getSavedMemes()
    memes.splice(idx, 1)
    _saveMemes(memes)
}

function updateDataUrl(dataUrl) {
    gMeme.dataUrl = dataUrl
}

function saveMeme() {
    const memes = getSavedMemes()
    memes.push(gMeme)
    _saveMemes(memes)
}

function loadMeme(meme) {
    gMeme = meme
    console.log('gMeme:', gMeme)
}

function getSavedMemes() {
    var memes = loadFromStorage(MEMES_KEY)

    if (!memes || !memes.length) memes = _createDemoSavedMemes()
    _saveMemes(memes)
    return memes
}

function _createDemoSavedMemes() {
    const savedMemes = [
        _createDemoSavedMeme(8, 'more or less a pleasure', '#3b8af1', '#3edde0', 'arial', 47),
        _createDemoSavedMeme(9, 'burn very nice', '#fdb768', '#18536d', 'impact', 47),
        _createDemoSavedMeme(4, 'do not do not', '#2016DF', '#0AB73E', 'impact')
    ]
    savedMemes[0].lines.push(_createLine('from cats', '#8df13b', '#e05e3e', 'Impact', 53))
    savedMemes[2].lines.push(_createLine('story it', '#CB35A6', '#365BBE', 'Verdana', 51))

    return savedMemes
}

function _createDemoSavedMeme(id, txt, color, outline, font, size) {
    const img = getImgById(id)
    const savedMeme = {
        selectedImgId: img.id,
        selectedImgUrl: img.url,
        selectedLineIdx: 0,
        isCanvasSmall: false,
        dataUrl: '',
        lines: []
    }
    const line = _createLine(txt, color, outline, font, size)
    savedMeme.lines.push(line)
    return savedMeme
}

function _saveMemes(memes) {
    saveToStorage(MEMES_KEY, memes)
}

function _saveImgs(imgs) {
    saveToStorage(IMGS_KEY, imgs)
}


