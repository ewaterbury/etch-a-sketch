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


        
//Generates Initial Grid
function generateGrid(gridSize) {
    let rowNum = 0;
    for(let i = 0; i < gridSize; i++){
        const etchContainer = document.getElementById("etchContainer");
        const etchRow = document.createElement('div');
        ++rowNum;
        etchRow.setAttribute('class', 'etchRow');
        etchRow.setAttribute('id', `Row${rowNum}`)
        etchContainer.appendChild(etchRow);
        const etchBox = document.createElement('div');
        etchBox.setAttribute('class', 'etchBox')
        etchBox.style.backgroundColor = 'white';
        for(let i = 0; i < gridSize; i++){
            etchRow.appendChild(etchBox.cloneNode(true));}
    }
    dragStylus('black');
}
generateGrid(16);

//Generate New Grid Button/Text Field
function newGrid() {
    let input = document.getElementById("gridSizeInput").value;
    if(input > 100 || input < 1 || isNaN(input)) {
        alert("Please enter a number between 1 and 100.");
        return;
    }
    let deleteRows = document.querySelectorAll("div.etchRow");
    deleteRows.forEach((deleteRow) => {deleteRow.remove();}) 
    generateGrid(input);
    dragStylus('black');
}
const gridButton = document.getElementById("gridSizeButton");
gridButton.addEventListener("click", newGrid);

//Reset Button
function resetGrid() {
    let deleteRows = document.querySelectorAll("div.etchRow");
    let length = deleteRows.length;
    deleteRows.forEach((deleteRow) => {deleteRow.remove();})
    generateGrid(length);
    dragStylus('black');
}
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGrid)

//Eraser button
function eraser() {
    removeStylus();
    const gridBoxes = document.querySelectorAll("div.etchBox");
    gridBoxes.forEach((gridBox) => {
    gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = 'white';})});
}
const eraseButton = document.getElementById("eraser");
eraseButton.addEventListener('click', eraser);

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
