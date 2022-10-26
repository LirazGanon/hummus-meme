'use strict'
let gElCanvas
let gCtx


gElCanvas = document.querySelector('.main-canvas')
gCtx = gElCanvas.getContext('2d')

function renderMeme() {
    const { img, lines } = getMem()
    renderImg(img)
    renderTextInput(lines)
}
function setCanvasSize({ width, height }) {

    gElCanvas.width = width
    gElCanvas.height = height
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderMeme)
}

function onTextInput(ev) {
    setLineText(ev, renderMeme)
}

function onColorInput(ev) {
    setTextColor(ev, renderMeme)
}

function onAddLine() {
    addLine(renderMeme)
}

function onSwitchLines(){
    switchLines(renderMeme)
}


function renderImg(img) {

    gCtx.drawImage(img, 0, 0)
}

function renderTextInput(textLines) {

    textLines.forEach((line,idx) => {
        let { fontSize, fillColor, text, yOffset } = line
        if(!yOffset) yOffset = getLineYOffset(idx,fontSize)
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = Math.floor(gMem.fontSize / 10)
        gCtx.fillStyle = fillColor
        gCtx.textAlign = 'center'
        gCtx.lineJoin = 'round'
        gCtx.lineWidth = 7
        gCtx.letterSpacing = '3px'

        // if (gCtx.measureText(text).width > 119) {
            
        //     fontSize = Math.floor(gElCanvas.width / (8 + (gCtx.measureText(text).width / 90)))
        //     console.log()
        // }
        

        gCtx.font = `bold ${fontSize}px Impact`
        gCtx.strokeText(text, gElCanvas.width / 2, yOffset)
        gCtx.fillText(text, gElCanvas.width / 2, yOffset)
    })
}

function setInputValue(val){
    document.querySelector('.mems-text').value = val
}
