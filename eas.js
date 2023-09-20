
//Standard drawing mode
function dragStylus(color) {
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = color;})
    });
}

//adds a new draw function - will finish after objects update has been completed
/*function clickStylus(color);
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener('mousemove', () => {gridBox.style.backgroundColor = color;})
    });
*/

//lets user select color from color input
        function colorDraw() {
    let colorInput = document.getElementById("color");    
    let color = colorInput.value;
    dragStylus(color);
}

//updates grid display above slider
function updateGridDisplay() {
    let currentVal = document.getElementById("myRange").value
    let gridSizeDisplay = document.getElementById("gridSizeDisplay");
    gridSizeDisplay.innerHTML = `Grid Size: ${currentVal} - ${currentVal}`;
}

//Generates Grid
function generateGrid(gridSize, rowCount) {
    ++rowCount;
    if(rowCount !== (gridSize+1)) {
        const etchContainer = document.getElementById("etchContainer");
        const etchRow = document.createElement('div');
            etchRow.setAttribute('class', 'etchRow');
            etchRow.setAttribute('id', `Row${rowCount}`);
            etchContainer.appendChild(etchRow);
        const etchBox = document.createElement('div');
            etchBox.setAttribute('class', 'etchBox')
            etchBox.style.backgroundColor = 'white';
        for(let i = 0; i < gridSize; i++){
            etchRow.appendChild(etchBox.cloneNode(true));
        }
        generateGrid(gridSize, rowCount);
    } else {
        updateGridDisplay();
        dragStylus('black');
        return;
    }
}
generateGrid(16, 0);

//Generate New Grid Button/Text Field
function newGrid() {
    let deleteRows = document.querySelectorAll("div.etchRow");
    deleteRows.forEach((deleteRow) => {deleteRow.remove();}) 
    generateGrid(input, 0);
    dragStylus('black');
}

function gridUpdate() {
    let sliderValue = Number(document.getElementById("myRange").value);
    let deleteRows = document.querySelectorAll("div.etchRow");
    deleteRows.forEach((deleteRow) => {deleteRow.remove();}) 
    generateGrid(sliderValue, 0);
    dragStylus('black');
}

const slider = document.querySelector("#myRange");
slider.addEventListener('input', gridUpdate);

//Reset Button
function resetGrid() {
    let deleteRows = document.querySelectorAll("div.etchRow");
    let length = deleteRows.length;
    deleteRows.forEach((deleteRow) => {deleteRow.remove();})
    generateGrid(length, 0);
    dragStylus('black');
}
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGrid);


//Random Button and SubFunctions
// Random integer generator
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}

//Random color generator
function randomColor ()  {
    let colA = randomInt(0,225);
    let colB = randomInt(0,225);
    let colC = randomInt(0,225);
    return 'rgb(' + colA + ',' + colB + ',' + colC + ')'
}

//removeStylus
function removeStylus() {
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        let color = `${gridBox.style.backgroundColor}`;
        gridBox.removeEventListener('mouseenter',  () => {gridBox.style.backgroundColor = color;});
    })
}

//Rainbow Stylus
function randomStylus() {
    removeStylus();
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        
        gridBox.addEventListener('mouseenter', () => {
            let color = randomColor();
            gridBox.style.backgroundColor = color;});
    })
}

const randomButton = document.getElementById("random");
randomButton.addEventListener('click', randomStylus);


//Eraser button
function eraser() {
    removeStylus();
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
    gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = 'white';})});
}
const eraseButton = document.getElementById("eraser");
eraseButton.addEventListener('click', eraser);






let colorInput = document.getElementById("color");
colorInput.addEventListener("input", colorDraw);






/*
function setAttributes(element, ...atts) {
    for (const att of atts) {
        element.setAttribute(att);
    }
}

setAttributes(etchRow, "'class', 'etchRow'", "id, `Row${rowCount}`");*/