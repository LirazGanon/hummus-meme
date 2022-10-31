'use strict'
let gIsAllKeywords = false
function onInit() {
    renderGallery()
    renderKeywords(gSelectedKeywords)
}

function renderGallery(images = gImgs) {
    const elUpload = `<div class="upload-img flex align-center justify-center col" onclick="onUploadClick()">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        <h1>Upload Image</h1>
    </div>`

    const strHTML = images.map(({ id, name }) => `
    <img src="img/gallery/${name}" class="mems-img" data-img-id="${id}" alt="${name}" onerror="removeImg(this)" onclick="onImgClick(this,${id})" />
    `).join(' ')

    document.querySelector('.main-gallery').innerHTML = elUpload + strHTML
}

function renderKeywords(keywords) {

    const strHTML = keywords.map(({ keyword, count }) => `
    <span class="${keyword}" onclick="onKeywordClick('${keyword}')" style="font-size:${1 + count * 0.3}em">${keyword}</span>
    `).join(' ')
    document.querySelector('.gallery .keywords').innerHTML = strHTML
}

function onKeywordClick(keyword) {
    increaseCount(keyword)
}
function onMoreKeywords(elArrow) {
    gIsAllKeywords = !gIsAllKeywords
    chooseKeywords()
    document.querySelector('.gallery-header').classList.toggle('open-content')
    elArrow.classList.toggle('move-down')
    elArrow.classList.toggle('rotate')
}
function removeImg(el) {
    el.style.display = 'none'
}

function onImgClick(elImg, imgId) {

    if (elImg) drawImgFromLocal(elImg, renderMeme, imgId)
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

function onUploadClick() {
    document.querySelector('.file-input').click()
    onImgClick()
}
