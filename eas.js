function toDoList(...toDos){
    for(toDo of toDos) {
        alert(toDo);
    }
}
//toDoList("add styling functionality to buttons", "add semenatic HTMLtags","add promise", "optimize code", "make it look fancy-er");

const etch = {

    grid: {
        //Generates etch grid
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
                this.updateGridDisplay();//if shit gets weird add back return;
            }
        },

        //Updates slider display from slider input
        updateGridDisplay() {
            let value = document.getElementById("myRange").value
            let gridSizeDisplay = document.getElementById("gridSizeDisplay");
            gridSizeDisplay.innerHTML = `Grid Size: ${value} x ${value}`;
        },

        //Resets Grid - Called by reset button
        resetGrid() {
            const gridBox = document.querySelector("div.etchBox");
            let color = gridBox.dataset.color;
            let etchRows = document.querySelectorAll("div.etchRow");
            let length = etchRows.length;
            etchRows.forEach((etchRow) => {etchRow.remove();})
            etch.grid.generateGrid(length, 0);
            etch.draw.addStylus(color);
        },

        //Updates Grid using Slider Input
        gridUpdate() {
            let sliderInput = Number(document.getElementById("myRange").value);
            let deleteRows = document.querySelectorAll("div.etchRow");
            const gridBox = document.querySelector("div.etchBox");
            let color = gridBox.dataset.color;
            deleteRows.forEach((deleteRow) => {
                deleteRow.remove();
            }) 
            etch.grid.generateGrid(sliderInput, 0);
            etch.draw.addStylus(color);
        },

        //Called to generate the initial grid
        initialGrid(gridSize = 16, rowCount = 0) {
            let color = 'black';
            etch.grid.generateGrid(gridSize, rowCount);
            etch.draw.addStylus(color);
            etch.buttons.colorOn();
        },

    },

    //Functions that Impact Drawing
    draw: {
        addStylus(color) {
            etch.draw.colorAssign(color);
            const drawModeButton = document.getElementById("drawModeButton");
            const gridBoxes = document.querySelectorAll("div.etchBox");
            if(drawModeButton.dataset.status === "percision") {
                gridBoxes.forEach((gridBox) => {
                    gridBox.addEventListener('mousemove', etch.draw.percisionStylus);
                });
            } else {
                drawModeButton.dataset.status = "drag";
                gridBoxes.forEach((gridBox) => {
                    gridBox.addEventListener('mouseenter', etch.draw.dragStylus);
                });
            }
            etch.styling.addStyleBox();
        },

        //Assigns Color to Gridboxes as data-attribute - helper function for addStylus
        colorAssign(color){
            const gridBoxes = document.querySelectorAll("div.etchBox");
            gridBoxes.forEach((gridBox) => {
                gridBox.dataset.color = color;
            });
        },
        
        dragStylus(){
            const colorButton = document.getElementById("colorButton");
            const randomButton = document.getElementById("randomButton");
            const eraseButton = document.getElementById("eraserButton");
            if(colorButton.dataset.status === "on"){
                this.style.backgroundColor = this.dataset.color;
            } else if(randomButton.dataset.status === "on"){
                let randomColor = etch.random.randomColor();
                this.style.backgroundColor = randomColor;
            } else if(eraseButton.dataset.status === "on") {
                this.style.backgroundColor = "white";}
        },

        percisionStylus(){
            const drawField = document.getElementById("contentContainer");
            const colorButton = document.getElementById("colorButton");
            const randomButton = document.getElementById("randomButton");
            const eraseButton = document.getElementById("eraserButton");
            drawField.onmousedown = function() {
                drawField.dataset.mouse = "mouseDown";
            }
            drawField.onmouseup = function() {
                drawField.dataset.mouse = "mouseUp";
            }
            drawField.addEventListener('mouseleave', (e) => {
                drawField.dataset.mouse = "mouseOff";
                e.stopPropagation();
            });
            if (drawField.dataset.mouse === "mouseDown" && colorButton.dataset.status === "on") {
                this.style.backgroundColor = this.dataset.color;
            } else if(drawField.dataset.mouse === "mouseDown" && randomButton.dataset.status === "on") {
                this.style.backgroundColor = etch.random.randomColor();
            }  else if(drawField.dataset.mouse === "mouseDown" && eraseButton.dataset.status === "on") {   
                this.style.backgroundColor = "white";
            }
        },

        updateDrawmode() {
            const drawModeButton = document.getElementById("drawModeButton");
            const gridBox = document.querySelector("div.etchBox");
            let color = gridBox.dataset.color;
            etch.draw.removeStylus();
            if (drawModeButton.dataset.status === "percision") {
                drawModeButton.dataset.status = "drag";
                etch.draw.addStylus(color);
            } else if (drawModeButton.dataset.status === "drag") {
                drawModeButton.dataset.status = "percision";
                etch.draw.addStylus(color);
            }
        },

        //Removes Stylus Event Listeners - Helper Function for UpdateDrawmode()
        removeStylus() {
            const gridBoxes = document.querySelectorAll("div.etchBox");
            const drawModeButton = document.getElementById("drawModeButton");
            if(drawModeButton.dataset.status === "percision") {
                gridBoxes.forEach((gridBox) => {
                    gridBox.removeEventListener('mousemove', etch.draw.percisionStylus)
                });
            } else {
                gridBoxes.forEach((gridBox) => {
                    gridBox.removeEventListener('mouseenter', etch.draw.dragStylus)
                });
            };
        },

        colorSelect() {
            let colorInput = document.getElementById("myColor");    
            let color = colorInput.value;
            etch.draw.addStylus(color);
        },
    },


    buttons: {
        colorOn() {
            const colorButton = document.getElementById("colorButton");
            etch.buttons.otherButtonsOff(colorButton);
        },

        //RandomButton
        randomOn() {
            const randomButton = document.getElementById("randomButton");
            etch.buttons.otherButtonsOff(randomButton);
        },

        //Eraser button
        eraserOn() {
            const eraseButton = document.getElementById("eraserButton");
            etch.buttons.otherButtonsOff(eraseButton);
        },

        //Helper to turn off non-selected style buttons
        otherButtonsOff(currentButton) {
            styleButtons = document.querySelectorAll(".styleButton");
            styleButtons.forEach((styleButton) => {
                styleButton.dataset.status =  "off";
            });
            currentButton.dataset.status =  "on";
        },
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
            let colA = etch.random.randomInt(0,225);
            let colB = etch.random.randomInt(0,225);
            let colC = etch.random.randomInt(0,225);
            return 'rgb(' + colA + ',' + colB + ',' + colC + ')'
        },
    },

    styling: {
        addStyleBox(){
            const etchBoxes = document.querySelectorAll(".etchBox")
            etchBoxes.forEach((etchBox) => {
                etchBox.addEventListener('mouseover', etch.styling.styleBoxOn);
                etchBox.addEventListener('mouseout', etch.styling.styleBoxOff);
            });
        },
            
        styleBoxOn(){
            const randomButton = document.getElementById("randomButton");
            const eraseButton = document.getElementById("eraserButton");
            if(randomButton.dataset.status === "on" || eraseButton.dataset.status === "on"){
                this.style.border = `1px solid black`;
            } else {
                this.style.border = `1px solid ${this.dataset.color}`;
            }
        },
            
        styleBoxOff(){
            this.style.border = "1px solid white";
        },
    },
}




    //Event Listener For Drawmode
    const drawModeButton = document.getElementById("drawModeButton");
    drawModeButton.addEventListener('click', etch.draw.updateDrawmode);

    //Event Listener For Color Drawing
    const colorInput = document.getElementById("myColor");
    colorInput.addEventListener("input", etch.draw.colorSelect);
    
    //Event Listener to turn color button on
    const colorButton = document.getElementById("colorButton")
    colorButton.addEventListener('click', etch.buttons.colorOn)

    //Event Listener to turn random button on
    const randomButton = document.getElementById("randomButton");
    randomButton.addEventListener('click', etch.buttons.randomOn);

    //Event Listener to turn eraser button on
    const eraseButton = document.getElementById("eraserButton");
    eraseButton.addEventListener('click', etch.buttons.eraserOn);

    //Event Listener to reset grid
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", etch.grid.resetGrid);

    //Event Listener to update grid size using slider
    const slider = document.querySelector("#myRange");
    slider.addEventListener('input', etch.grid.gridUpdate);

    //Calls Initial 16x16 Grid Generation
    etch.grid.initialGrid();


