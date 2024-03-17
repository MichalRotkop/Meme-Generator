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
    const { selectedImgUrl: imgUrl, selectedLineIdx: idx, lines } = getMeme()
    // const { txt, lineWidth, color, outline, font, size } = lines[idx]
    // drawMeme(imgUrl, txt, lineWidth, color, outline, font, size)

    drawMeme(imgUrl, lines[idx])

}

function switchPageToEditor() {
    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.add('hidden')

    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.remove('hidden')
}

function onSetLineTxt(val) {
    setLineTxt(val)
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

function drawMeme(imgUrl, { txt, lineWidth, color, outline, font, size }) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        coverCanvasWithImg(img)
        drawText(txt, 100, 100, lineWidth, color, outline, font, size)
    }
}

function drawText(text, x, y, lineWidth, color, outline, font, size) {
    // later maybe have separated func to set gCtx values
    gCtx.lineWidth = lineWidth
    gCtx.strokeStyle = outline

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onDownloadMeme(elLink) {
    elLink.download = 'my-img'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

// function drawImg(imgUrl) {
//     const img = new Image()
//     img.src = imgUrl
//     img.onload = () =>
//         coverCanvasWithImg(img)
// }

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
