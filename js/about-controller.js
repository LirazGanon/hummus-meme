'use strict'


function onAboutClick(){
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.main-editor-container').classList.add('hide')
    document.querySelector('.saved-mems-container').classList.add('hide')
    document.querySelector('.main-about').classList.remove('hide')
    document.querySelector('body').classList.remove('menu-open')

    if(document.querySelector('.current-page-link'))
    document.querySelector('.current-page-link').classList.remove('current-page-link')
    document.querySelector('.nav-link.about').classList.add('current-page-link')
}