var gridContainer = document.querySelector(".grid-container");
var mouseDown = false;
var colorInputIndicator = document.querySelector(".color-input");
var backgroundColor = document.querySelector(".bgcolor-input").value;
var rainbowButton = document.querySelector(".rainbow-button");
var pickerButton = document.querySelector(".picker-button");
var shaderButton = document.querySelector(".shading-button");
var eraserButton = document.querySelector(".eraser-button");
var resetButton = document.querySelector(".reset-button");
var red;
var blue;
var green;
var isEraser = false;
var isRainbow = false;
var isPicker = false;
var isShader = false;


// rainbowButton.addEventListener("click", () => isRainbow = true);
// shadingButton.addEventListener("click", () => isShader = true);
// pickerButton.addEventListener("click", () => isPicker = true);

// console.log(isPicker);
// console.log(isRainbow);
// console.log(isShader);

window.addEventListener("mousedown", () => {
    mouseDown = true;
    // console.log(mouseDown);
});

window.addEventListener("mouseup", () => {
    mouseDown = false;
    // console.log(mouseDown);
});

function addGrids(grids) {
    for (var i = 0; i < grids * grids; i++) {
        var grid = document.createElement("div");
        gridContainer.appendChild(grid);
        grid.classList.add("grid");
        grid.style.backgroundColor = backgroundColor;
    }
    gridContainer.style.gridTemplateColumns = `repeat(${grids} , 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${grids} , 1fr)`;
}

var slider = document.querySelector(".slider");
var sizeIndicator = document.querySelector(".size-indicator");

slider.oninput = sizeChanged;

function sizeChanged() {
    backgroundColor = document.querySelector(".bgcolor-input").value;
    while (gridContainer.lastChild.id !== 'reset' && gridContainer.lastChild.id !== 'eraser') {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    sizeIndicator.innerHTML = `${slider.value} x ${slider.value}`;
    addGrids(slider.value);
}

var grids = Array.from(document.querySelectorAll(".grid"));


function sliderClick(e) {
    grids = Array.from(document.querySelectorAll(".grid"));
    grids.forEach(grid => {
        grid.addEventListener("mouseover", mouseOnGrid)
        grid.addEventListener("mousedown", mouseOnGrid)
    });
}


// THIS IS WHERE THE COLOR TO DRAW IS CHOSEN!! ================================================================================ THIS IS WHERE THE COLOR TO DRAW IS CHOSEN!!


function mouseOnGrid(e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    if (isEraser) {
        e.target.style.backgroundColor = backgroundColor;
    } else if (isPicker) {
        var gridColor = e.target.style.backgroundColor;

        var colorsOnly = gridColor.substring(gridColor.indexOf('(') + 1, gridColor.lastIndexOf(')')).split(/,\s*/);
        
        //----------------------------------- parseInt to avoid string assignments
        red = parseInt(colorsOnly[0]);
        green = parseInt(colorsOnly[1]);
        blue = parseInt(colorsOnly[2]);
        //---------------------------------------------------------------------------

        //----------------------------------- needs to be a string, i.e. "#ffffff" and not #ffffff.
        colorInputIndicator.value = rgbToHex(red, green, blue).toString();
        //-------------------------------------------------------------------------------------------

        picker();  //Turns off picker once it's used.

        //OKAY, SO HERE IS WHAT HAPPENED:
        // In var colorsOnly = gridColor.substring(gridColor.indexOf('(') + 1, gridColor.lastIndexOf(')')).split(/,\s*/);
        //gridColor.substring(gridColor.indexOf('(') + 1, >>>> Gets values after "rgb("
        //gridColor.lastIndexOf(')')).split(/,\s*/); >>>>> Gets values before the last ')'.
        //The regex "/,\s*/" splits by ',' and eliminates any whitespaces, so that when the string "rgb(130, 23, 217)"
        //becomes a substring, it becomes "130,23,217", instead of "130, 23, 217".
        //Then last but not the least, the ending substring is split into array elements divided by ','
        //hence, red=130; blue=23; and green=217; as they are array elements [0] [1] and [2] respectively.
    } else if(isRainbow) {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = rgbToHex(red, green, blue);

    } else if(isShader) {

        var gridColor = e.target.style.backgroundColor;
        var colorsOnly = gridColor.substring(gridColor.indexOf('(') + 1, gridColor.lastIndexOf(')')).split(/,\s*/);
        
        //----------------------------------- parseInt to avoid string assignments
        red = parseInt(colorsOnly[0]);
        red = red - (red * (10/100) );
        green = parseInt(colorsOnly[1]);
        green = green - (green * (10/100) );
        blue = parseInt(colorsOnly[2]);
        blue = blue - (blue * (10/100) );

        console.log(`rgb(${red}, ${green}, ${blue})`);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
    else {
        e.target.style.backgroundColor = colorInputIndicator.value;
    }
}

var clickAudio = document.querySelector('.click-sound');

    clickAudio.currentTime = 0;
    clickAudio.play();


function reset() {
    clickAudio.currentTime = 0;
    clickAudio.play();

    backgroundColor = document.querySelector(".bgcolor-input").value;
    if (!grids) return;
    grids = Array.from(document.querySelectorAll(".grid"));
    grids.forEach(grid => {
        grid.style.backgroundColor = backgroundColor;
    });
}

function eraser(e) {

    clickAudio.currentTime = 0;
    clickAudio.play();

    if (isRainbow) rainbow();
    if (isPicker) picker();
    if (isShader) shader();

    if (isEraser) {
        isEraser = false;
        eraserButton.classList.remove("toggle");
        console.log("Eraser: " + isEraser);
        return;
    }
    isEraser = true;
    eraserButton.classList.add("toggle");
    console.log("Eraser: " + isEraser);
}

function rainbow(e) {

    clickAudio.currentTime = 0;
    clickAudio.play();

    if (isEraser) eraser();
    if (isPicker) picker();
    if (isShader) shader();

    if (isRainbow) {
        isRainbow = false;
        rainbowButton.classList.remove("toggle");
        console.log("Rainbow: " + isRainbow);
        return;
    }
    isRainbow = true;
    rainbowButton.classList.add("toggle");
    console.log("Rainbow: " + isRainbow);
}

function picker(e) {

    clickAudio.currentTime = 0;
    clickAudio.play();

    if (isEraser) eraser();
    if (isShader) shader();
    if (isRainbow) rainbow();

    if (isPicker) {
        isPicker = false;
        pickerButton.classList.remove("toggle");
        console.log("Picker: " + isPicker);
        return;
    }
    isPicker = true;
    pickerButton.classList.add("toggle");
    console.log("Picker: " + isPicker);
}

function shader(e) {

    clickAudio.currentTime = 0;
    clickAudio.play();

    if (isEraser) eraser();
    if (isPicker) picker();
    if (isRainbow) rainbow();

    if (isShader) {
        isShader = false;
        shaderButton.classList.remove("toggle");
        console.log("Shader: " + isShader);
        return;
    }
    isShader = true;
    shaderButton.classList.add("toggle");s
    console.log("Shader: " + isShader);
}

window.addEventListener("keydown", shortcut);

function shortcut(e) {
    if(e.keyCode === 69) {
        eraser();
    } else if(e.keyCode === 82) {
        resetButton.classList.add("toggle");
        //========================================================================================================
        setTimeout(() => {
            resetButton.classList.remove("toggle");
          }, 100);
        // THIS IS MY LAZY WAY OF ENABLING TOGGLE CLASSLIST FOR RESET BUTTON WITHOUT DOING IT THE "NORMAL" WAY====
        reset();
    } else if(e.keyCode === 81) {
        picker();
    } else if(e.keyCode === 84) {
        shader();
    } else return;
}


// OTHER FUNCTIONS ----------------------------------------------------------------

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}