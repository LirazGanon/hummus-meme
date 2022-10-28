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
    const fontSize = gElCanvas.width / 8
    return {
        text: '',
        fontSize,
        strokeStyle: 'black',
        fillColor: '#FFFF',
        textAlign: 'center',
        font: 'Impact',
        xOffset: getXoffset(),
        isDrag: false
    }
}

function setFontAndOffset() {
    gMeme.lines.forEach(line => {
        line.fontSize = gElCanvas.width / 8
        line.xOffset = getXoffset(line.textAlign)
        if (gElCanvas.width > 550) line.yOffset = 0
    })
}

function switchLines(renderMeme) {
    let { selectedLineIdx, lines } = gMeme
    selectedLineIdx++
    if (selectedLineIdx === lines.length) selectedLineIdx = 0
    gMeme.selectedLineIdx = selectedLineIdx
    setInputValue(lines[selectedLineIdx].text)
    renderMeme()
    if (gElCanvas.width > 550) focusTextLine()
}


function getLineYOffset(currLine, fontSize) {
    switch (currLine) {
        case 0:
            gMeme.lines[currLine].yOffset = gElCanvas.height / 25 + fontSize
            break;
        case 1:
            gMeme.lines[currLine].yOffset = gElCanvas.height - (gElCanvas.height / 25) - fontSize / 2
            break;
        default:
            gMeme.lines[currLine].yOffset = (gElCanvas.height / 2) + fontSize / 3
    }

    return gMeme.lines[currLine].yOffset
}

function getXoffset(alignment) {
    let x
    switch (alignment) {
        case 'left':
            x = 5
            break;
        case 'right':
            x = gElCanvas.width - 5
            break;
        default:
            x = gElCanvas.width / 2
            break;
    }

    return x
}

function setText(val, renderMeme, attribute) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx][attribute] = val
    if(attribute==='textAlign') lines[selectedLineIdx].xOffset = getXoffset(val)
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


function isTextClickHover(clickedPos) {

    const lineClickedIdx = gMeme.lines.findIndex(line => clickedPos.x < (line.xOffset + line.width / 2) && clickedPos.x > (line.xOffset - line.width / 2) &&
        clickedPos.y < line.yOffset && clickedPos.y > (line.yOffset - line.fontSize + 14)
    )

    if (lineClickedIdx === -1) return

    gMeme.selectedLineIdx = lineClickedIdx

    const lineClicked = gMeme.lines[lineClickedIdx]
    if (gElCanvas.width > 550) focusTextLine()
    setInputValue(gMeme.lines[gMeme.selectedLineIdx].text)
    return lineClicked
}

function moveText(dx, dy) {
    gCurrDarg.xOffset += dx
    gCurrDarg.yOffset += dy

}
