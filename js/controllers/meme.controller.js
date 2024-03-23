'use strict'

let gElCanvas
let gCtx

function initEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    console.log('getMeme():', getMeme())

    setEventListeners()
    renderMeme()
    renderFonts()
    renderEditorInputs()
    switchToEditor()
    resizeCanvas()
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
    if (window.innerWidth >= 650) return

    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    setCanvasSize(gElCanvas.width <= 450)

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
    console.log('offsetX, offsetY:', offsetX, offsetY)

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

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
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
        newLink.download = `my-meme_${selectedImgId}`

        newLink.click()
    }, 100);
}

function onSaveMeme() {
    unMarkLine()
    renderMeme()

    setTimeout(() => {
        const dataUrl = gElCanvas.toDataURL()
        updateDataUrl(dataUrl)
    }, 200);

    // add message modal
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}




