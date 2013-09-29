"use strict";

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
  	id: 'home',
    width: 902,
    height: 500,
    minWidth: 900,
    minHeight: 500,
    frame: 'none'
  });
});