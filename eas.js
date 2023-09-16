//removeStylus
function removeStylus() {
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
        let color = `${gridBox.style.backgroundColor}`;
        gridBox.removeEventListener('mouseenter',  () => {gridBox.style.backgroundColor = color;});
    })
}

//Standard drawing mode
function dragStylus(color) {
    const gridBoxes = document.querySelectorAll("div.etchBox");
        gridBoxes.forEach((gridBox) => {
            gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = color;})
        });}

//let rowCount = 0; //I want to define the rowCount variable inside the below function.

function generateGrid(gridSize, rowCount) {
    ++rowCount;
    if(rowCount !== (gridSize+1)) { //this code generates a grid on webpage.
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
        generateGrid(gridSize, rowCount);//this recalls the function.
    } else {
        dragStylus('black'); // adds a function that allows you to 'draw' on the grid then stops function by changing background color.
        return;
    }
}
        
//generateGrid(16); //calls function when page is intiailly loaded.

generateGrid(16, 0);
//Generate New Grid Button/Text Field
function newGrid() {
        let input = document.getElementById("gridSizeInput").value;
        input = Number(input);
    if(input > 100 || input < 1 || isNaN(input)) {
        alert("Please enter a number between 1 and 100.");
        return;
    }
    let deleteRows = document.querySelectorAll("div.etchRow");
    deleteRows.forEach((deleteRow) => {deleteRow.remove();}) 
    //rowCount = 0;
    generateGrid(input, 0);
    dragStylus('black');
}
const gridButton = document.getElementById("gridSizeButton");
gridButton.addEventListener("click", newGrid);

//Reset Button
function resetGrid() {
    //rowCount = 0;
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

/*
function setAttributes(element, ...atts) {
    for (const att of atts) {
        element.setAttribute(att);
    }
}

setAttributes(etchRow, "'class', 'etchRow'", "id, `Row${rowCount}`");*/