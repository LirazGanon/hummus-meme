'use strict'
const STORAGE_KEY = 'saved_memes'
let gSavedMemes = []
_loadMemesFromStorage()

let gMeme = {
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [],
    stickers: []
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
        focusTextLine()
        renderMeme()
    }
}

function addSticker({ src }, renderMeme, StickerId) {
    const sticker = new Image()
    sticker.src = src
    sticker.idx = StickerId
    sticker.xOffset = gElCanvas.width / 6
    sticker.yOffset = gElCanvas.height / 6
    sticker.width = gElCanvas.width / 2
    const stickers = gMeme.stickers
    stickers.unshift(sticker)
    stickers[0].onload = () => {
        renderStickerOnCanvas(stickers)
        renderMeme()
    }
}

function linesInit() {
    gMeme.lines = [_createLine()]
}

function addLine(renderMeme) {
    const { lines } = gMeme
    lines.push(_createLine())
    gMeme.selectedLineIdx = lines.length - 1
    setInputValue(lines[gMeme.selectedLineIdx].text)
    focusTextLine()
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
        line.fontSize = gElCanvas.width * line.fontRatio
        // line.xOffset = getXoffset(line.textAlign)
        // line.yOffset = 0
    })
}

function switchLines(renderMeme) {
    let { selectedLineIdx, lines } = gMeme
    selectedLineIdx++
    if (selectedLineIdx === lines.length) selectedLineIdx = 0
    gMeme.selectedLineIdx = selectedLineIdx
    setInputValue(lines[selectedLineIdx].text)
    renderMeme()
    focusTextLine()
}

function deleteLine(renderMeme) {
    let { selectedLineIdx, lines } = gMeme
    if (lines.length === 1) return
    lines.splice(selectedLineIdx, 1)
    selectedLineIdx = lines.length - 1
    setInputValue(lines[selectedLineIdx].text)
    gMeme.selectedLineIdx = selectedLineIdx
    renderMeme()
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
    if (attribute === 'textAlign') lines[selectedLineIdx].xOffset = getXoffset(val)
    renderMeme()
}

function increaseFont(isTrue, renderMeme) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].fontSize *= isTrue ? 1.05 : 0.95
    renderMeme()
}

function increaseSticker(isTrue, renderMeme) {
    const { selectedStickerIdx, stickers } = gMeme
    stickers[selectedStickerIdx].width *= isTrue ? 1.05 : 0.95
    renderMeme()
}



function getMeme() {
    return gMeme
}


function getLineClickHover(clickedPos) {

    const lineClickedIdx = findLineByPos(clickedPos)
    if (lineClickedIdx === -1) return

    gStickerIsSelected = false
    gLineIsSelected = true

    gMeme.selectedLineIdx = lineClickedIdx

    const lineClicked = gMeme.lines[lineClickedIdx]
    focusTextLine()
    setInputValue(gMeme.lines[gMeme.selectedLineIdx].text)
    return lineClicked
}

function moveShape(dx, dy) {
    gCurrDarg.xOffset += dx
    gCurrDarg.yOffset += dy

}

function findLineByPos(clickedPos) {

    return gMeme.lines.findIndex(line => {
        switch (line.textAlign) {
            case 'right':
                return clickedPos.x < (line.xOffset) && clickedPos.x > (line.xOffset - line.width) &&
                    clickedPos.y < line.yOffset && clickedPos.y > (line.yOffset - line.fontSize + 14)
            case 'left':
                return clickedPos.x > (line.xOffset) && clickedPos.x < (line.width - line.xOffset) &&
                    clickedPos.y < line.yOffset && clickedPos.y > (line.yOffset - line.fontSize + 14)
            default:
                return clickedPos.x < (line.xOffset + line.width / 2) && clickedPos.x > (line.xOffset - line.width / 2) &&
                    clickedPos.y < line.yOffset && clickedPos.y > (line.yOffset - line.fontSize + 14)
        }
    })
}


function findStickerIdx(clickedPos) {
    const Stickers = gMeme.stickers
    const stickerIdx = Stickers.findIndex((sticker, idx) => clickedPos.x > sticker.xOffset &&
        clickedPos.x < sticker.width + sticker.xOffset &&
        clickedPos.y > sticker.yOffset && clickedPos.y < sticker.width + sticker.yOffset
    )

    if (stickerIdx === -1) {
        return
    }

    gMeme.selectedStickerIdx = stickerIdx
    const selectedSticker = gMeme.stickers[stickerIdx]


    gStickerIsSelected = true
    gLineIsSelected = false


    return selectedSticker
}


function getStickerClick(clickedPos) {

    const lineClickedIdx = findStickerIdx(clickedPos)
    if (lineClickedIdx === -1) {
        gStickerIsSelected = false
        return
    }


    gStickerIsSelected = true

    gMeme.selectedStickerIdx = lineClickedIdx

    return gMeme.stickers[lineClickedIdx]
}

function getRectPos() {

    const line = gMeme.lines[gMeme.selectedLineIdx]
    const reactPos = {
        y: line.yOffset + 15,
        yOffset: -line.fontSize - 15,
        x: 0,
        xOffset: 0
    }

    const textWidth = line.text ? gCtx.measureText(line.text).width : gCtx.measureText('Enter your text').width

    switch (line.textAlign) {
        case 'right':
            reactPos.x = line.xOffset + 10
            reactPos.xOffset = -textWidth - 20
            break;
        case 'left':
            reactPos.x = line.xOffset - 10
            reactPos.xOffset = textWidth + 20
            break;
        default:
            reactPos.x = line.xOffset - textWidth / 2 - 10
            reactPos.xOffset = textWidth + 20
    }

    return reactPos
}


function saveMeme() {
    gLineIsSelected = false
    document.querySelector('.tooltip .tooltiptext').classList.add('tooltip-visible')
    setTimeout(() => {
        document.querySelector('.tooltip .tooltiptext').classList.remove('tooltip-visible')
    }, 1500);
    renderMeme()
    gMeme.captureImg = gElCanvas.toDataURL()
    gSavedMemes.push(JSON.stringify(gMeme))
    _saveMemesToStorage()
    gLineIsSelected = true
    renderMeme()
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function _loadMemesFromStorage() {
    let mems = loadFromStorage(STORAGE_KEY)
    if (!mems || !mems.length) {
        mems = getDefaultMems()
        mems.forEach(meme => gSavedMemes.push(JSON.stringify(meme)))
        return
    }
    gSavedMemes = mems
}

function loadSavedMemeToCanvas(savedMeme) {
    const meme = JSON.parse(savedMeme)
    const img = gImgs.find(img => img.id === meme.selectedImgId)
    gMeme = meme
    setSavedMeme(`img/gallery/${img.name}`, renderMeme, img.id)
}

function setSavedMeme(imgSrc, renderMeme, imgId) {
    gMeme.img = new Image()
    gMeme.img.src = imgSrc
    gMeme.selectedImgId = imgId
    gMeme.img.onload = () => {
        setCanvasSize(gMeme.img)
        setFontAndOffset()
        setFontPos()
        focusTextLine()
        addSavedStickers()
        renderMeme()
    }
}

function setFontPos() {
    gMeme.lines.forEach(line => {
        if (!line.xRatio) return
        line.xOffset = line.xRatio * gElCanvas.width
        line.yOffset = line.yRatio * gElCanvas.height
    })

}

function addSavedStickers() {
    const savedStickers = []

    for (let i = 0; i < gMeme.stickers.length; i++) {
        const currSticker = gMeme.stickers[i]
        const foundSticker = gStickers.find(gSticker => gSticker.id === currSticker.idx)
        const img = new Image()
        img.src = `img/stickers/${foundSticker.name}`
        img.idx = foundSticker.id
        img.xOffset = currSticker.xOffset
        img.yOffset = currSticker.yOffset
        savedStickers.push(img)
    }
    gMeme.stickers = savedStickers
}


async function shareCanvas() {
    const dataUrl = gElCanvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File(
            [blob],
            'animation.png',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}