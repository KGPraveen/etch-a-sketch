var gridContainer = document.querySelector(".grid-container");
var mouseDown = false;
var colorInput = document.querySelector(".color-input");
var backgroundColor = document.querySelector(".bgcolor-input").value;
var rainbowButton = document.querySelector(".rainbow-button");
var pickerButton = document.querySelector(".picker-button");
var shaderButton = document.querySelector(".shading-button");
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
    while (gridContainer.lastChild.id !== 'reset') {
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

function mouseOnGrid(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = colorInput.value;
}

var clickAudio = document.querySelector('.click-sound');
var buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach(button => button.addEventListener('mousedown', playAudio));
function playAudio() {
    clickAudio.currentTime = 0;
    clickAudio.play();
}

function reset() {
    backgroundColor = document.querySelector(".bgcolor-input").value;
    if(!grids) return;
    grids = Array.from(document.querySelectorAll(".grid"));
    grids.forEach(grid => {
        grid.style.backgroundColor = backgroundColor;
    });
}

function rainbow(e) {

    if(isPicker) picker();
    if(isShader) shader();

    if(isRainbow) {
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

    if(isShader) shader();
    if(isRainbow) rainbow();

    if(isPicker) {
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

    if(isPicker) picker();
    if(isRainbow) rainbow();

    if(isShader) {
        isShader = false;
        shaderButton.classList.remove("toggle");
        console.log("Shader: " + isShader);
        return;
    }
    isShader = true;
    shaderButton.classList.add("toggle");
    console.log("Shader: " + isShader);
}