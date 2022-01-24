/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function init(e) {
  try {
    document.getElementById("gum-local").style.display = "block";
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    document.getElementById("showVideo").style.display = "none";
    document.getElementById("closeVideo").style.display = "block";
    document.querySelector('.rcw-messages-container').style.height='80px'
   } catch (e) {
    handleError(e);
  }
}

function close(e) { 
  try {
    stream.getTracks().forEach(track => track.stop()); 
    document.getElementById("gum-local").style.display = "none";
    document.getElementById("showVideo").style.display = "block";
    document.getElementById("closeVideo").style.display = "none";
    document.querySelector('.rcw-messages-container').style.height='50vh'

  } catch (e) {
    handleError(e);
  }
}
console.log("dfgd"); 
/*document.getElementsByClassName("rcw-header")[0].insertAdjacentHTML("beforeend","tst");*/
document.querySelector(".rcw-header").insertAdjacentHTML("beforeend",'<div id="container" ><video id="gum-local" autoplay playsinline style="display: none;"></video><center><button id="showVideo">Open Video Chat</button><button id="closeVideo" style="display: none; width: 368px;">Close Video Chat</button></center><div id="errorMsg"></div></div>');
document.querySelector('#showVideo').addEventListener('click', e => init(e));

document.querySelector('#closeVideo').addEventListener('click', e => close(e));


/*setTimeout(function(){ document.getElementById("showVideo").click(); }, 1000);*/