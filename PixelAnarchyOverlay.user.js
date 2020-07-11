// ==UserScript==
// @name           Pixel Anarchy Image Overlay
// @namespace      pixel_anarchy_image_overlay
// @description    An Image overlay tool for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        0.7
// ==/UserScript==


// --Base Image Overlay--
var pixelOpacity = 0.75;
var pixelCanvas = document.getElementById("scale");
var pixelImg = document.createElement('img');
// Styling
pixelImg.style.position = "relative";
pixelImg.style.top = "-3240px";
pixelImg.style.left = "0px";
pixelImg.style.opacity = pixelOpacity;
pixelImg.style.pointerEvents = "none";
pixelImg.style.visibility = "hidden";
// Add Image and Append
pixelImg.src = 'https://cdn.discordapp.com/attachments/716027937262010410/731069722161971250/canvas.png';
pixelCanvas.appendChild(pixelImg);

var pixelSidebar = document.getElementById("sidenav");
var pixelCheckbox = document.createElement("input");
pixelCheckbox.type = "checkbox";
// State
pixelCheckbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    pixelImg.style.visibility = "visible";
  } else {
    pixelImg.style.visibility = "hidden";
  }
});
// Append
pixelSidebar.appendChild(pixelCheckbox);
pixelSidebar.appendChild(document.createTextNode("Toggle Overlay"));

// --Update Image--
var pixelTextInput = document.createElement("input");
pixelTextInput.type = "text";
var pixelButton = document.createElement("button");
pixelButton.innerText = "Update Image";
// State
pixelButton.addEventListener('click', (event) => { pixelImg.src = pixelTextInput.value; });
pixelSidebar.appendChild(pixelTextInput);
pixelSidebar.appendChild(pixelButton);

// --Opacity Slider--
var pixelRangeSlider = document.createElement("input");
pixelRangeSlider.type = "range";
pixelRangeSlider.min = 0;
pixelRangeSlider.max = 99;
pixelRangeSlider.value = pixelOpacity;
pixelRangeSlider.addEventListener('input', (event) => { pixelImg.style.opacity = (100 - pixelRangeSlider.value) / 100; });
pixelSidebar.appendChild(pixelRangeSlider);
pixelSidebar.appendChild(document.createTextNode("Change Opacity"));

// --Change Offset--
pixelOffsetX = document.createElement("input");
pixelOffsetX.type = "number";
pixelOffsetY = document.createElement("input");
pixelOffsetY.type = "number";
pixelOffsetX.addEventListener('change', (event) => { pixelImg.style.left = pixelOffsetX.value + "px"; });
pixelOffsetY.addEventListener('change', (event) => { pixelImg.style.top = (pixelOffsetY.value -3240) + "px"; });
pixelSidebar.appendChild(pixelOffsetX);
pixelSidebar.appendChild(document.createTextNode("X Offset"));
pixelSidebar.appendChild(pixelOffsetY);
pixelSidebar.appendChild(document.createTextNode("Y Offset"));

// --Scale--
pixelWidth = document.createElement("input");
pixelWidth.type = "number";
pixelWidth.addEventListener('change', (event) => { pixelImg.style.width = pixelWidth.value + "px"; });
pixelHeight = document.createElement("input");
pixelHeight.type = "number";
pixelHeight.addEventListener('change', (event) => { pixelImg.style.height = pixelHeight.value + "px"; });

pixelSidebar.appendChild(document.createTextNode("\nUse only one for scaling"))
pixelSidebar.appendChild(pixelWidth);
pixelSidebar.appendChild(document.createTextNode("Width"));
pixelSidebar.appendChild(pixelHeight);
pixelSidebar.appendChild(document.createTextNode("Height"));
