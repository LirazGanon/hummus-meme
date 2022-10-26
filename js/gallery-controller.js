'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imageNames = getImages()
    const strHTML = imageNames.map(img => `
    <img src="img/gallery/${img}" class="mems-img" alt="${img}" onerror="removeImg(this)" onclick="onImgClick(this)" />
    `).join(' ')
    document.querySelector('.main-gallery').innerHTML = strHTML
}

function removeImg(el) {
    el.style.display = 'none'
}

function onImgClick(elImg) {
    document.querySelector('main.main-gallery').classList.add('hide')
    drawImgFromRemote(elImg, renderMeme)
    document.querySelector('.main-editor-container').classList.remove('hide')
}