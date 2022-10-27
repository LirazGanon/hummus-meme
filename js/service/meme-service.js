'use strict'

let gMeme = {
    selectedLineIdx: 0,
    lines: []
}

function drewImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        setNewImg(event.target.result, onImageReady)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function drawImgFromLocal({ src }, onImageReady, imgId) {
    setNewImg(src, onImageReady, imgId)
}

function setNewImg(imgSrc, renderMeme, imgId = 'localImg') {
    gMeme.img = new Image()
    gMeme.img.src = imgSrc
    gMeme.selectedImgId = imgId
    gMeme.img.onload = () => {
        setCanvasSize(gMeme.img)
        linesInit()
        renderMeme()
    }
}

function linesInit() {
    gMeme.lines = [_createLine()]
}

function addLine(renderMeme) {
    gMeme.lines.push(_createLine())
    renderMeme()
}

function _createLine() {
    const fontSize = gMeme.img.width / 8
    return {
        text: '',
        fontSize,
        fillColor: '#FFFF',
        xOffset: gMeme.img.width / 2,
        isDrag: false
    }
}

function switchLines(renderMeme) {
    let { selectedLineIdx, lines } = gMeme
    selectedLineIdx++
    if (selectedLineIdx === lines.length) selectedLineIdx = 0
    gMeme.selectedLineIdx = selectedLineIdx
    setInputValue(lines[selectedLineIdx].text)
    renderMeme()
}


function getLineYOffset(currLine, fontSize) {

    switch (currLine) {
        case 0:
            gMeme.lines[currLine].yOffset = gElCanvas.height / 25 + fontSize
            break;
        case 1:
            gMeme.lines[currLine].yOffset = gElCanvas.height - gElCanvas.height / 25
            break;
        default:
            gMeme.lines[currLine].yOffset = gElCanvas.height / 2 + fontSize / 3
    }
    return currLine.yOffset
}

function setText(ev, renderMeme, attribute) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx][attribute] = ev.target.value
    renderMeme()
}

function increaseFont(isTrue, renderMeme) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].fontSize *= isTrue ? 1.05 : 0.95
    renderMeme()
}


function getMeme() {
    return gMeme
}


function isTextClicked(clickedPos) {
    clickedPos.x
    clickedPos.y
    console.log(clickedPos.x)
    // const { pos } = gCircle
    const lineClicked = gMeme.lines.find(line => {
        console.log(line.xOffset, (gElCanvas.width - line.width - line.xOffset))
        return clickedPos.x > line.xOffset && clickedPos.x < line.xOffset
    })

    console.log(lineClicked)
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    return distance <= gCircle.size
}
