'use strict'
const gKeyWords = getKeyWords()
const gImgs = getImages()
const gKeywordSearchCountMap = 0

function onInit() {
    renderGallery()
}

function renderGallery() {
    const strHTML = gImgs.map(({ id, name }) => `
    <img src="img/gallery/${name}" class="mems-img" data-img-id="${id}" alt="${name}" onerror="removeImg(this)" onclick="onImgClick(this,${id})" />
    `).join(' ')
    document.querySelector('.main-gallery').innerHTML = strHTML
}

function removeImg(el) {
    el.style.display = 'none'
}

function onImgClick(elImg, imgId) {
    document.querySelector('.gallery').classList.add('hide')
    drawImgFromLocal(elImg, renderMeme, imgId)
    document.querySelector('.main-editor-container').classList.remove('hide')
    document.querySelector('.current-page-link').classList.remove('current-page-link')
}


function getImages() {
    let images = []
    for (let i = 0; i < 29; i++) {
        images.push({ id: i + 1, name: `${i + 1}.jpg`, keywords: getRandomKeywords() })
    }
    return images
}

function getKeyWords() {
    return [
        'funny', 'cat', 'dog', 'love', 'politic', 'smart', 'happy', 'bad', 'animal'
    ]
}

function getRandomKeywords() {
    const keywords = [...gKeyWords]
    const randomKeyWords = []

    for (let i = 0; i < 3; i++) {
        const rndIdx = getRandomInt(0, keywords.length)
        const currKeyword = keywords.splice(rndIdx, 1)
        randomKeyWords.push(currKeyword)
    }

    return randomKeyWords
}

function onToggleMenu(){
            document.body.classList.toggle('menu-open')
    }

