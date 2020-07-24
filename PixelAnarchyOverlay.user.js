// ==UserScript==
// @name           Pixel Anarchy Script
// @namespace      pixel_anarchy_script
// @description    Miscellaneous tools for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        1.9.1
// ==/UserScript==

//TODO: Save/Load Settings and Finish Pixel Comparison

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
pxOverlay.style.visibility = "hidden";
var pxPallete = document.getElementsByClassName('pallete')[0];

// --Script Version--
var pxVersion = document.createElement("h3");
pxVersion.innerHTML = "Script Version: " + GM.info.script.version;
pxVersion.style.position = "absolute";
pxVersion.style.bottom = 0;
pxVersion.style.marginLeft = "5px";
pxSidebar.appendChild(pxVersion);

// --Exact Overlay Scaling--
var pxAreaGroup = document.createElement("form-group");
pxAreaGroup.style.display = "block";
// Width
var pxWidth = document.createElement("input");
pxWidth.type = "number";
pxWidth.style.width = "60px";
pxWidth.placeholder = "W";
pxWidth.addEventListener('change', (event) => { pxOverlay.style.width = pxWidth.value + "px"; });
// Height
var pxHeight = document.createElement("input");
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

// --Sidebar Toggle Arrow--
var pxSidebarToggle = document.getElementById("toggle");
pxSidebarToggle.childNodes[5].setAttribute("points", "18,20 18,30 8,25");
pxSidebarToggle.addEventListener('click',function(e){
  if(window.sidebarShown){
	  pxSidebarToggle.childNodes[5].setAttribute("points", "18,20 18,30 8,25");
  } else {
	  pxSidebarToggle.childNodes[5].setAttribute("points", "8,20 8,30 18,25");
  }
});

// --Url Selector Placeholder Text--
document.getElementById("urlSelector").placeholder = "https://example.com/image.png";

// --Color Hotkeys--
// Defines
var pxPalleteCheckbox = document.createElement("input");
pxPalleteCheckbox.type = "checkbox";
pxPalleteCheckbox.checked = true;
var pxPalleteGroup = document.createElement("form-group");
pxPalleteGroup.style.display = "block";
// Logic
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
// --Overlay Toggle Hotkey--
		else if (e.which == 121) {
			if(pxOverlay.style.visibility == "hidden"){
				document.getElementById("overlaybutton").checked = true;
				pxOverlay.style.visibility = "visible";
			} else {
				document.getElementById("overlaybutton").checked = false;
                                pxOverlay.style.visibility = "hidden";
			}
		}
	}
} );
// Appends
pxPalleteGroup.appendChild(pxPalleteCheckbox);
pxPalleteGroup.appendChild(document.createTextNode("Toggle Keybinds"));
pxOptions.appendChild(pxPalleteGroup);

// --Grid Fix--
var pxGridObserver = new MutationObserver(function (mutations, me) {
  var grid = document.getElementsByClassName("grid")[0];
  if (grid) {
    grid.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NzYwIiBoZWlnaHQ9IjMyNDAiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEgMCBMIDAgMCAwIDEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ3JheSIgc3Ryb2tlLXdpZHRoPSIwLjA2MjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4";
    me.disconnect();
    return;
  }
});

pxGridObserver.observe(document, {
  childList: true,
  subtree: true
});

// --Opacity Fade In-Out--
var pxOpacityCheckbox = document.createElement("input");
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

// --King Of Chats Blocker--
window.addEventListener("load", function () { 
	if (document.getElementById("brushsize2").style.display == "block"){
        	document.getElementById("chatking").childNodes[0].style.display = "none";
	}
});

// --Brush Size Indicator--
window.addEventListener("load", function () {
        if (document.getElementById("brushsize2").style.display == "block"){
		var pxBrushSizeIndicator = document.createElement("h2");
		pxBrushSizeIndicator.style.position = "relative";
		pxBrushSizeIndicator.style.float = "right";
		pxBrushSizeIndicator.style.marginTop = "0px";
		pxBrushSizeIndicator.style.marginRight = "0.6%";
		pxBrushSizeIndicator.style.display = "inline-block";
		pxBrushSizeIndicator.style.color = "rgb(0, 255, 255)";
		pxBrushSizeIndicator.style.background = "rgb(0, 0, 0, 0.7)";
		pxBrushSizeIndicator.style.padding = "8px";
		pxBrushSizeIndicator.style.borderRadius = "25px";
		pxBrushSizeIndicator.innerHTML = "1x1";
		// Slider
		document.getElementById("brushsize2").addEventListener("change", function () { 
			if (document.getElementById("textbrush2").childNodes[0].innerHTML.includes("1")) {
				pxBrushSizeIndicator.innerHTML = "1x1";
			} else {
				pxBrushSizeIndicator.innerHTML = "2x2";
			}
		});
		// Keybinds
		window.addEventListener ("keydown", function (e) {
			if (e.which == 49){
				pxBrushSizeIndicator.innerHTML = "1x1";
			} else if (e.which == 50) {
				pxBrushSizeIndicator.innerHTML = "2x2";
			}
		});
		document.body.appendChild(pxBrushSizeIndicator);
	}
});

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
//var pxWarningImg = new Image();
//pxWarningImg.src = "https://upload.wikimedia.org/wikipedia/commons/f/fb/Exclamation_mark_2.svg";
pxWarningSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
pxWarningSvg.setAttribute("width", pxOverlay.width);
pxWarningSvg.setAttribute("height", pxOverlay.height);
pxWarningSvg.style.position = "relative";
pxWarningSvg.style.left =  document.getElementById("offsetX").value + "px";
pxWarningSvg.style.top = document.getElementById("offsetY").value -3240 + "px";
pxWarningSvg.style.zIndex = "999";

//pxSidebarButton.appendChild(pxSidebarSvg);
pxCompareButton = document.createElement("button");
pxCompareButton.innerHTML = "Game Crasher (don't touch)";
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
	var pxOverlayStr = "";
	//pxPixelsNotEqual.forEach(pixel => pxArr.push( (pixel % pxCanvas.width) + "," + Math.floor(pixel / pxCanvas.width)));
	//console.log(pxArr);
	//for (var pixel in pxPixelsNotEqual){
	pxPixelsNotEqual.forEach(pixel => 
		pxOverlayStr += `<circle cx='` + (pixel % pxCanvas.width) + `' cy='` + Math.floor(pixel / pxCanvas.width) + `' r='3' stroke='black' stroke-width='1' fill='#FF0000' />`
	);
		//pxOverlayCtx.drawImage(pxWarningImg, (pixel % pxCanvas.width), Math.floor(pixel / pxCanvas.width), 2, 2)
		//var rect = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        	//rect.setAttributeNS(null, 'cx', x);
        	//rect.setAttributeNS(null, 'cy', y);
	        //rect.setAttributeNS(null, 'r', "3");
        	//rect.setAttributeNS(null, 'stroke', "black");
	        //rect.setAttributeNS(null, 'stroke-width', "1");
        	//rect.setAttributeNS(null, 'fill', '#FF0000');
        	//pxWarningSvg.appendChild(rect);
	//}
	//console.log(pxOverlayStr)
	pxWarningSvg.innerHTML = pxOverlayStr;

});

// Appends
pxOptions.appendChild(pxCompareButton);
pxScale.appendChild(pxWarningSvg);*/

// --Import/Export/Save/Load Settings--
// Save
// for reference, to get all items in localstorage use: const items = { ...localStorage }; or JSON.stringify(localStorage);
/*var pxStorage = window.localStorage;
// Overlay Button
var pxStorageOverlayButton = document.createElement("button");
pxStorageOverlayButton.innerHTML = "Overlay Toggle";
pxStorageOverlayButton.addEventListener ("click", function () { pxStorage.setItem( "overlaybutton", document.getElementById("overlaybutton").checked ) } );
pxOptions.appendChild(pxStorageOverlayButton);
// Overlay Source
var pxStorageOverlaySource = document.createElement("button");
pxStorageOverlaySource.innerHTML = "Overlay Source";
pxStorageOverlaySource.addEventListener ("click", function () { pxStorage.setItem( "overlaybutton", document.getElementById("overlaybutton").checked ) } );
pxOptions.appendChild(pxStorageOverlaySource);*/
