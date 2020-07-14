// ==UserScript==
// @name           Pixel Anarchy Script
// @namespace      pixel_anarchy_image_overlay
// @description    Miscellaneous tools for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        1.4
// ==/UserScript==


// --Commonly used variables--
var pixelCanvas = document.getElementById("scale");
var pixelSidebar = document.getElementById("sidenav");
pixelSidebar.style.color = "white";
var pixelOptions = document.createElement("details");
var pixelSummary = document.createElement("summary");
pixelSummary.style.outline = "none";
pixelSummary.innerText = "Budsterblue's Options";
pixelOptions.appendChild(pixelSummary);
pixelSidebar.appendChild(pixelOptions);
var pixelOverlay = document.getElementById("overlay");

// --Exact Overlay Scaling--
var pixelWidthGroup = document.createElement("form-group");
pixelWidthGroup.style.display = "block";
pixelWidth = document.createElement("input");
pixelWidth.type = "number";
pixelWidth.style.width = "60px";
pixelWidth.addEventListener('change', (event) => { pixelOverlay.style.width = pixelWidth.value + "px"; });
var pixelHeightGroup = document.createElement("form-group");
pixelHeightGroup.style.display = "block";
pixelHeight = document.createElement("input");
pixelHeight.type = "number";
pixelHeight.style.width = "60px";
pixelHeight.addEventListener('change', (event) => { pixelOverlay.style.height = pixelHeight.value + "px"; });

pixelOptions.appendChild(document.createTextNode("\nOverlay Width & Height\n"));
pixelWidthGroup.appendChild(pixelWidth);
pixelWidthGroup.appendChild(document.createTextNode("Width"));
pixelHeightGroup.appendChild(pixelHeight);
pixelHeightGroup.appendChild(document.createTextNode("Height"));
pixelOptions.appendChild(pixelWidthGroup);
pixelOptions.appendChild(pixelHeightGroup);

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
pixelOptions.appendChild(pixelMessagesGroup);

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
pixelOptions.appendChild(pixelPreviewGroup);

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
	document.getElementsByClassName("pallete")[0].style.margin = "0px";
} else {
	pixelSidebarOpen = !pixelSidebarOpen;
	pixelSidebar.style.width = "";
	pixelSidebarButton.innerText = "◄";
	pixelSidebar.style.transition = "height, 0.1s linear";
	document.getElementsByClassName("pallete")[0].style.marginLeft = "";

}
});
document.body.appendChild(pixelSidebarButton);

// --Url Selector Placeholder Text--
document.getElementById("urlSelector").placeholder = "https://example.com/image.png";

// --Color Hotkeys--
pixelPalleteCheckbox = document.createElement("input");
pixelPalleteCheckbox.type = "checkbox";
pixelPalleteCheckbox.checked = true;
var pixelPalleteGroup = document.createElement("form-group");
pixelPalleteGroup.style.display = "block";

var pixelPalleteIndex = 0;
window.addEventListener ("keydown", function (e) {
	if (pixelPalleteCheckbox.checked) {
    		e.preventDefault();
    		if (e.which === 122) {
			if (pixelPalleteIndex == 0) { pixelPalleteIndex = 29; }
			else { pixelPalleteIndex -= 1; }
    		} else if (e.which == 123) {
			if (pixelPalleteIndex == 29) { pixelPalleteIndex = 0; }
			else { pixelPalleteIndex += 1; }
		}
    		[...document.getElementsByClassName('btnbelow')][pixelPalleteIndex].click();
	}
} );

pixelPalleteGroup.appendChild(pixelPalleteCheckbox);
pixelPalleteGroup.appendChild(document.createTextNode("Toggle Pallete Cycle"));
pixelOptions.appendChild(pixelPalleteGroup);

