function generateGrid(gridSize) {
    let rowNum = 0;
    for(let i = 0; i < gridSize; i++){
        const etchContainer = document.getElementById("etchContainer");
        const etchRow = document.createElement('div');
        rowNum = ++rowNum;
        etchRow.setAttribute('class', 'etchRow');
        etchRow.setAttribute('id', `Row${rowNum}`)
        etchContainer.appendChild(etchRow);
        const etchBox = document.createElement('div');
        etchBox.textContent = '\u00A0';
        etchBox.setAttribute('class', 'etchBox')
        etchBox.style.backgroundColor = 'white';
        for(let i = 0; i < gridSize; i++){etchRow.appendChild(etchBox.cloneNode(true));}
    }
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = 'black';})
    });
}

generateGrid(16);

function newGrid() {
    let input = document.getElementById("gridSizeInput").value;
    if(input > 64 || input < 4 || isNaN(input)) {
        alert("Don't be a dumbass!");
        return;
    }
    let deleteRows = document.querySelectorAll("div.etchRow");
    deleteRows.forEach((deleteRow) => {deleteRow.remove();}) 
    generateGrid(input);
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = 'black';})
    });
}

const gridButton = document.getElementById("gridSizeButton");
gridButton.addEventListener("click", newGrid);



