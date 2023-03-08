var grids = 16;
var gridContainer = document.querySelector(".grid-container");
var mouseDown = 0;
var colorInput = document.querySelector(".color-input");

window.addEventListener("mousedown", ()=>{
    mouseDown = 1;
    console.log(mouseDown);
});

window.addEventListener("mouseup", ()=>{
    mouseDown = 0;
    console.log(mouseDown);
});

function addGrids(grids) {
    for (var i = 0; i < grids*grids; i++) {
        var grid = document.createElement("div");
        gridContainer.appendChild(grid);
        grid.classList.add("grid");
    }
    gridContainer.style.gridTemplateColumns = `repeat(${grids} , 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${grids} , 1fr)`;
}

addGrids(32);

var slider = document.querySelector(".slider");
var sizeIndicator = document.querySelector(".size-indicator");

slider.oninput = sizeChanged;

function sizeChanged () {
    while (gridContainer.lastChild.id !== 'reset') {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    sizeIndicator.innerHTML = `${slider.value} x ${slider.value}`;
    addGrids(slider.value);
}