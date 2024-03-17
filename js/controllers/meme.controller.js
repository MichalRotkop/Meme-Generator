'use strict'

let gElCanvas
let gCtx

function onChooseImg() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    switchPageToEditor()

    renderMeme()
}

function renderMeme() {
    // const imgUrl = getImgById(meme.selectedImgId).url
    // const meme = getMeme()
    const { selectedImgUrl, lines } = getMeme()
    // const { txt, lineWidth, color, outline, font, size } = lines[idx]
    // drawMeme(imgUrl, txt, lineWidth, color, outline, font, size)

    // drawMeme(imgUrl, lines, lines[currIdx].pos)
    drawMeme(selectedImgUrl, lines)

}

function switchPageToEditor() {
    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.add('hidden')

    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.remove('hidden')
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSetLineTxt(val) {
    setLineTxt(val)
    renderMeme()
}

function onSetFontSize(elBtn) {
    const diff = +elBtn.dataset.size
    setFontSize(diff)
    renderMeme()
}

function onSetStrokeColor(val) {
    const elFont = document.querySelector('.fa-palette')
    elFont.style.color = val
    setStrokeColor(val)
    renderMeme()
}

function onSetFillColor(val) {
    const elFont = document.querySelector('.fa-fill-drip')
    elFont.style.color = val
    setFillColor(val)
    renderMeme()
}

function drawMeme(imgUrl, lines) {
    console.log('lines:', lines)
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        coverCanvasWithImg(img)
        lines.forEach(line => drawText(line))
    }
}

function drawText({ txt, pos, lineWidth, color, outline, font, size }) {
    // later maybe have separated func to set gCtx values

    gCtx.lineWidth = lineWidth
    gCtx.strokeStyle = outline

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`

    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
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
