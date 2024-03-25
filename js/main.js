'use strict'

function onRandomizeMeme() {
    const imgs = getImgs()
    const randomImgIdx = getRandomInt(0, imgs.length)
    const id = imgs[randomImgIdx].id

    const { txt, color, outline, font, size } = setRandomLineProp()

    onImgSelect(id, txt, color, outline, font, size)

    if (Math.random() > 0.6) {
        const { txt, color, outline, font, size } = setRandomLineProp()
        const newLine = _createLine(txt, color, outline, font, size, true)
        onAddLine(newLine)
    }

    removeActive()
    const elBtn = document.querySelector('.rand-btn')
    elBtn.classList.add('active')
}

function setRandomLineProp() {
    const fonts = getFonts()
    const randomFontIdx = getRandomInt(0, fonts.length)

    return {
        txt: makeLorem(getRandomInt(2, 6)),
        color: getRandomColor(),
        outline: getRandomColor(),
        font: fonts[randomFontIdx],
        size: getRandomInt(43, 52)
    }
}

function toggleMenu() {
    document.querySelector('body').classList.toggle('menu-open')
}

function switchToEditor() {
    removeActive()

    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.add('hidden')

    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.remove('hidden')

    const elSaved = document.querySelector('.saved-page')
    elSaved.classList.add('hidden')
}

function switchToGallery() {
    removeActive()
    onInit()

    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.remove('hidden')

    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.add('hidden')

    const elSaved = document.querySelector('.saved-page')
    elSaved.classList.add('hidden')
}

function switchToSaved() {
    removeActive()

    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.add('hidden')

    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.add('hidden')

    const elSaved = document.querySelector('.saved-page')
    elSaved.classList.remove('hidden')

    const elBtn = document.querySelector('.saved-btn')
    elBtn.classList.add('active')
}

function removeActive() {
    const elNavBtns = document.querySelectorAll('.nav-btn')
    elNavBtns.forEach(elBtn => elBtn.classList.remove('active'))
}

function resetSearchInput() {
    const elInput = document.querySelector('.filter-input')
    elInput.value = ''
}
