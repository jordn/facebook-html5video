"use strict";

console.log('Converting Facebook Flash videos to HTML5');

function convertVideos() {
  var embeds = document.getElementsByTagName('embed');

  for (var i = embeds.length - 1; i >= 0; i--) {
  
    if (embeds[i].type = "application/x-shockwave-flash") {
      var flashVideo = embeds[i];
      var flashVars = flashVideo.attributes['flashvars'].value;
      var decodedVars = decodeURIComponent(flashVars);

      // Hidden in the vars is the URL for HD mp4 video source.
      var n = decodedVars.match(/\"hd_src\":\"([^\"]+)\",/i);
      var hdSrcUrl = n[1].split("\\").join(""); 

      var video = document.createElement('video');
      video.src = hdSrcUrl;
      video.controls = true;
      video.style.width = "100%";
      
      // Facebook has a super-deep, crazy DOM Structure. 
      // Go up to the same level of play button overlay (hopefully).
      var container = flashVideo.parentNode.parentNode.parentNode.parentNode;

      // Make the HTML5 video the only child node
      while( container.hasChildNodes() ){
        container.removeChild(container.lastChild);
      }
      container.appendChild(video);
    }
  };
}

setInterval(convertVideos, 3000);