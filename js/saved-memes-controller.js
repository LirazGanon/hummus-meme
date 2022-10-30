'use strict'


function onMemesClick(){
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.main-editor-container').classList.add('hide')
    document.querySelector('.main-about').classList.add('hide')
    document.querySelector('.saved-mems-container').classList.remove('hide')
    document.querySelector('body').classList.remove('menu-open')

    if(document.querySelector('.current-page-link'))
    document.querySelector('.current-page-link').classList.remove('current-page-link')
    document.querySelector('.nav-link.memes').classList.add('current-page-link')
    
    renderSavedMemes(gSavedMemes)
}

function renderSavedMemes(mems) {
    const savedMemes = mems.map(item => JSON.parse(item))
    const strHTML = savedMemes.map((meme,idx) => `
    <article>
    <img class="meme-preview-img" src="${meme.captureImg}" onclick="onLoadSavedMemeToCanvas(gSavedMemes[${idx}])" />
    </article>
    `).join(' ')

    document.querySelector('.saved-mems-container').innerHTML = strHTML
}
