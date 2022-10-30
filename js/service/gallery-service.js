'use strict'

const gImgs = getImages()
const gKeywordSearchCountMap = 0

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


function getImages(){
   return [
    {
        "id": 0,
        "name": "0.png",
        "keywords": [
            "coding",
            "funny",
            "man",
            "girl"
        ]
    },
        {
            "id": 1,
            "name": "1.jpg",
            "keywords": [
                "coding",
                "funny",
                "man",
                "girl"
            ]
        },
        {
            "id": 2,
            "name": "2.jpg",
            "keywords": [
                "tramp",
                "politic",
            ]
        },
        {
            "id": 3,
            "name": "3.jpg",
            "keywords": [
                "animal",
                "dog",
                "love"
            ]
        },
        {
            "id": 4,
            "name": "4.jpg",
            "keywords": [
                "dog",
                "love",
                "happy",
                "love",
                "sleep"
            ]
        },
        {
            "id": 5,
            "name": "5.jpg",
            "keywords": [
                "happy",
                "love",
                "bad"
            ]
        },
        {
            "id": 6,
            "name": "6.jpg",
            "keywords": [
                "smart",
                "coding",
                "happy"
            ]
        },
        {
            "id": 7,
            "name": "7.jpg",
            "keywords": [
                "politic",
                "smart",
                "web"
            ]
        },
        {
            "id": 8,
            "name": "8.jpg",
            "keywords": [
                "love",
                "smart",
                "web"
            ]
        },
        {
            "id": 9,
            "name": "9.jpg",
            "keywords": [
                "smart",
                "happy",
                "coding"
            ]
        },
        {
            "id": 10,
            "name": "10.jpg",
            "keywords": [
                "politic",
                "bad",
                "animal"
            ]
        },
        {
            "id": 11,
            "name": "11.jpg",
            "keywords": [
                "cat",
                "animal",
                "politic"
            ]
        },
        {
            "id": 12,
            "name": "12.jpg",
            "keywords": [
                "funny",
                "web",
                "smart"
            ]
        },
        {
            "id": 13,
            "name": "13.jpg",
            "keywords": [
                "bad",
                "coding",
                "smart"
            ]
        },
        {
            "id": 14,
            "name": "14.jpg",
            "keywords": [
                "politic",
                "cat",
                "bad"
            ]
        },
        {
            "id": 15,
            "name": "15.jpg",
            "keywords": [
                "web",
                "love",
                "happy"
            ]
        },
        {
            "id": 16,
            "name": "16.jpg",
            "keywords": [
                "dog",
                "politic",
                "bad"
            ]
        },
        {
            "id": 17,
            "name": "17.jpg",
            "keywords": [
                "bad",
                "politic",
                "animal"
            ]
        },
        {
            "id": 18,
            "name": "18.jpg",
            "keywords": [
                "love",
                "cat",
                "bad"
            ]
        },
        {
            "id": 19,
            "name": "19.jpg",
            "keywords": [
                "funny",
                "animal",
                "coding"
            ]
        },
        {
            "id": 20,
            "name": "20.jpg",
            "keywords": [
                "happy",
                "love",
                "bad"
            ]
        },
        {
            "id": 21,
            "name": "21.jpg",
            "keywords": [
                "coding",
                "happy",
                "cat"
            ]
        },
        {
            "id": 22,
            "name": "22.jpg",
            "keywords": [
                "happy",
                "bad",
                "love"
            ]
        },
        {
            "id": 23,
            "name": "23.jpg",
            "keywords": [
                "cat",
                "love",
                "funny"
            ]
        },
        {
            "id": 24,
            "name": "24.jpg",
            "keywords": [
                "smart",
                "cat",
                "web"
            ]
        },
        {
            "id": 25,
            "name": "25.jpg",
            "keywords": [
                "coding",
                "politic",
                "smart"
            ]
        },
        {
            "id": 26,
            "name": "26.jpg",
            "keywords": [
                "animal",
                "funny",
                "smart"
            ]
        },
        {
            "id": 27,
            "name": "27.jpg",
            "keywords": [
                "web",
                "cat",
                "smart"
            ]
        },
        {
            "id": 28,
            "name": "28.jpg",
            "keywords": [
                "coding",
                "politic",
                "web"
            ]
        },
        {
            "id": 29,
            "name": "29.jpg",
            "keywords": [
                "love",
                "animal",
                "dog"
            ]
        }
    ]
}
