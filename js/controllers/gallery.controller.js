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

function onImgSelect(id) {
    setImg(id)
    onChooseImg()
}