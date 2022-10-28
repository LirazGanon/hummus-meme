'use strict'
let gElCanvas
let gCtx
let gCurrDarg
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

gElCanvas = document.querySelector('.main-canvas')
gCtx = gElCanvas.getContext('2d')
addMouseListeners()
addTouchListeners()


function renderMeme() {
    const { img, lines } = getMeme()
    renderImg(img)
    renderTextInput(lines)
}

function setCanvasSize({ width, height }) {
    // gElCanvas.width = width
    gElCanvas.height = (height * gElCanvas.width) / width
}

function onImgInput(ev) {
    drewImageFromInput(ev, renderMeme)
}

function onTextInput(ev) {
    setText(ev, renderMeme, 'text')
}

function onColorInput(ev) {
    setText(ev, renderMeme, 'fillColor')
}

function onAddLine() {
    addLine(renderMeme)
}

function onSwitchLines() {
    switchLines(renderMeme)
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onIncreaseFont(isTrue) {
    increaseFont(isTrue, renderMeme)

}

function renderTextInput(textLines) {
    textLines.forEach((line, idx) => {
        let { fontSize, fillColor, text, yOffset, xOffset } = line
        if (!yOffset) yOffset = getLineYOffset(idx, fontSize)
        if (!text) text = 'Enter Your Text'
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = fillColor
        gCtx.textAlign = 'center'
        gCtx.lineJoin = 'round'
        gCtx.lineWidth = 7
        gCtx.letterSpacing = '5px'

        gCtx.font = `${fontSize}px Impact`

        gCtx.strokeText(text, xOffset, yOffset)
        gCtx.fillText(text, xOffset, yOffset)

        if (gCtx.measureText(text).width > gElCanvas.width) {
            gMeme.lines[idx].fontSize = fontSize * 0.9
            renderMeme()
        }
        gMeme.lines[idx].width = gCtx.measureText(text).width
    })
}

function setInputValue(val) {
    document.querySelector('.mems-text').value = val
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    gCurrDarg = isTextClicked(pos)
    gCurrDarg.isDrag = true
    gStartPos = pos

}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (isTextClicked(pos)) gElCanvas.style.cursor = 'grab'
    else gElCanvas.style.cursor = 'auto'
    const isDrag = gCurrDarg ? gCurrDarg.isDrag : false
    if (!isDrag) return
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    gCurrDarg.isDrag = false
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
