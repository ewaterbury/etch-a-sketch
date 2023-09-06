

function generateEtchGrid() {
    let rowNum = 0;
    for(let i = 0; i < 16; i++){
        const etchContainer = document.getElementById("etchContainer");
        const etchRow = document.createElement('div');
        rowNum = ++rowNum;
        etchRow.setAttribute('class', 'etchRow');
        etchRow.setAttribute('id', `Row${rowNum}`)
        //here will be where I style row
        etchContainer.appendChild(etchRow);
        const etchBox = document.createElement('div');
        //here will be where I style box
        etchBox.textContent = '\u00A0';
        etchBox.setAttribute('class', 'etchBox')
        for(let i = 0; i < 16; i++){etchRow.appendChild(etchBox.cloneNode(true));}
}}



generateEtchGrid();
