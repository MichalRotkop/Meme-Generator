'use strict'

function onOpenSaved() {
    renderSavedMemes()
    switchToSaved()
}
function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    const strHtmls = savedMemes.map((meme, idx) => {
        return `<article class="saved-img-container"><img src="${meme.selectedImgUrl}" 
        data-idx="${idx}" onclick="onLoadFromSaved(this)">
        <button class="delete-saved-btn" data-idx="${idx}" onclick="onDeleteSaved(this)">
        X</button></article>`
    })

    const elSavedContainer = document.querySelector('.saved-container')
    elSavedContainer.innerHTML = strHtmls.join('')
}

function onDeleteSaved(elBtn) {
    const idx = elBtn.dataset.idx
    console.log('idx:', idx)
    deleteSavedMeme(idx)
    renderSavedMemes()
    // add message modal
}

function onLoadFromSaved(elImg) {
    var memes = loadFromStorage(MEMES_KEY)
    const idx = elImg.dataset.idx
    const loadedMeme = memes[idx]

    loadMeme(loadedMeme)
    initEditor()
}

