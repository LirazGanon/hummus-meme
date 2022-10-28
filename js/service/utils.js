
'use strict'
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((max - min) * Math.random() + min);
}

function getPageWidth() {
  console.log(document.documentElement.clientWidth)
    return Math.max(
      // document.body.offsetWidth,
      // document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }