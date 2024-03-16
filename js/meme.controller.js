'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()



}

function renderMeme() {
    // const imgUrl = getImgById(meme.selectedImgId).ur
    // const meme = getMeme()
    const { selectedImgUrl: imgUrl, selectedLineIdx: idx, lines } = getMeme()
    // drawMeme(meme.selectedImgUrl)
    // const txt = lines[idx].txt
    const {txt,size,color,outline,font, lineWidth} = lines[idx]
    drawMeme(imgUrl, txt)


    // drawText(meme.lines[meme.selectedLineIdx].txt, x, y)
    // drawText('Hi', 100, 100)



}

function getCanvasCords(ev) {
    console.log('ev.offsetX,ev.offsetY:', ev.offsetX, ev.offsetY)
    drawText('Hi', ev.offsetX, ev.offsetY)

    return { x: ev.offsetX, y: ev.offsetY }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '45px Arial'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawMeme(imgUrl, txt) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        coverCanvasWithImg(img)
        drawText(txt, 100, 100)
    }
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
