'use strict'

function toggleMenu() {
    document.querySelector('body').classList.toggle('menu-open')
}

function switchToEditor() {
    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.add('hidden')
    
    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.remove('hidden')
}

function switchToGallery() {
    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.remove('hidden')
    
    const elEditor = document.querySelector('.editor-page')
    elEditor.classList.add('hidden')
}

// function switchPages(elBtn) {
//     const elEditor = document.querySelector('.editor-page')
//     if (elBtn && elEditor.classList.contains('hidden')) return
    
//     const elGallery = document.querySelector('.gallery-page')
//     elGallery.classList.toggle('hidden')

//     elEditor.classList.toggle('hidden')
// }