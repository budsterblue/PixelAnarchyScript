// ==UserScript==
// @name           Pixel Anarchy Image Overlay
// @namespace      pixel_anarchy_image_overlay
// @description    An Image overlay tool for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        1.1
// ==/UserScript==


// --Base Image Overlay--
var pixelCanvas = document.getElementById("scale");
var pixelSidebar = document.getElementById("sidenav");
pixelSidebar.style.color = "white";

// --Message Expander--
var pixelMessagesGroup = document.createElement("form-group");
pixelMessagesGroup.style.display = "block";
var pixelMessages = document.getElementById("messages");
var pixelMessagesInput = document.createElement("input");
pixelMessagesInput.type = "number";
pixelMessagesInput.style.width = "60px";
pixelMessagesInput.addEventListener('change', (event) => { pixelMessages.style.height = pixelMessagesInput.value + "px"; });
pixelMessagesGroup.appendChild(pixelMessagesInput);
pixelMessagesGroup.appendChild(document.createTextNode("Chat Height"));
pixelSidebar.appendChild(pixelMessagesGroup);

// --Pixel Preview--
var pixelPreviewEnabled = false;
//document.getElementById("myCanvas").style.cursor = "";
var pixelPreviewGroup = document.createElement("form-group");
pixelPreviewGroup.style.display = "block";
var pixelPreview = document.createElement("input");
pixelPreview.type = "checkbox";
// Canvas
var pixelPreviewCanvas = document.createElement("canvas");
pixelPreviewCanvas.width = 40;
pixelPreviewCanvas.height = 40;
var pixelCtx = pixelPreviewCanvas.getContext('2d');
pixelCtx.strokeStyle = "gray";
pixelCtx.lineWidth = 2;
pixelCtx.fillStyle = "#FFFFFF";
// Get Current Color (thanks bs2k for solving this part of the puzzle!), then fill a square and apply it to the mouse cursor
[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
    elem.addEventListener('click',function(e){
    if (pixelPreviewEnabled){
        if (e.srcElement.id == "mix"){
            var gradient = pixelCtx.createLinearGradient(0, 0, 30, 0);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1 / 6, 'orange');
            gradient.addColorStop(2 / 6, 'yellow');
            gradient.addColorStop(3 / 6, 'green');
            gradient.addColorStop(4 / 6, 'blue');
            gradient.addColorStop(5 / 6, 'indigo');
            gradient.addColorStop(1, 'violet');
            pixelCtx.fillStyle = gradient;
        } else{
            pixelCtx.fillStyle = e.srcElement.id;
        }
        pixelCtx.moveTo(2,2);
        pixelCtx.lineTo(18,20);
        pixelCtx.lineTo(2,26);
        pixelCtx.lineTo(2,1);
        pixelCtx.stroke();
        pixelCtx.fill();
        pixelCanvas.style.cursor = 'url(' + pixelPreviewCanvas.toDataURL() + '), auto';
    
        }
    })
})

// State
pixelPreview.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById("myCanvas").style.cursor = "";
    pixelPreviewEnabled = true;
    pixelCtx.moveTo(2,2);
    pixelCtx.lineTo(18,20);
    pixelCtx.lineTo(2,26);
    pixelCtx.lineTo(2,1);
    pixelCtx.stroke();
    pixelCtx.fill();
    pixelCanvas.style.cursor = 'url(' + pixelPreviewCanvas.toDataURL() + '), auto';
  } else {
    document.getElementById("myCanvas").style.cursor = "crosshair";
    pixelPreviewEnabled = false;
    pixelCanvas.style.cursor = "pointer";
  }
});
// Append
pixelPreviewGroup.appendChild(pixelPreview);
pixelPreviewGroup.appendChild(document.createTextNode("Toggle Preview"));
pixelSidebar.appendChild(pixelPreviewGroup);

// --Sidebar Toggle--
var pixelSidebarOpen = true;
var pixelSidebarButton = document.createElement("h2");
pixelSidebarButton.innerText = "◄"
pixelSidebarButton.style.position = "absolute";
pixelSidebarButton.style.left = "0%";
pixelSidebarButton.style.bottom = "-1.5%";
pixelSidebarButton.style.zIndex = "100";
pixelSidebarButton.style.color = "white";
pixelSidebarButton.style.background = "#2e2c2c";

pixelSidebarButton.addEventListener('click', (event) => {
if (pixelSidebarOpen) {
	pixelSidebarOpen = !pixelSidebarOpen;
	pixelSidebar.style.width = "0%";
	pixelSidebarButton.innerText = "►"
	pixelSidebar.style.transition = "height, 0.1s linear";
} else {
	pixelSidebarOpen = !pixelSidebarOpen;
	pixelSidebar.style.width = "";
	pixelSidebarButton.innerText = "◄";
	pixelSidebar.style.transition = "height, 0.1s linear";

}
});
document.body.appendChild(pixelSidebarButton);
