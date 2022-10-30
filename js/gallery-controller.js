'use strict'

function onInit() {
    renderGallery()
}

function renderGallery(images = gImgs) {
    const strHTML = images.map(({ id, name }) => `
    <img src="img/gallery/${name}" class="mems-img" data-img-id="${id}" alt="${name}" onerror="removeImg(this)" onclick="onImgClick(this,${id})" />
    `).join(' ')
    document.querySelector('.main-gallery').innerHTML = strHTML
}

function removeImg(el) {
    el.style.display = 'none'
}

function onImgClick(elImg, imgId) {
    if (imgId === 0) document.querySelector('.file-input').click()
    else drawImgFromLocal(elImg, renderMeme, imgId)
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.main-editor-container').classList.remove('hide')
    document.querySelector('.current-page-link').classList.remove('current-page-link')
}


function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onSetFilterByTxt(txt) {
    setFilterByTxt(txt, renderGallery)
}