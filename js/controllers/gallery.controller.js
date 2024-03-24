'use strict'

var gFilterVal = ''

function onInit() {
    renderGallery()
    const elBtn = document.querySelector('.gallery-btn')
    elBtn.classList.add('active')
}

function renderGallery() {
    const imgs = getImgs(gFilterVal)
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

function onFilterMeme(val) {
    gFilterVal = val
    renderGallery()
    // filterMeme(val)

}

// function onFilterMeme(val) {
//     filterMeme(val)
// }


