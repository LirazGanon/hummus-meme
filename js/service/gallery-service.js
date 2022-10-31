'use strict'

const gImgs = getImages()
const gKeywords = getAllKeywords()
const gKeywordCountMap = gKeywords.map(keyword => ({ keyword, count: getRandomInt(0, 4) }))
const gSelectedKeywords = getSelectedKeywords()

function setFilterByTxt(txt, renderGallery) {
    if (!txt) {
        renderGallery()
        return
    }
    const filteredImg = gImgs.filter(img => img.keywords.find(keyword => {
        return keyword.toLocaleLowerCase().includes(txt.toLowerCase())
    }))
    renderGallery(filteredImg)
}

function getAllKeywords() {
    let keywords = gImgs.map(img => img.keywords.join(' '))
    let uniqueList = keywords.join(' ').split(' ')
    uniqueList = [...new Set(uniqueList)]
    return uniqueList
}

function getSelectedKeywords() {
    const keywords = [...gKeywordCountMap]
    const selectedKeywords = []
    for (let i = 0; i < 5; i++) {
        selectedKeywords.push(keywords.splice(getRandomInt(0, keywords.length), 1)[0])
    }
    return selectedKeywords
}

function increaseCount(keyword) {
    const keywordClicked = gKeywordCountMap.find(item => item.keyword === keyword)
    if (keywordClicked.count < 7) keywordClicked.count++
    chooseKeywords()
    setFilterByTxt(keyword, renderGallery)
}

function chooseKeywords() {
    if (gIsAllKeywords) renderKeywords(gKeywordCountMap)
    else renderKeywords(gSelectedKeywords)
}


function getImages() {
    return [
        {
            "id": 1,
            "name": "1.jpg",
            "keywords": [
                "Coding",
                "Funny",
                "Man",
                "Girl"
            ]
        },
        {
            "id": 2,
            "name": "2.jpg",
            "keywords": [
                "Tramp",
                "Politic",
            ]
        },
        {
            "id": 3,
            "name": "3.jpg",
            "keywords": [
                "Animal",
                "Dog",
                "Love"
            ]
        },
        {
            "id": 4,
            "name": "4.jpg",
            "keywords": [
                "Dog",
                "Love",
                "Happy",
                "Love",
                "Sleep"
            ]
        },
        {
            "id": 5,
            "name": "5.jpg",
            "keywords": [
                "kids",
                "funny",
                "Bad"
            ]
        },
        {
            "id": 6,
            "name": "6.jpg",
            "keywords": [
                "Cat",
                "Sleep",
                "Animal",
            ]
        },
        {
            "id": 7,
            "name": "7.jpg",
            "keywords": [
                "Funny",
                "Smart",
            ]
        },
        {
            "id": 8,
            "name": "8.jpg",
            "keywords": [
                "Funny",
                "Batman",
                "jQuery",
                "Coding"
            ]
        },
        {
            "id": 9,
            "name": "9.jpg",
            "keywords": [
                "Smart",
                "Kids",
                "Funny",
                "Bad"
            ]
        },
        {
            "id": 10,
            "name": "10.jpg",
            "keywords": [
                "Politic",
                "Bad",
                "Coding"
            ]
        },
        {
            "id": 11,
            "name": "11.jpg",
            "keywords": [
                "Man",
                "Politic",
                "Celeb"
            ]
        },
        {
            "id": 12,
            "name": "12.jpg",
            "keywords": [
                "Smart",
                "Celeb",
                "Man"
            ]
        },
        {
            "id": 13,
            "name": "13.jpg",
            "keywords": [
                "Bad",
                "Man",
                "Funny",
                "jQuery"
            ]
        },
        {
            "id": 14,
            "name": "14.jpg",
            "keywords": [
                "Kids",
                "Funny",
                "Happy"
            ]
        },
        {
            "id": 15,
            "name": "15.jpg",
            "keywords": [
                "Tramp",
                "Man",
                "Politic",
                "Funny"
            ]
        },
        {
            "id": 16,
            "name": "16.jpg",
            "keywords": [
                "Kids",
                "Funny",
                "Happy"
            ]
        },
        {
            "id": 17,
            "name": "17.jpg",
            "keywords": [
                "Animal",
                "Dog",
                "Funny"
            ]
        },
        {
            "id": 18,
            "name": "18.jpg",
            "keywords": [
                "Man",
                "Politic",
                "Happy",
                "Obama"
            ]
        },
        {
            "id": 19,
            "name": "19.jpg",
            "keywords": [
                "Funny",
                "Man",
                "Love"
            ]
        },
        {
            "id": 20,
            "name": "20.jpg",
            "keywords": [
                "Celeb",
                "Man",
                "Happy",
                "TV"
            ]
        },
        {
            "id": 21,
            "name": "21.jpg",
            "keywords": [
                "Man",
                "Celeb",
                "TV"
            ]
        },
        {
            "id": 22,
            "name": "22.jpg",
            "keywords": [
                "Man",
                "Funny",
                "TV",
                "Celeb"
            ]
        },
        {
            "id": 23,
            "name": "23.jpg",
            "keywords": [
                "Girl",
                "Happy",
            ]
        },
        {
            "id": 24,
            "name": "24.jpg",
            "keywords": [
                "Man",
                "Funny",
                "TV",
                "Smart"
            ]
        },
        {
            "id": 25,
            "name": "25.jpg",
            "keywords": [
                "Man",
                "Politic",
                "Bad"
            ]
        },
        {
            "id": 26,
            "name": "26.jpg",
            "keywords": [
                "Kids",
                "TV",
            ]
        },
        {
            "id": 27,
            "name": "27.jpg",
            "keywords": [
                "Sleep",
                "Man",
                "Girl"
            ]
        },
        {
            "id": 28,
            "name": "28.jpg",
            "keywords": [
                "Coding",
                "jQuery",
                "Funny"
            ]
        },
        {
            "id": 29,
            "name": "29.jpg",
            "keywords": [
                "Coding",
                "jQuery",
                "Funny"
            ]
        }
    ]
}
