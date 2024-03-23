'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    const strLabel = `<label class="upload-label" for="upload-file">Upload Image</label>
    <input class="upload-btn" type="file" id="upload-file" name="img" 
    onchange="onUploadImg(event)">`

    const strHtmls = imgs.map(img => `<img src="${img.url}" onclick="onImgSelect(${img.id})">`)

    const elGalleryContainer = document.querySelector('.img-gallery-container')
    elGalleryContainer.innerHTML = strLabel + strHtmls.join('')
}

function onImgSelect(id, txt, color, outline, font, size) {
    setMeme(id, txt, color, outline, font, size)
    initEditor()
}

function onRandomizeMeme() {
    const imgs = getImgs()
    const randomImgIdx = getRandomInt(0, imgs.length)
    const id = imgs[randomImgIdx].id

    const { txt, color, outline, font } = setRandomLineProp()

    onImgSelect(id, txt, color, outline, font)

    if (Math.random() > 0.6) {
        const { txt, color, outline, font } = setRandomLineProp()
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

function onUploadImg(ev) {
    loadImageFromInput(ev, addImg)
    setTimeout(() => renderGallery(), 200)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}


