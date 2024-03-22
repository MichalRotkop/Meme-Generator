'use strict'

let gElCanvas
var gCanvasWidth
let gCtx

function onChooseImg() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    setEventListeners()
    renderMeme()
    renderFonts()
    renderEditorInputs()
    switchToEditor()
}

function renderMeme() {
    const { selectedImgUrl, lines } = getMeme()
    drawMeme(selectedImgUrl, lines)

    setTimeout(() => markSelectedTxt(), 10)
}

function setEventListeners() {
    gElCanvas.addEventListener('click', onMemeClick)
    window.addEventListener('keypress', onTypeKeyboard)
    window.addEventListener('resize', () => resizeCanvas())
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    renderMeme()
}

function onTypeKeyboard() {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) {
        return
    } else {
        const elInput = document.querySelector('.txt-input')
        elInput.focus()
        elInput.setSelectionRange(elInput.value.length, elInput.value.length)
    }
}

function onSwitchLine() {
    const { lines } = getMeme()
    if (lines.length === 0) return
    switchLine()
    renderEditorInputs()
    renderMeme()
}

function onAddLine(line = null) {
    addLine(line)
    renderEditorInputs()
    renderMeme()
}

function onDeleteLine() {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) return
    deleteLine()
    renderEditorInputs()
    renderMeme()
}

function renderFonts() {
    const fonts = getFonts()
    const strHtmls = fonts.map(font => `<option value="${font.toLowerCase()}">${font}</option>`)

    const elSelect = document.querySelector('.font-select')
    elSelect.innerHTML += strHtmls.join('')
}

function onSetFontType(val) {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) return

    setFontType(val)
    renderEditorInputs()
    renderMeme()
}

function renderEditorInputs() {
    const elInput = document.querySelector('.txt-input')
    const elStrokeClr = document.querySelector('.fa-palette')
    const elFillClr = document.querySelector('.fa-fill-drip')
    const elFont = document.querySelector('.font-select')

    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) {
        elInput.value = ''
        elStrokeClr.style.color = 'black'
        elFillClr.style.color = 'black'
        elFont.value = "select font"
        return
    }

    elInput.value = getSelectedTxt()
    elStrokeClr.style.color = getStrokeColor()
    elFillClr.style.color = getFillColor()
    elFont.value = getSelectedFont().toLowerCase()
}

function onMemeClick(ev) {
    const { offsetX, offsetY } = ev
    // console.log('offsetX, offsetY:', offsetX, offsetY)

    setSelectedLineIdx(offsetX, offsetY)

    renderEditorInputs()
    renderMeme()
}

function markSelectedTxt() {
    const markPos = getMarkPos()
    if (!markPos) return
    const { x, y, width, height } = markPos

    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    // gCtx.strokeStyle = gIsDownloaded ? 'transparent ':'black'
    gCtx.strokeRect(x, y, width, height)
}

function onAlignTxt(elBtn) {
    const { selectedLineIdx, lines } = getMeme()
    if (selectedLineIdx === -1) return

    const { txt } = lines[selectedLineIdx]
    const dir = elBtn.dataset.dir
    const txtWidth = gCtx.measureText(txt).width
    var newX

    switch (dir) {
        case 'left':
            newX = 20
            break;
        case 'center':
            newX = (gElCanvas.width / 2) - (txtWidth / 2)
            break;
        case 'right':
            newX = gElCanvas.width - 20 - txtWidth
            break;
    }
    updateLineXPos(newX)
    renderMeme()
}

function onSetLineTxt(val) {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) return
    setLineTxt(val)
    renderMeme()
}

function onSetFontSize(elBtn) {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) return
    const diff = +elBtn.dataset.size
    setFontSize(diff)
    renderMeme()
}

function onSetStrokeColor(val) {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) return
    setStrokeColor(val)
    renderEditorInputs()
    renderMeme()
}

function onSetFillColor(val) {
    const { selectedLineIdx } = getMeme()
    if (selectedLineIdx === -1) return
    setFillColor(val)
    renderEditorInputs()
    renderMeme()
}

function drawMeme(imgUrl, lines) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        coverCanvasWithImg(img)
        lines.forEach((line, idx) => drawText(line, idx))
    }
}

function drawText({ txt, pos, lineWidth, color, outline, font, size }, idx) {
    gCtx.lineWidth = lineWidth
    gCtx.strokeStyle = outline

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`

    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)

    setTxtMarkPos(txt, size, pos, idx)
}

function setTxtMarkPos(txt, size, pos, idx) {
    let txtMeasure = gCtx.measureText(txt)
    let txtHeight = size
    var { x, y } = pos

    x -= 10
    y -= txtHeight
    const width = txtMeasure.width + 20
    const height = txtHeight + 15

    saveTxtMarkPos(x, y, width, height, idx)
}

function onSaveMeme() {
    
}

function onDownloadMeme() {
    unMarkLine()
    renderMeme()

    setTimeout(() => {
        const { selectedImgId } = getMeme()
        const dataUrl = gElCanvas.toDataURL()
        // newLink to solve unsuccessful download with existing link
        const newLink = document.createElement('a')
        newLink.href = dataUrl
        newLink.download = `mymeme_${selectedImgId}`

        newLink.click()
    }, 100);
}

// function coverCanvasWithImg(elImg) {
//     gCanvasWidth = gElCanvas.width
//     gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvasWidth
//     gCtx.drawImage(elImg, 0, 0, gCanvasWidth, gElCanvas.height)
// }

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
