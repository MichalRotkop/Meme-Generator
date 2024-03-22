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
    const fonts = getFonts()
    const randomFontIdx = getRandomInt(0, fonts.length)
    
    const id = imgs[randomImgIdx].id
    const txt = makeLorem(getRandomInt(2, 6))
    const color = getRandomColor()
    const outline = getRandomColor()
    const font = fonts[randomFontIdx]

    onImgSelect(id, txt, color, outline, font)
}