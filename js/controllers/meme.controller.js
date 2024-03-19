'use strict'

let gElCanvas
let gCtx


function onChooseImg() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    setEventListeners()
    switchPageToEditor()
    renderMeme()
    renderFonts()
}

function renderMeme() {
    const { selectedImgUrl, lines } = getMeme()

    drawMeme(selectedImgUrl, lines)

    setTimeout(() => markSelectedTxt(), 1)
}

function switchPageToEditor() {
    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.add('hidden')

    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.remove('hidden')
}

function setEventListeners() {
    gElCanvas.addEventListener('click', onMemeClick)
    window.addEventListener('keypress', onTypeKeyboard)
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

function onAddLine() {
    addLine()
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

    gCtx.strokeRect(x, y, width, height)
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
    // later maybe have separated func to set gCtx values
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

function onDownloadMeme(elLink) {
    elLink.download = 'my-img'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
