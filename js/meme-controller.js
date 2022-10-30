'use strict'
let gElCanvas
let gCtx
let gCurrDarg
let gIsSelected = true
let gStartPos
const gStickers = getStickers()
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

gElCanvas = document.querySelector('.main-canvas')
gCtx = gElCanvas.getContext('2d')
addMouseListeners()
addTouchListeners()
setCanvasWidth()
renderStickersOnEditor()

window.addEventListener("resize", () => {
    if (getMeme().lines.length === 0) return
    setCanvasWidth()
    setCanvasSize(gMeme.img)
    setFontAndOffset()
    renderMeme()
});

function renderMeme() {
    const { img, lines, stickers } = getMeme()
    renderImg(img)
    renderStickerOnCanvas(stickers)
    renderTextInput(lines)
}

function setCanvasWidth() {
    const pageWidth = getPageWidth()
    if (pageWidth < 748) gElCanvas.width = pageWidth * 0.95
    else gElCanvas.width = pageWidth * 0.40
}

function setCanvasSize({ width, height }) {
    gElCanvas.height = (height * gElCanvas.width) / width
    if (gElCanvas.height > 825) {
        gElCanvas.width = 610
        setCanvasSize(gMeme.img)
    }
    // document.querySelector('.main-canvas-container').width=gElCanvas.width
}

function onImgInput(ev) {
    drewImageFromInput(ev, renderMeme)
}

function onTextInput(ev) {
    setText(ev.target.value, renderMeme, 'text')
}

function onColorInput(ev) {
    setText(ev.target.value, renderMeme, ev.target.name)
}

function onAddLine() {
    addLine(renderMeme)
}

function onSwitchLines() {
    switchLines(renderMeme)
}

function onDeleteLine() {
    deleteLine(renderMeme)
}

function onAlignFont(val) {
    setText(val, renderMeme, 'textAlign')
}

function onSetFont(el) {
    el.style.fontFamily = el.value
    setText(el.value, renderMeme, 'font')
}

function onShare(){
    uploadImg()
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderStickerOnCanvas(stickers) {
    const revStickers = [...stickers].reverse()
    revStickers.forEach(sticker => {
        gCtx.drawImage(sticker, sticker.xOffset, sticker.yOffset, gElCanvas.width - gElCanvas.width / 2,
        gElCanvas.height - gElCanvas.height / 2)
    })
}

function onIncreaseFont(isTrue) {
    increaseFont(isTrue, renderMeme)
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
}

function onSaveMeme(){
saveMeme()
}

function onLoadSavedMemeToCanvas(savedMeme) {
    document.querySelector('.main-editor-container').classList.remove('hide')
    document.querySelector('.saved-mems-container').classList.add('hide')
    document.querySelector('.current-page-link').classList.remove('current-page-link')
    loadSavedMemeToCanvas(savedMeme)
}

function renderTextInput(textLines) {
    textLines.forEach((line, idx) => {
        let { fontSize, fillColor, text, yOffset, xOffset, strokeStyle, textAlign, font } = line
        if (!yOffset) yOffset = getLineYOffset(idx, fontSize)
        if (!text) text = 'Enter Your Text'
        gCtx.strokeStyle = strokeStyle
        gCtx.fillStyle = fillColor
        gCtx.textAlign = textAlign
        gCtx.textBaseline = textAlign
        gCtx.lineJoin = 'round'
        gCtx.lineWidth = 7
        gCtx.letterSpacing = '5px'
        gCtx.font = `${fontSize}px ${font}`
        gCtx.strokeText(text, xOffset, yOffset)
        gCtx.fillText(text, xOffset, yOffset)
        const rectPos = getReactPos()
        // if (gIsSelected) gCtx.strokeRect(rectPos.x, rectPos.y, rectPos.xOffset, rectPos.yOffset)

        if (gCtx.measureText(text).width > gElCanvas.width) {
            gMeme.lines[idx].fontSize = fontSize * 0.9
            renderMeme()
        }
        gMeme.lines[idx].width = gCtx.measureText(text).width
    })
}

function setInputValue(val) {
    document.querySelector('.mems-text').value = ''
    document.querySelector('.mems-text').value = val
}


function renderStickersOnEditor() {
    const strHTML = gStickers.map(({ id, name }) => `
    <img src="img/stickers/${name}" class="sticker-img" data-img-id="${id}" alt="${name}" onerror="removeImg(this)" onclick="onStickerClick(this,${id})" />
    `).join(' ')
    document.querySelector('.stickers').innerHTML = strHTML
}

function getStickers() {
    let stickers = []
    for (let i = 0; i < 14; i++) {
        stickers.push({ id: i + 1, name: `${i + 1}.png` })
    }
    return stickers
}

function onStickerClick(elSticker, StickerId) {
    addSticker(elSticker, renderMeme, StickerId)
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
    if (findStickerIdx(pos) !== -1) {
        const stickerIdx = findStickerIdx(pos)
        gCurrDarg = gMeme.stickers[stickerIdx]
        gCurrDarg.isDrag = true
        gStartPos = pos
    }
    else if (getLineClickHover(pos)) {
        gCurrDarg = getLineClickHover(pos)
        gCurrDarg.isDrag = true
        gStartPos = pos
    }
}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (getLineClickHover(pos)) gElCanvas.style.cursor = 'grab'
    else if (findStickerIdx(pos) !== -1) gElCanvas.style.cursor = 'grab'
    else gElCanvas.style.cursor = 'auto'
    const isDrag = gCurrDarg ? gCurrDarg.isDrag : false
    if (!isDrag) return
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveShape(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    if (!gCurrDarg) return
    gCurrDarg.isDrag = false
}

function focusTextLine() {
    if (getPageWidth() < 550) return
    document.querySelector('.text-input').click()
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


