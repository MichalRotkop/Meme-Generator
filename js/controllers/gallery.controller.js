'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    const strHtmls = imgs.map(img => `<img src="${img.url}" onclick="onImgSelect(${img.id})">`)

    const elGalleryContainer = document.querySelector('.img-gallery-container')
    elGalleryContainer.innerHTML = strHtmls.join('')
}

function onImgSelect(id, txt, color, outline, font) {
    setImg(id, txt, color, outline, font)
    onChooseImg()
}

function onRandomizeMeme() {
    const imgs = getImgs()
    const randomImgIdx = getRandomInt(0, imgs.length)
    const id = imgs[randomImgIdx].id

    const {txt, color, outline, font } = setRandomLineProp()
    
    onImgSelect(id, txt, color, outline, font)

    if (Math.random() > 0.6 ) {
        const {txt, color, outline, font } = setRandomLineProp()
        const newLine = _createLine(txt, color, outline, font, true)
        onAddLine(newLine)
    }
}

function setRandomLineProp() {
    const fonts = getFonts()
    const randomFontIdx = getRandomInt(0, fonts.length)

    return {
        txt: makeLorem(getRandomInt(2, 6)),
        color: getRandomColor(),
        outline: getRandomColor(),
        font: fonts[randomFontIdx]
    }
}