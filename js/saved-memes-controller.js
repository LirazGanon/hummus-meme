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
    <article class="meme-preview">
    <img class="meme-preview-img" src="${meme.captureImg}" onclick="onLoadSavedMemeToCanvas(gSavedMemes[${idx}])" />
    <div class="meme-trash-container" onclick="onDeleteMeme(event,${idx})">
    <ion-icon class="delete-meme" name="trash-outline" ></ion-icon>
    </div>
    </article>
    `).join(' ')

    document.querySelector('.saved-mems-container').innerHTML = strHTML
}

function onDeleteMeme(ev,id){
    ev.stopPropagation()
    deleteMeme(id)
}