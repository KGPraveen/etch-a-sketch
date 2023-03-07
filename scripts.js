var grids = 16;
var gridContainer = document.querySelector(".grid-container");

function addGrids(grids) {
    for (var i = 0; i < grids*grids; i++) {
        var grid = document.createElement("div");
        gridContainer.appendChild(grid);
        grid.classList.add("grid");
    }
    gridContainer.style.gridTemplateColumns = `repeat(${grids} , 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${grids} , 1fr)`;
}

addGrids(16);