//Main Object for Webpage
const etch = {

    grid: {

        //Generates Grid
        generateGrid (gridSize, rowCount) {
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
                for(let i = 0; i < gridSize; i++) {
                    etchRow.appendChild(etchBox.cloneNode(true));
                }
                this.generateGrid(gridSize, rowCount);
            } else {
                this.updateGridDisplay();
                const drawModeButton = document.getElementById("drawModeButton");
                if (drawModeButton.hasAttribute("percision")) {
                    etch.draw.percisionStylus('black');
                } else {
                    etch.draw.dragStylus('black');
                }
                return;
            }
        },

        //Resets Grid - Called by Reset Grid Button
        resetGrid() {
            let deleteRows = document.querySelectorAll("div.etchRow");
            let length = deleteRows.length;
            deleteRows.forEach((deleteRow) => {deleteRow.remove();})
            etch.grid.generateGrid(length, 0);
            etch.draw.dragStylus('black');
        },

        //Updates Slider Display from Slider Input
        updateGridDisplay() {
            let currentVal = document.getElementById("myRange").value
            let gridSizeDisplay = document.getElementById("gridSizeDisplay");
            gridSizeDisplay.innerHTML = `Grid Size: ${currentVal} x ${currentVal}`;
        },

        //Updates Grid from Slider Input
        gridUpdate() {
            let sliderValue = Number(document.getElementById("myRange").value);
            let deleteRows = document.querySelectorAll("div.etchRow");
            deleteRows.forEach((deleteRow) => {deleteRow.remove();}) 
            etch.grid.generateGrid(sliderValue, 0);
            etch.draw.dragStylus('black');
        },

    },

    //Functions that Impact Drawing
    draw: {

        //Standard drawing mode
        dragStylus(color) {
            etch.draw.removeStylus();
            const drawModeButton = document.getElementById("drawModeButton");
            drawModeButton.setAttribute("name", "drag");
            console.log(drawModeButton);
            const gridBoxes = document.querySelectorAll("div.etchBox");
            gridBoxes.forEach((gridBox) => {
                gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = color;
                });
            });
        },
        
        //Percision drawing mode - called by drawmode button
        percisionStylus(color){
            etch.draw.removeStylus();
            const drawModeButton = document.getElementById("drawModeButton");
            const drawField = document.getElementById("outerEtchContainer");
            drawModeButton.setAttribute("name", "percision");
            let mouseDown = 0;
            console.log(drawModeButton);
            drawField.onmousedown = function() {
                mouseDown = true;
                console.log(mouseDown);
            }
            drawField.onmouseup = function() {
                mouseDown = false;
                console.log(mouseDown);
            }
            const gridBoxes = document.querySelectorAll("div.etchBox");
            gridBoxes.forEach((gridBox) => {
                gridBox.addEventListener('mouseover',() => {
                    if(mouseDown === true) {
                        console.log(mouseDown);
                        gridBox.style.backgroundColor = color;
                    };
                });
            });
        },


        //Removes Stylus - helper function
        removeStylus() {
            const gridBoxes = document.querySelectorAll("div.etchBox");
            gridBoxes.forEach((gridBox) => {
                let color = `${gridBox.style.backgroundColor}`;
                gridBox.removeEventListener('mouseenter',  () => {gridBox.style.backgroundColor = color;});
            })
        },

        //lets user select color from color input
        colorDraw() {
            let colorInput = document.getElementById("myColor");    
            let color = colorInput.value;
            etch.draw.dragStylus(color);
        },

        //Eraser button
        eraser() {
            etch.draw.removeStylus();
            const gridBoxes = document.querySelectorAll("div.etchBox");
            gridBoxes.forEach((gridBox) => {
            gridBox.addEventListener('mouseenter', () => {gridBox.style.backgroundColor = 'white';})});
        },

        random: {

            // Random integer generator
            randomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max-min) + min);
            },

            //Random color generator
            randomColor() {
                let colA = etch.draw.random.randomInt(0,225);
                let colB = etch.draw.random.randomInt(0,225);
                let colC = etch.draw.random.randomInt(0,225);
                return 'rgb(' + colA + ',' + colB + ',' + colC + ')'
            },

            //Rainbow Stylus
            randomStylus() {
                etch.draw.removeStylus();
                const gridBoxes = document.querySelectorAll("div.etchBox");
                gridBoxes.forEach((gridBox) => {
                    gridBox.addEventListener('mouseenter', () => {
                        let color = etch.draw.random.randomColor();
                        gridBox.style.backgroundColor = color;
                    });
                });
            },
        },
    },
}

function initial() {

    //Event Listener For Drawmode
    const drawModeButton = document.getElementById("drawModeButton");
    drawModeButton.addEventListener('click', etch.draw.percisionStylus);

    //Event Listener For Color Drawing
    let colorInput = document.getElementById("myColor");
    colorInput.addEventListener("input", etch.draw.colorDraw);

    //Event Listener For Random Stylus
    const randomButton = document.getElementById("random");
    randomButton.addEventListener('click', etch.draw.random.randomStylus);

    //Event Listener for Eraser Button
    const eraseButton = document.getElementById("eraser");
    eraseButton.addEventListener('click', etch.draw.eraser);

    //Event Listener For Reset Button
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", etch.grid.resetGrid);

    //Event Listener For Grid Size Slider
    const slider = document.querySelector("#myRange");
    slider.addEventListener('input', etch.grid.gridUpdate);

    //Calls Initial 16x16 Grid Generation
    etch.grid.generateGrid(16, 0);
}

initial();

/*
function setAttributes(element, ...atts) {
    for (const att of atts) {
        element.setAttribute(att);
    }
}

setAttributes(etchRow, "'class', 'etchRow'", "id, `Row${rowCount}`");*/