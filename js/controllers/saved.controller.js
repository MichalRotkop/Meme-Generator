'use strict'

function onOpenSaved() {
    renderSavedMemes()
    switchToSaved()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSavedContainer = document.querySelector('.saved-container')
    if (savedMemes.length === 0) {
        elSavedContainer.innerHTML = 'Your Saved Memes'
        return
    }

    const strHtmls = savedMemes.map((meme, idx) => {
        return `<article class="saved-img-container"><img src="${meme.dataUrl}" 
        data-idx="${idx}" onclick="onLoadFromSaved(this)">
        <button class="delete-saved-btn" data-idx="${idx}" onclick="onDeleteSaved(this)">
        X</button></article>`
    })

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

