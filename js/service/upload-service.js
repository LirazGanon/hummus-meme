'use strict'


function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")// Gets the canvas content as an image format
  
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
      // Encode the instance of certain characters in the url
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      console.log(encodedUploadedImgUrl)
      document.querySelector('.user-msg').innerHTML = `Your photo is available here:<br> ${uploadedImgUrl}`
      // Create a link that on click will make a post in facebook with the image we uploaded
      document.querySelector('.share-container').innerHTML = `
          <a class="fb-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
             Share on Facebook   
          </a>`
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
  }
  
  function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
  
    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
      // If the request is not done, we have no business here yet, so return
      if (XHR.readyState !== XMLHttpRequest.DONE) return
      // if the response is not ok, show an error
      if (XHR.status !== 200) return console.error('Error uploading image')
      const { responseText: url } = XHR
      // Same as:
      // const url = XHR.responseText
  
      // If the response is ok, call the onSuccess callback function, 
      // that will create the link to facebook using the url we got
      console.log('Got back live url:', url)
      onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
      console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
  }