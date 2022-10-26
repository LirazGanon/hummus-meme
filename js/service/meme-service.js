'use strict'

let gLineModel
let gCurrLine = 0

let gMem = {
    lines: []
}

function memsInit() {

    gLineModel = {
        text: 'Enter your text',
        fontSize: 70,
        fillColor: '#FFFF',
    }

    gMem.lines = [_createLine(gLineModel)]
}

function getMem() {
    return gMem
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        gMem.img = new Image()
        gMem.img.src = event.target.result
        gMem.img.onload = () => {
            setCanvasSize(gMem.img)
            memsInit()
            onImageReady()
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function drawImgFromRemote({ src }, onImageReady) {

    gMem.img = new Image()
    gMem.img.src = src
    gMem.img.onload = () => {
        setCanvasSize(gMem.img)
        memsInit()
        onImageReady()
    }
}
function _createLine({ text, fontSize, fillColor }) {
    return {
        text,
        fontSize,
        fillColor,
    }
}

function getLineYOffset(currLine, fontSize) {
    switch (currLine) {
        case 0:
            return gElCanvas.height / 25 + fontSize
        case 1:
            return gElCanvas.height - gElCanvas.height / 25
        default:
            return gElCanvas.height / 2 + fontSize / 3
    }
}


function setLineText(ev) {
    gMem.lines[gCurrLine].text = ev.target.value
    renderMeme()
}

function setTextColor(ev) {

    gMem.fillColor = ev.target.value
    renderMeme()
}

function increaseFont(isTrue) {
    gMem.fontSize *= isTrue ? 1.05 : 0.95
    renderMeme()
}

function addLine(cb) {
    gMem.lines.push(_createLine(gLineModel))
    cb()
}

function switchLines(cb) {
    gCurrLine++
    if (gCurrLine === gMem.lines.length) gCurrLine = 0
    setInputValue(gMem.lines[gCurrLine].text)
    cb()
}

function getImages() {
    return ['8.jpg', '006.jpg', '5.jpg', '2.jpg', '003.jpg', '004.jpg', '005.jpg', '9.jpg', '12.jpg', '19.jpg',
        'Ancient-Aliens.jpg', 'drevil.jpg', 'default.jpg', 'img2.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img11.jpg',
        'img12.jpg', 'leo.jpg', 'meme1.jpg', 'patrick.jpg', 'putin.jpg', 'One-Does-Not-Simply.jpg']
}



