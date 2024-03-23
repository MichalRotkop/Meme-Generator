'use strict'

function onOpenSaved() {
    renderSavedMemes()
    switchToSaved()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    const strHtmls = savedMemes.map((meme, idx) => {

        const { dataUrl, selectedImgId: id } = meme
        // const { selectedImgUrl: url, selectedImgId: id } = meme
        const { txt, color, outline, font, size } = meme.lines[0]

        return `<img src="${dataUrl}" onclick="onImgSelect(${id},'${txt}','${color}','${outline}','${font}',${size})">
        <button class="delete-saved-btn" data-idx="${idx}" onclick="onDeleteSaved(this)">Delete</button>`
    })

    const elSavedContainer = document.querySelector('.saved-container')

    elSavedContainer.innerHTML = strHtmls.join('')
}

function onDeleteSaved(elBtn) {
    const idx = elBtn.dataset.idx
    console.log('idx:',idx)
    deleteSavedMeme(idx)
    renderSavedMemes()
    // add message modal
}
