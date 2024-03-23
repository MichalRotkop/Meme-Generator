'use strict'

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
    const elGallery = document.querySelector('.gallery-page')
    elGallery.classList.remove('hidden')

    const elBtn = document.querySelector('.gallery-btn')
    elBtn.classList.add('active')
    
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
