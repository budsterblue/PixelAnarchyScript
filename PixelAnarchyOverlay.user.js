// ==UserScript==
// @name           Pixel Anarchy Script
// @namespace      pixel_anarchy_script
// @description    Miscellaneous tools for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        1.6
// ==/UserScript==


// --Commonly used variables--
var pxScale = document.getElementById("scale");
var pxCanvas = document.getElementById("myCanvas");
var pxSidebar = document.getElementById("sidenav");
pxSidebar.style.color = "white";
var pxOptions = document.createElement("details");
var pxSummary = document.createElement("summary");
pxSummary.style.outline = "none";
pxSummary.innerText = "Budsterblue's Options";
pxOptions.appendChild(pxSummary);
pxSidebar.appendChild(pxOptions);
var pxOverlay = document.getElementById("overlay");
var pxPallete = document.getElementsByClassName('pallete')[0];

// --Script Version--
pxVersion = document.createElement("h3");
pxVersion.innerHTML = "Script Version: " + GM.info.script.version;
pxVersion.style.position = "absolute";
pxVersion.style.bottom = 0;
pxVersion.style.marginLeft = "5px";
pxSidebar.appendChild(pxVersion);

// --Exact Overlay Scaling--
var pxAreaGroup = document.createElement("form-group");
pxAreaGroup.style.display = "block";
// Width
pxWidth = document.createElement("input");
pxWidth.type = "number";
pxWidth.style.width = "60px";
pxWidth.placeholder = "W";
pxWidth.addEventListener('change', (event) => { pxOverlay.style.width = pxWidth.value + "px"; });
// Height
pxHeight = document.createElement("input");
pxHeight.type = "number";
pxHeight.style.width = "60px";
pxHeight.style.marginLeft = "2px";
pxHeight.placeholder = "H";
pxHeight.addEventListener('change', (event) => { pxOverlay.style.height = pxHeight.value + "px"; });

pxOptions.appendChild(document.createTextNode("Overlay Width & Height"));
pxAreaGroup.appendChild(pxWidth);
pxAreaGroup.appendChild(pxHeight);
pxOptions.appendChild(pxAreaGroup);

// --Message Expander--
var pxMessagesGroup = document.createElement("form-group");
pxMessagesGroup.style.display = "block";
var pxMessages = document.getElementById("messages");
var pxMessagesInput = document.createElement("input");
pxMessagesInput.type = "number";
pxMessagesInput.style.width = "60px";
pxMessagesInput.style.marginTop = "5px";
pxMessagesInput.addEventListener('change', (event) => { pxMessages.style.height = pxMessagesInput.value + "px"; });
pxMessagesGroup.appendChild(pxMessagesInput);
pxMessagesGroup.appendChild(document.createTextNode("Chat Height"));
pxOptions.appendChild(pxMessagesGroup);

// --Pixel Preview--
//var pxPreviewEnabled = true;
var pxPreviewGroup = document.createElement("form-group");
pxPreviewGroup.style.display = "block";
var pxPreview = document.createElement("input");
pxPreview.type = "checkbox";
pxPreview.checked = true;
// Canvas
var pxPreviewCanvas = document.createElement("canvas");
pxPreviewCanvas.width = 40;
pxPreviewCanvas.height = 40;
var pxCtx = pxPreviewCanvas.getContext('2d');
pxCtx.strokeStyle = "gray";
pxCtx.lineWidth = 2;
pxCtx.fillStyle = "#FFFFFF";
// First Run
pxCanvas.style.cursor = "";
pxCtx.moveTo(2,2);
pxCtx.lineTo(18,20);
pxCtx.lineTo(2,26);
pxCtx.lineTo(2,1);
pxCtx.stroke();
pxCtx.fill();
pxScale.style.cursor = 'url(' + pxPreviewCanvas.toDataURL() + '), auto';

// Get Current Color (thanks bs2k for solving this part of the puzzle!), then fill a square and apply it to the mouse cursor
[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
    elem.addEventListener('click',function(e){
	pxCtx.fillStyle = e.srcElement.id;
    	if (pxPreview.checked) {
        	pxCtx.moveTo(2,2);
        	pxCtx.lineTo(18,20);
        	pxCtx.lineTo(2,26);
        	pxCtx.lineTo(2,1);
        	pxCtx.stroke();
        	pxCtx.fill();
        	pxScale.style.cursor = 'url(' + pxPreviewCanvas.toDataURL() + '), auto'; 
    	}
    })
})

// State
pxPreview.addEventListener('change', (event) => {
  if (event.target.checked) {
    pxCanvas.style.cursor = "";
    pxCtx.moveTo(2,2);
    pxCtx.lineTo(18,20);
    pxCtx.lineTo(2,26);
    pxCtx.lineTo(2,1);
    pxCtx.stroke();
    pxCtx.fill();
    pxScale.style.cursor = 'url(' + pxPreviewCanvas.toDataURL() + '), auto';
  } else {
    pxCanvas.style.cursor = "crosshair";
    pxScale.style.cursor = "pointer";
  }
});
// Append
pxPreviewGroup.appendChild(pxPreview);
pxPreviewGroup.appendChild(document.createTextNode("Toggle Preview"));
pxOptions.appendChild(pxPreviewGroup);

// --Sidebar Toggle (adapted from bs2k's implementation)--
// Style Additions
pxSidebar.style.transition = "all 1s";
pxPallete.style.transition = "all 1s";
// Div
pxSidebarButton = document.createElement("div");
pxSidebarButton.style.width = "250px";
pxSidebarButton.style.height = "50px";
pxSidebarButton.style.top = "0";
pxSidebarButton.style.left = "0";
pxSidebarButton.style.bottom = "0";
pxSidebarButton.style.transition = "all 1s";
pxSidebarButton.style.overflow = "visible";
pxSidebarButton.style.margin = "auto";
pxSidebarButton.style.position = "absolute";
document.getElementsByClassName("game")[0].appendChild(pxSidebarButton);
// Svg
pxSidebarSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
pxSidebarSvg.setAttribute("width", "15");
pxSidebarSvg.setAttribute("height", "50");
pxSidebarSvg.style.float = "right";
pxSidebarSvg.style.color = "gray";
pxSidebarSvg.style.position = "relative";
pxSidebarSvg.style.left = "15px";
pxSidebarSvg.style.zIndex = "999";
pxSidebarButton.appendChild(pxSidebarSvg);
// Rect 1
var pxSidebarRect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
pxSidebarRect1.setAttribute("width", "15");
pxSidebarRect1.setAttribute("height", "50");
pxSidebarRect1.style.fill = "#2e2c2c";
pxSidebarRect1.style.rx = "5";
pxSidebarRect1.style.ry = "5";
pxSidebarSvg.appendChild(pxSidebarRect1);
// Rect 2
var pxSidebarRect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
pxSidebarRect2.setAttribute("x", "0");
pxSidebarRect2.setAttribute("y", "-10");
pxSidebarRect2.setAttribute("width", "10");
pxSidebarRect2.setAttribute("height", "100");
pxSidebarRect2.style.fill = "#2e2c2c";
pxSidebarRect2.style.rx = "5";
pxSidebarRect2.style.ry = "5";
pxSidebarSvg.appendChild(pxSidebarRect2);
// Triangle
pxSidebarTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
pxSidebarTriangle.setAttribute("points", "10,20 10,30 4,25");
pxSidebarTriangle.style.fill = "#fff";
pxSidebarSvg.appendChild(pxSidebarTriangle);
// Logic
window.sidebarShown = true;
pxSidebarSvg.addEventListener('click',function(e){
  if(window.sidebarShown){
    pxSidebar.style.left = "-250px";
    pxPallete.style["margin-left"] = "0";
    pxSidebarButton.style.left = "-250px";
    pxSidebarTriangle.setAttribute("points", "4,20 4,30 10,25");
    window.sidebarShown = false;
  } else {
    pxSidebar.style.left = "0";
    pxPallete.style["margin-left"] = "250px";
    pxSidebarButton.style.left = "0";
    pxSidebarTriangle.setAttribute("points", "10,20 10,30 4,25");
    window.sidebarShown = true;
  }
});

// --Url Selector Placeholder Text--
document.getElementById("urlSelector").placeholder = "https://example.com/image.png";

// --Color Hotkeys--
pxPalleteCheckbox = document.createElement("input");
pxPalleteCheckbox.type = "checkbox";
pxPalleteCheckbox.checked = true;
var pxPalleteGroup = document.createElement("form-group");
pxPalleteGroup.style.display = "block";

var pxPalleteIndex = 0;
window.addEventListener ("keydown", function (e) {
	if (pxPalleteCheckbox.checked) {
    		if (e.which === 122) {
			e.preventDefault();
			if (pxPalleteIndex == 0) { pxPalleteIndex = 28; }
			else { pxPalleteIndex -= 1; }
			[...document.getElementsByClassName('btnbelow')][pxPalleteIndex].click();
    		} else if (e.which == 123) {
			e.preventDefault();
			if (pxPalleteIndex == 28) { pxPalleteIndex = 0; }
			else { pxPalleteIndex += 1; }
			[...document.getElementsByClassName('btnbelow')][pxPalleteIndex].click();
		}
	}
} );

pxPalleteGroup.appendChild(pxPalleteCheckbox);
pxPalleteGroup.appendChild(document.createTextNode("Toggle Pallete Cycle"));
pxOptions.appendChild(pxPalleteGroup);

// --Grid Fix--
//document.getElementsByClassName('grid')[0].src = 'https://github.com/bs2kbs2k/PAT/raw/master/grid.svg'

// --Opacity Fade In-Out--
pxOpacityCheckbox = document.createElement("input");
pxOpacityCheckbox.type = "checkbox";
var pxOpacityGroup = document.createElement("form-group");
pxOpacityGroup.style.display = "block";

var opacityState = true;
function opacityFade() {
        if (opacityState) { pxOverlay.style.opacity = "0.3"; opacityState = false; }
        else { pxOverlay.style.opacity = "0.8"; opacityState = true; }
}

var pxOverlayInterval = "";
pxOpacityCheckbox.addEventListener('change', (event) => {
        if (event.target.checked){
                pxOverlay.style.transition = "opacity, 1s linear";
                pxOverlayInterval = setInterval(opacityFade, 1200);
        }
        else {
                pxOverlay.style.transition = "";
                clearInterval(pxOverlayInterval);
        }
});

pxOpacityGroup.appendChild(pxOpacityCheckbox);
pxOpacityGroup.appendChild(document.createTextNode("Toggle Opacity Fade"));
pxOptions.appendChild(pxOpacityGroup);

// --Overlay Comparison WIP--
// Values Reference
// red = pxOverlayPixels[i]
// green = pxOverlayPixels[i+1]
// blue = pxOverlayPixels[i+2]
// alpha = pxOverlayPixels[i+3]

// Defines
/*var pxCanvasCtx = pxCanvas.getContext('2d');
var pxOverlayCanvas = document.createElement("canvas");
pxOverlayCanvas.width = pxCanvas.width;
pxOverlayCanvas.height = pxCanvas.height;
var pxOverlayCtx = pxOverlayCanvas.getContext('2d');
var pxWarningImg = new Image();
pxWarningImg.src = "https://upload.wikimedia.org/wikipedia/commons/f/fb/Exclamation_mark_2.svg";

pxCompareButton = document.createElement("button");
pxCompareButton.addEventListener ("click", function () {
	// Canvas
	var pxCanvasData = pxCanvasCtx.getImageData(0, 0, pxCanvas.width, pxCanvas.height);
	var pxCanvasPixels = pxCanvasData.data;
	// Overlay
	pxOverlayCtx.drawImage(pxOverlay, document.getElementById("offsetX").value, document.getElementById("offsetY").value);
	var pxOverlayData = pxOverlayCtx.getImageData(0, 0, pxOverlayCanvas.width, pxOverlayCanvas.height);
	var pxOverlayPixels = pxOverlayData.data;

	// Compare
	var pxPixelsNotEqual = [];
	for (var i = 0; i < pxOverlayPixels.length; i += 4) {
		var pxEqual = true;
		for (var j = 0; j < 4; j++){
			if (i == 12){
				console.log([pxOverlayPixels[i], pxOverlayPixels[i+1], pxOverlayPixels[i+2], pxOverlayPixels[i+3]]);
			}
			if ( pxOverlayPixels[i+j] != pxCanvasPixels[i+j]){
				pxEqual = false;
			}	
		}
		if (!pxEqual){
			if (i != 0) {
				pxPixelsNotEqual.push(i/4);
			} else { pxPixelsNotEqual.push(i); }
		}
	}
	var pxArr = [];
	pxPixelsNotEqual.forEach(pixel => pxArr.push( (pixel % pxCanvas.width) + "," + Math.floor(pixel / pxCanvas.width)));
	console.log(pxArr);
	pxPixelsNotEqual.forEach(pixel => pxOverlayCtx.drawImage(pxWarningImg, (pixel % pxCanvas.width), Math.floor(pixel / pxCanvas.width)));
	//pxOverlayCtx.drawImage(pxWarningImg, pxWarningX, pxWarningY, 1, 1);
	//pxOverlayCanvas.putImageData( id, x, y );
});

// Appends
pxOptions.appendChild(pxCompareButton);*/
