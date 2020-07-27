// ==UserScript==
// @name           Pixel Anarchy Script
// @namespace      pixel_anarchy_script
// @description    Miscellaneous tools for the site Pixel Anarchy Online
// @author 	   Budsterblue
// @match          *://pixelanarchy.online/*
// @version        1.13
// ==/UserScript==

//TODO: Save/Load Settings and Finish Pixel Comparison

// --Commonly used variables--
var pxScale = document.getElementById("scale");
var pxCanvas = document.getElementById("myCanvas");
var pxSidebar = document.getElementById("sidenav");
var pxOptions = document.createElement("details");
pxOptions.style.color = "lightblue";
pxSidebar.children[0].insertBefore(pxOptions, document.getElementById("logout"));
var pxSummary = document.createElement("summary");
pxSummary.style.outline = "none";
pxSummary.innerText = "Budsterblue's Options";
pxOptions.appendChild(pxSummary);
var pxOverlay = document.getElementById("overlay");
pxOverlay.style.visibility = "hidden";
var pxPalette = document.getElementsByClassName('pallete')[0];
var pxMessages = document.getElementById("messages");

// --Script Version--
var pxVersion = document.createElement("h3");
pxVersion.innerHTML = "Script Version: " + GM.info.script.version;
pxVersion.style.color = "white";
pxVersion.style.position = "absolute";
pxVersion.style.bottom = 0;
pxVersion.style.marginLeft = "5px";
pxSidebar.appendChild(pxVersion);


// Script Deprecation Info
if (window.localStorage.getItem("pxDeprecation") === null) {
	window.localStorage.setItem("pxDeprecation", "rip");
	var pxFirst = false;

	var pxSecondObserver = new MutationObserver(function (mutations, me) {
  		if (pxFirst) {
			Notiflix.Report.Warning('Please Read! (Page 2)', "Without being able to develop my script, I really have no reason to be here anymore as I've never been good at art and I just wanted to make it easier on the people who could actually make good art. Farewell, It's been a wild ride! (note: this message will only show once as to not annoy you) --Budsterblue", 'Continue');
    			me.disconnect();
    			return;
  		}
	});

	pxSecondObserver.observe(document, {
  		childList: true,
  		subtree: true
	});

	Notiflix.Report.Warning('Please Read! (Page 1)',"Due to the site owner (Lex's) change of stance regarding scripts, I will no longer be developing this script and will be leaving the community. For now, it seems that this script still works, but if Lex decides to block it, I'm not going to waste the effort trying to bypass the block.",'Page 2', function() { pxFirst = true; });	
}

// Controls Info
// The way I'm getting this variable is stupid...
var pxControls = document.getElementById("id03").children[0].children[1].children[0];
// Palette
var pxControlsPalette = document.createElement("li");
pxControlsPalette.style.color = "blue";
pxControlsPalette.innerHTML = "Press F11 and F12 to cycle forward and backward through the color palette at the bottom of the screen.";
pxControls.insertBefore(pxControlsPalette, pxControls.children[9]);
// Overlay Toggle
var pxControlsOverlayToggle = document.createElement("li");
pxControlsOverlayToggle.innerHTML = "Press F10 to toggle between showing and hiding the overlay.";
pxControlsOverlayToggle.style.color = "blue";
pxControls.insertBefore(pxControlsOverlayToggle, pxControls.children[9]);
// Overlay Position
var pxControlsOverlayPosition = document.createElement("li");
pxControlsOverlayPosition.innerHTML = "Press F9 to position the overlay at your cursor.";
pxControlsOverlayPosition.style.color = "blue";
pxControls.insertBefore(pxControlsOverlayPosition, pxControls.children[9]);
// Blue Color Tip
// Header
var pxControlsTipHeader = document.createElement("h2");
pxControlsTipHeader.style.color = "blue";
pxControlsTipHeader.innerHTML = "Blue Colored Text";
pxControls.insertBefore(pxControlsTipHeader, pxControls.children[13]);
// Body
var pxControlsTip = document.createElement("p");
pxControlsTip.style.color = "blue";
pxControlsTip.innerHTML = "You can tell what stuff is a part of my (budsterblue's) script by seeing if it's using blue text.<br>This applies to the side bar (excluding chat) and this info screen, and may apply to more places in the future.";
pxControls.insertBefore(pxControlsTip, pxControls.children[14]);

// --Options--
// Toggles Category
var pxOptionsToggles = document.createElement("details");
pxOptionsToggles.style.marginTop = "5px";
pxOptionsToggles.style.marginBottom = "5px";
pxOptions.appendChild(pxOptionsToggles);
var pxSummaryToggles = document.createElement("summary");
pxSummaryToggles.style.outline = "none";
pxSummaryToggles.innerText = "Toggles";
pxOptionsToggles.appendChild(pxSummaryToggles);
// Pixel Preview
var pxPreview = document.createElement("input");
pxOptionsToggles.appendChild(pxPreview);
pxOptionsToggles.append("Preview");
pxOptionsToggles.appendChild(document.createElement("br")); // Line Break
// Keybinds
var pxPaletteCheckbox = document.createElement("input");
pxOptionsToggles.appendChild(pxPaletteCheckbox);
pxOptionsToggles.append("Keybinds");
pxOptionsToggles.appendChild(document.createElement("br")); // Line Break
// Opacity Fade
var pxOpacityCheckbox = document.createElement("input");
pxOptionsToggles.appendChild(pxOpacityCheckbox);
pxOptionsToggles.append("Opacity Fade");
pxOptionsToggles.appendChild(document.createElement("br")); // Line Break
// Right Click Palette
var pxPaletteHoverCheckbox = document.createElement("input");
pxPaletteHoverCheckbox.type = "checkbox";
pxPaletteHoverCheckbox.checked = false;
pxOptionsToggles.appendChild(pxPaletteHoverCheckbox);
pxOptionsToggles.append("Right Click Palette");
// Advanced Options Category
var pxOptionsAdvanced = document.createElement("details");
pxOptions.appendChild(pxOptionsAdvanced);
var pxSummaryAdvanced = document.createElement("summary");
pxSummaryAdvanced.style.outline = "none";
pxSummaryAdvanced.innerText = "ADVANCED (Avoid)";
pxOptionsAdvanced.appendChild(pxSummaryAdvanced);
// Width & Height
var pxHeight = document.createElement("input");
pxOptionsAdvanced.appendChild(pxHeight);
pxOptionsAdvanced.append("Overlay Height");
pxOptionsAdvanced.appendChild(document.createElement("br")); // Line Break
// End Options
pxSidebar.children[0].insertBefore(document.createElement("br"), document.getElementById("logout"));

// --Exact Overlay Scaling--
// Height
pxHeight.type = "number";
pxHeight.style.width = "60px";
pxHeight.style.marginLeft = "2px";
pxHeight.placeholder = "H";
pxHeight.addEventListener('change', (event) => { pxOverlay.style.height = pxHeight.value + "px"; });

// --Chat Height--
pxMessages.style.marginBottom = "0px";
var pxResizer = document.createElement('div');
// Styling
pxResizer.style.width = "100%";
pxResizer.style.height = "2px";
pxResizer.style.marginBottom = "10px";
pxResizer.style.background = "gray";
pxResizer.style.position = "relative";
pxResizer.style.cursor = "n-resize";
pxSidebar.children[0].insertBefore(pxResizer, document.getElementById("chat"));
// Functions
pxResizer.addEventListener('mousedown', pxInitResize, false);
function pxInitResize(e) {
   window.addEventListener('mousemove', pxResize, false);
   window.addEventListener('mouseup', pxStopResize, false);
}
function pxResize(e) {
   pxMessages.style.height = (e.clientY - pxMessages.offsetTop) + 'px';
}
function pxStopResize(e) {
    window.removeEventListener('mousemove', pxResize, false);
    window.removeEventListener('mouseup', pxStopResize, false);
}

// --Pixel Preview--
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
pxCanvas.style.cursor = "";

// Function
function pxPreviewFunction() {
	pxCtx.moveTo(2,2);
        pxCtx.lineTo(18,20);
        pxCtx.lineTo(2,26);
        pxCtx.lineTo(2,1);
        pxCtx.stroke();
        pxCtx.fill();
        pxScale.style.cursor = 'url(' + pxPreviewCanvas.toDataURL() + '), auto';
}
// First Run
pxPreviewFunction();

// Get Current Color (thanks bs2k for solving this part of the puzzle!), then fill a square and apply it to the mouse cursor
[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
    elem.addEventListener('click',function(e){
	[...pxPaletteHover.children].forEach(function(el){ el.style.border = "2px solid gray"; });
	document.getElementById("px" + e.target.id).style.border = "4px solid gray";
	pxCtx.fillStyle = e.target.id;
    	if (pxPreview.checked) {
        	pxPreviewFunction();
    	}
    })
})

// State
pxPreview.addEventListener('change', (event) => {
  if (event.target.checked) {
    pxCanvas.style.cursor = "";
    pxPreviewFunction();
  } else {
    pxCanvas.style.cursor = "crosshair";
    pxScale.style.cursor = "pointer";
  }
});

// --Sidebar Toggle Arrow--
var pxSidebarToggle = document.getElementById("toggle");
pxSidebarToggle.children[2].setAttribute("points", "18,20 18,30 8,25");
pxSidebarToggle.addEventListener('click',function(e){
  if(window.sidebarShown){
	  pxSidebarToggle.children[2].setAttribute("points", "18,20 18,30 8,25");
  } else {
	  pxSidebarToggle.children[2].setAttribute("points", "8,20 8,30 18,25");
  }
});

// --Url Selector Placeholder Text--
document.getElementById("urlSelector").placeholder = "https://example.com/image.png";

// --Color Hotkeys--
// Styling
pxPaletteCheckbox.type = "checkbox";
pxPaletteCheckbox.checked = true;
// Logic
var pxPaletteIndex = 0;
window.addEventListener ("keydown", function (e) {
	if (pxPaletteCheckbox.checked) {
    		if (e.which === 122) {
			e.preventDefault();
			pxPaletteHover.children[pxPaletteIndex].style.border = "2px solid gray"
			if (pxPaletteIndex == 0) { pxPaletteIndex = 28; }
			else { pxPaletteIndex -= 1; }
			[...document.getElementsByClassName('btnbelow')][pxPaletteIndex].click();
			pxPaletteHover.children[pxPaletteIndex].style.border = "4px solid gray"
    		} else if (e.which == 123) {
			e.preventDefault();
			pxPaletteHover.children[pxPaletteIndex].style.border = "2px solid gray"
			if (pxPaletteIndex == 28) { pxPaletteIndex = 0; }
			else { pxPaletteIndex += 1; }
			[...document.getElementsByClassName('btnbelow')][pxPaletteIndex].click();
			pxPaletteHover.children[pxPaletteIndex].style.border = "4px solid gray"
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
// --Overlay At Cursor--
        	if (e.which == 120) {
                	var pxCursorX, pxCursorY;
                	[,,pxCursorX,,,pxCursorY] = document.getElementById("coords").innerText.split(" ");
	                // X
        	        document.getElementById("offsetX").value = pxCursorX;
	                document.getElementById("offsetX").dispatchEvent(new Event('change'))
        	        // Y
                	document.getElementById("offsetY").value = pxCursorY;
	                document.getElementById("offsetY").dispatchEvent(new Event('change'))
        	}
	}
} );

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
pxOpacityCheckbox.type = "checkbox";
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
			if (document.getElementById("textbrush2").children[0].innerHTML.includes("1")) {
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

// --Fix Sidebar Spacing--
//document.getElementById("godview").appendChild(document.querySelector("#sidenav > center > br:nth-child(16)"));
//document.getElementById("gobacc").appendChild(document.querySelector("#sidenav > center > br:nth-child(17)"));

// --Scale Slider Replace--
var pxWidth = document.createElement("input");
pxWidth.addEventListener('change', (event) => { pxOverlay.style.width = pxWidth.value + "px"; });
pxWidth.type = "number";
pxWidth.style.color = "blue";
document.getElementById("scaleImg").style.display = "none";
document.getElementById("scaleImg").parentElement.insertBefore(pxWidth, document.getElementById("scaleImg"));
// Modified Text
document.getElementById("textscale").children[0].innerHTML += "<span style='color:lightblue'> (modified by script)</span>";

// --Stop Palette Sound--
document.addEventListener('loadstart', function(e){
    if (e.target.currentSrc == "https://pixelanarchy.online/notif.mp3") {
        e.target.pause();
    }
}, true);

// --Mouse-Attached Palette--
var pxPaletteHover = document.createElement("div");
pxPaletteHover.style.transition = "";
pxPaletteHover.style.position = "absolute";
pxPaletteHover.style.background = "#1B1B1B";
pxPaletteHover.style.border = "3px solid #1B1B1B"
pxPaletteHover.style.width = "144px";
pxPaletteHover.style.overflow = "auto";
pxPaletteHover.style.display == "none"
document.body.appendChild(pxPaletteHover);

// Function
document.addEventListener('contextmenu', function(ev) {
	ev.preventDefault()
	if (pxPaletteHoverCheckbox.checked){
	        if (pxPaletteHover.style.display == "none") {
        	        pxPaletteHover.style.display = "initial";
	                pxPaletteHover.style.transform = 'translateY('+(ev.clientY-80)+'px)';
        	        pxPaletteHover.style.transform += 'translateX('+(ev.clientX+20)+'px)';
	        }
        	else { pxPaletteHover.style.display = "none"; }
	}

}, false);


//document.addEventListener('mousemove', function(ev){
//    pxPaletteHover.style.transform = 'translateY('+(ev.clientY-80)+'px)';
//    pxPaletteHover.style.transform += 'translateX('+(ev.clientX+20)+'px)';            
//},false);

[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
	var pxPaletteColor = document.createElement("div");
	pxPaletteColor.style.width = "20px"
	pxPaletteColor.style.height = "20px"
	pxPaletteColor.style.margin = "2px";
	pxPaletteColor.style.border = "2px solid gray";
	pxPaletteColor.style.display = "inline-block";
	pxPaletteColor.style.background = elem.id;
	pxPaletteColor.id = "px" + elem.id;
	pxPaletteColor.addEventListener('click', function(e){
		[...pxPaletteHover.children].forEach(function(el){ el.style.border = "2px solid gray"; });
        	e.target.style.border = "4px solid gray";
		document.getElementById(e.target.id.substring(2)).click();
	});
	pxPaletteHover.appendChild(pxPaletteColor);
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
