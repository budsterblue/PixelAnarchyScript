// ==UserScript==
// @name           Pixel Anarchy Script
// @namespace      pixel_anarchy_script
// @description    Miscellaneous tools for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        1.4.3
// ==/UserScript==


// --Commonly used variables--
var pxScale = document.getElementById("scale");
var pxSidebar = document.getElementById("sidenav");
pxSidebar.style.color = "white";
var pxOptions = document.createElement("details");
var pxSummary = document.createElement("summary");
pxSummary.style.outline = "none";
pxSummary.innerText = "Budsterblue's Options";
pxOptions.appendChild(pxSummary);
pxSidebar.appendChild(pxOptions);
var pxOverlay = document.getElementById("overlay");
pxOverlay.crossOrigin = "anonymous";

// --Exact Overlay Scaling--
var pxWidthGroup = document.createElement("form-group");
pxWidthGroup.style.display = "block";
pxWidth = document.createElement("input");
pxWidth.type = "number";
pxWidth.style.width = "60px";
pxWidth.addEventListener('change', (event) => { pxOverlay.style.width = pxWidth.value + "px"; });
var pxHeightGroup = document.createElement("form-group");
pxHeightGroup.style.display = "block";
pxHeight = document.createElement("input");
pxHeight.type = "number";
pxHeight.style.width = "60px";
pxHeight.addEventListener('change', (event) => { pxOverlay.style.height = pxHeight.value + "px"; });

pxOptions.appendChild(document.createTextNode("\nOverlay Width & Height\n"));
pxWidthGroup.appendChild(pxWidth);
pxWidthGroup.appendChild(document.createTextNode("Width"));
pxHeightGroup.appendChild(pxHeight);
pxHeightGroup.appendChild(document.createTextNode("Height"));
pxOptions.appendChild(pxWidthGroup);
pxOptions.appendChild(pxHeightGroup);

// --Message Expander--
var pxMessagesGroup = document.createElement("form-group");
pxMessagesGroup.style.display = "block";
var pxMessages = document.getElementById("messages");
var pxMessagesInput = document.createElement("input");
pxMessagesInput.type = "number";
pxMessagesInput.style.width = "60px";
pxMessagesInput.addEventListener('change', (event) => { pxMessages.style.height = pxMessagesInput.value + "px"; });
pxMessagesGroup.appendChild(pxMessagesInput);
pxMessagesGroup.appendChild(document.createTextNode("Chat Height"));
pxOptions.appendChild(pxMessagesGroup);

// --Pixel Preview--
var pxPreviewEnabled = false;
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
// Get Current Color (thanks bs2k for solving this part of the puzzle!), then fill a square and apply it to the mouse cursor
[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
    elem.addEventListener('click',function(e){
    if (pxPreviewEnabled){
        if (e.srcElement.id == "mix"){
            var gradient = pxCtx.createLinearGradient(0, 0, 30, 0);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1 / 6, 'orange');
            gradient.addColorStop(2 / 6, 'yellow');
            gradient.addColorStop(3 / 6, 'green');
            gradient.addColorStop(4 / 6, 'blue');
            gradient.addColorStop(5 / 6, 'indigo');
            gradient.addColorStop(1, 'violet');
            pxCtx.fillStyle = gradient;
        } else{
            pxCtx.fillStyle = e.srcElement.id;
        }
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
    document.getElementById("myCanvas").style.cursor = "";
    pxPreviewEnabled = true;
    pxCtx.moveTo(2,2);
    pxCtx.lineTo(18,20);
    pxCtx.lineTo(2,26);
    pxCtx.lineTo(2,1);
    pxCtx.stroke();
    pxCtx.fill();
    pxScale.style.cursor = 'url(' + pxPreviewCanvas.toDataURL() + '), auto';
  } else {
    document.getElementById("myCanvas").style.cursor = "crosshair";
    pxPreviewEnabled = false;
    pxScale.style.cursor = "pointer";
  }
});
// Append
pxPreviewGroup.appendChild(pxPreview);
pxPreviewGroup.appendChild(document.createTextNode("Toggle Preview"));
pxOptions.appendChild(pxPreviewGroup);

// --Sidebar Toggle--
var pxSidebarOpen = true;
var pxSidebarButton = document.createElement("h2");
pxSidebarButton.innerText = "◄"
pxSidebarButton.style.position = "absolute";
pxSidebarButton.style.left = "0%";
pxSidebarButton.style.bottom = "0%";
pxSidebarButton.style.zIndex = "100";
pxSidebarButton.style.color = "white";
pxSidebarButton.style.background = "#2e2c2c";
pxSidebarButton.style.marginLeft = "0px";
pxSidebarButton.style.marginBottom = "0px";

pxSidebarButton.addEventListener('click', (event) => {
if (pxSidebarOpen) {
	pxSidebarOpen = !pxSidebarOpen;
	pxSidebar.style.width = "0%";
	pxSidebarButton.innerText = "►"
	pxSidebar.style.transition = "height, 0.1s linear";
	document.getElementsByClassName("pallete")[0].style.margin = "0px";
} else {
	pxSidebarOpen = !pxSidebarOpen;
	pxSidebar.style.width = "";
	pxSidebarButton.innerText = "◄";
	pxSidebar.style.transition = "height, 0.1s linear";
	document.getElementsByClassName("pallete")[0].style.marginLeft = "";

}
});
document.body.appendChild(pxSidebarButton);

// --Url Selector Placeholder Text--
document.getElementById("urlSelector").placeholder = "https://example.com/image.png";

// --Color Hotkeys--
pxPalleteCheckbox = document.createElement("input");
pxPalleteCheckbox.type = "checkbox";
//pxPalleteCheckbox.checked = true;
var pxPalleteGroup = document.createElement("form-group");
pxPalleteGroup.style.display = "block";

var pxPalleteIndex = 0;
window.addEventListener ("keydown", function (e) {
	if (pxPalleteCheckbox.checked) {
    		if (e.which === 122) {
			e.preventDefault();
			if (pxPalleteIndex == 0) { pxPalleteIndex = 29; }
			else { pxPalleteIndex -= 1; }
			[...document.getElementsByClassName('btnbelow')][pxPalleteIndex].click();
    		} else if (e.which == 123) {
			e.preventDefault();
			if (pxPalleteIndex == 29) { pxPalleteIndex = 0; }
			else { pxPalleteIndex += 1; }
			[...document.getElementsByClassName('btnbelow')][pxPalleteIndex].click();
		}
	}
} );

pxPalleteGroup.appendChild(pxPalleteCheckbox);
pxPalleteGroup.appendChild(document.createTextNode("Toggle Pallete Cycle"));
pxOptions.appendChild(pxPalleteGroup);

// --Grid Fix--
document.getElementsByClassName('grid')[0].src = 'https://github.com/bs2kbs2k/PAT/raw/master/grid.svg'

// --Overlay Comparison--
// Values Reference
// red = pxOverlayPixels[i]
// green = pxOverlayPixels[i+1]
// blue = pxOverlayPixels[i+2]
// alpha = pxOverlayPixels[i+3]

// Defines
/*var pxCanvas = document.getElementById("myCanvas");
var pxCanvasCtx = pxCanvas.getContext('2d');
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
