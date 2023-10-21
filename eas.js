function toDoList(...toDos){
    for(toDo of toDos) {
        alert(toDo);
    }
}

toDoList("add styling functionality", "revise mouseout listener", "allow user to switch between color and random");

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
                return;
            }
        },

        //Resets Grid - Called by Reset Grid Button
        resetGrid() {
            const gridBox = document.querySelector("div.etchBox");
            let color = gridBox.dataset.color;
            let deleteRows = document.querySelectorAll("div.etchRow");
            let length = deleteRows.length;
            deleteRows.forEach((deleteRow) => {deleteRow.remove();})
            etch.grid.generateGrid(length, 0);
            etch.draw.addStylus(color);
        },

        //Updates Slider Display from Slider Input
        updateGridDisplay() {
            let value = document.getElementById("myRange").value
            let gridSizeDisplay = document.getElementById("gridSizeDisplay");
            gridSizeDisplay.innerHTML = `Grid Size: ${value} x ${value}`;
        },

        //Updates Grid from Slider Input and a Helper function for generateGrid
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

        initialGrid(gridSize = 16, rowCount = 0) {
            let color = 'black';
            etch.grid.generateGrid(gridSize, rowCount);
            etch.draw.addStylus(color);
        },

    },

    //Functions that Impact Drawing
    draw: {
        
        addStylus(color) {
            etch.draw.colorAssign(color);
            const drawModeButton = document.getElementById("drawModeButton");
            const gridBoxes = document.querySelectorAll("div.etchBox");
            if(drawModeButton.getAttribute("name") === "percision") {
                gridBoxes.forEach((gridBox) => {
                    gridBox.addEventListener('mouseenter', etch.draw.percisionStylus);
                });
            } else {
                drawModeButton.setAttribute("name", "drag");
                gridBoxes.forEach((gridBox) => {
                    gridBox.addEventListener('mouseenter', etch.draw.dragStylus);
                });
            }
        },

        //Removes Stylus Event Listener
        removeStylus() {
            const gridBoxes = document.querySelectorAll("div.etchBox");
            const drawModeButton = document.getElementById("drawModeButton");
            if(drawModeButton.getAttribute("name") === "percision") {
                gridBoxes.forEach((gridBox) => {
                    gridBox.removeEventListener('mouseover', etch.draw.percisionStylus)
                });
            } else {
                gridBoxes.forEach((gridBox) => {
                    gridBox.removeEventListener('mouseenter', etch.draw.dragStylus)
                });
            };
        },

        colorAssign(color){
            const gridBoxes = document.querySelectorAll("div.etchBox");
            gridBoxes.forEach((gridBox) => {
                gridBox.dataset.color = color;
            });

        },
        
        dragStylus(){
            const eraseButton = document.getElementById("eraser");
            const randomButton = document.getElementById("random");
            if(eraseButton.getAttribute("name") === "on"){
                this.style.backgroundColor = "white";
            } else if(randomButton.getAttribute("name") === "on"){
                let randomColor = etch.draw.random.randomColor();
                this.style.backgroundColor = randomColor;
            } else {
                this.style.backgroundColor = this.dataset.color;}
        },

        percisionStylus(){
            const drawField = document.getElementById("outerEtchContainer");
            const eraseButton = document.getElementById("eraser");
            const randomButton = document.getElementById("random");
            drawField.onmousedown = function() {
                drawField.dataset.mouse = "mouseDown";
                console.log(drawField);
            }
            drawField.onmouseup = function() {
                drawField.dataset.mouse = "mouseUp";
                console.log(drawField);
            }
            /*drawField.onmouseout = function() {
                drawField.dataset.mouse = "mouseOut";
                console.log(drawField);
            }*/
            if(drawField.getAttribute("mouse") == "mouseDown" && eraseButton.getAttribute("name") === "on") {   
                this.style.backgroundColor = "white";
            } else if(drawField.getAttribute("mouse") == "mouseDown" && randomButton.getAttribute("name") === "on") {
                let randomColor = etch.draw.random.randomColor();
                this.style.backgroundColor = randomColor;;
            } else if(drawField.dataset.mouse === "mouseDown") {
                this.style.backgroundColor = this.dataset.color;
            }
        },
        

        updateDrawmode() {
            const drawModeButton = document.getElementById("drawModeButton");
            const randomButton = document.getElementById("random");
            const gridBox = document.querySelector("div.etchBox");
            let color = gridBox.dataset.color;
            etch.draw.removeStylus();
            if (drawModeButton.getAttribute("name") === "percision") {
                //This will hold random
                if (randomButton.getAttribute("name") === "on"){

                } else {
                //new code ends here
                    drawModeButton.setAttribute("name", "drag");
                    etch.draw.addStylus(color);
                }
            } else if (drawModeButton.getAttribute("name") === "drag") {
                drawModeButton.setAttribute("name", "percision");
                etch.draw.addStylus(color);
            }
        },

        //lets user select color from color input
        colorDraw() {
            let colorInput = document.getElementById("myColor");    
            let color = colorInput.value;
            etch.draw.addStylus(color);
        },

        //Eraser button
        eraser() {
            const eraseButton = document.getElementById("eraser");
            if(eraseButton.getAttribute("name") === "on") {
                eraseButton.setAttribute("name", "off")
            } else {
                eraseButton.setAttribute("name", "on");
            }
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

            //Random Stylus
            randomStylus() {
                
            },

            randomOn() {
                const randomButton = document.getElementById("random");
                if(randomButton.getAttribute("name") === "on") {
                    randomButton.setAttribute("name", "off")
                } else {
                    randomButton.setAttribute("name", "on");
                }
            },
        },
    },
}



    //Event Listener For Drawmode
    const drawModeButton = document.getElementById("drawModeButton");
    drawModeButton.addEventListener('click', etch.draw.updateDrawmode);

    //Event Listener For Color Drawing
    const colorInput = document.getElementById("myColor");
    colorInput.addEventListener("input", etch.draw.colorDraw);

    //Event Listener For Random Stylus
    const randomButton = document.getElementById("random");
    randomButton.addEventListener('click', etch.draw.random.randomOn);

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
    etch.grid.initialGrid();
