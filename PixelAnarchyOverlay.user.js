// ==UserScript==
// @name           Pixel Anarchy Image Overlay
// @namespace      pixel_anarchy_image_overlay
// @description    An Image overlay tool for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        0.10
// ==/UserScript==


// --Base Image Overlay--
var pixelOpacity = 0.75;
var pixelCanvas = document.getElementById("scale");
var pixelImg = document.createElement("img");
var pixelSidebar = document.getElementById("sidenav");
pixelSidebar.style.color = "white";
// Styling
pixelImg.style.position = "relative";
pixelImg.style.top = "-3240px";
pixelImg.style.left = "0px";
pixelImg.style.opacity = pixelOpacity;
pixelImg.style.pointerEvents = "none";
pixelImg.style.visibility = "hidden";
pixelImg.style.imageRendering = "pixelated";
// Add Image and Append
pixelImg.src = 'https://cdn.discordapp.com/attachments/716027937262010410/731069722161971250/canvas.png';
pixelCanvas.appendChild(pixelImg);

var pixelCheckboxGroup = document.createElement("form-group");
pixelCheckboxGroup.style.display = "block";
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
pixelCheckboxGroup.appendChild(pixelCheckbox);
pixelCheckboxGroup.appendChild(document.createTextNode("Toggle Overlay"));
pixelSidebar.appendChild(pixelCheckboxGroup);

// --Update Image--
var pixelTextInputGroup = document.createElement("form-group");
pixelTextInputGroup.style.display = "block";
var pixelTextInput = document.createElement("input");
pixelTextInput.type = "text";
var pixelButton = document.createElement("button");
pixelButton.innerText = "Update Image";
// State
pixelButton.addEventListener('click', (event) => { pixelImg.src = pixelTextInput.value; });
pixelTextInputGroup.appendChild(pixelTextInput);
pixelTextInputGroup.appendChild(pixelButton);
pixelSidebar.appendChild(pixelTextInputGroup);

// --Opacity Slider--
var pixelRangeSliderGroup = document.createElement("form-group");
pixelRangeSliderGroup.style.display = "block";
var pixelRangeSlider = document.createElement("input");
pixelRangeSlider.type = "range";
pixelRangeSlider.min = 0;
pixelRangeSlider.max = 99;
pixelRangeSlider.value = pixelOpacity;
pixelRangeSlider.addEventListener('input', (event) => { pixelImg.style.opacity = (100 - pixelRangeSlider.value) / 100; });
pixelRangeSliderGroup.appendChild(pixelRangeSlider);
pixelRangeSliderGroup.appendChild(document.createTextNode("Change Opacity"));
pixelSidebar.appendChild(pixelRangeSliderGroup);

// --Change Offset--
var pixelOffsetXGroup = document.createElement("form-group");
pixelOffsetXGroup.style.display = "block";
pixelOffsetX = document.createElement("input");
pixelOffsetX.type = "number";
pixelOffsetX.style.width = "60px";
var pixelOffsetYGroup = document.createElement("form-group");
pixelOffsetYGroup.style.display = "block";
pixelOffsetY = document.createElement("input");
pixelOffsetY.type = "number";
pixelOffsetY.style.width = "60px";
pixelOffsetX.addEventListener('change', (event) => { pixelImg.style.left = pixelOffsetX.value + "px"; });
pixelOffsetY.addEventListener('change', (event) => { pixelImg.style.top = (pixelOffsetY.value -3240) + "px"; });
pixelOffsetXGroup.appendChild(pixelOffsetX);
pixelOffsetXGroup.appendChild(document.createTextNode("X Offset"));
pixelOffsetYGroup.appendChild(pixelOffsetY);
pixelOffsetYGroup.appendChild(document.createTextNode("Y Offset"));
pixelSidebar.appendChild(pixelOffsetXGroup);
pixelSidebar.appendChild(pixelOffsetYGroup);

// --Scale--
var pixelWidthGroup = document.createElement("form-group");
pixelWidthGroup.style.display = "block";
pixelWidth = document.createElement("input");
pixelWidth.type = "number";
pixelWidth.style.width = "60px";
pixelWidth.addEventListener('change', (event) => { pixelImg.style.width = pixelWidth.value + "px"; });
var pixelHeightGroup = document.createElement("form-group");
pixelHeightGroup.style.display = "block";
pixelHeight = document.createElement("input");
pixelHeight.type = "number";
pixelHeight.style.width = "60px";
pixelHeight.addEventListener('change', (event) => { pixelImg.style.height = pixelHeight.value + "px"; });

pixelSidebar.appendChild(document.createTextNode("\nFor Scaling, Only Use Width.\n"));
pixelWidthGroup.appendChild(pixelWidth);
pixelWidthGroup.appendChild(document.createTextNode("Width"));
pixelHeightGroup.appendChild(pixelHeight);
pixelHeightGroup.appendChild(document.createTextNode("Height"));
pixelSidebar.appendChild(pixelWidthGroup);
pixelSidebar.appendChild(pixelHeightGroup);

// --Message Expander--
var pixelMessagesGroup = document.createElement("form-group");
pixelMessagesGroup.style.display = "block";
pixelMessages = document.getElementById("messages");
pixelMessagesInput = document.createElement("input");
pixelMessagesInput.type = "number";
pixelMessagesInput.style.width = "60px";
pixelMessagesInput.addEventListener('change', (event) => { pixelMessages.style.height = pixelMessagesInput.value + "px"; });
pixelMessagesGroup.appendChild(pixelMessagesInput);
pixelMessagesGroup.appendChild(document.createTextNode("Chat Height"));
pixelSidebar.appendChild(pixelMessagesGroup);
