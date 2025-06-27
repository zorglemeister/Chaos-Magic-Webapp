// THIS FILE HOLDS THE SETTINGS PANEL
// ALL THIS STUFF WORKS. DON'T MESS WITH IT, JO! - Jo



//
//
// THIS IS THE GAME CONFIGURATION STUFF

// Controls settings visibility
function setSettingsVisibility() {
    if (elem.gameConfigButton.textContent === "Hide Game Settings") {
        elem.gameConfigButton.textContent = "Show Game Settings"; 
        elem.gameConfigBlock.style.display = "none";
    } else {
        elem.gameConfigButton.textContent = "Hide Game Settings"; 
        elem.gameConfigBlock.style.display = "block";
    }
}
// Control help text visibility
function toggleHelp(targetSpan, triggerIcon) {
    // const helpSpan = document.getElementById(toString(triggerIcon) + "Text");
    const helpSpan = document.getElementById(targetSpan);
    triggerIcon.classList.toggle('helpIconClosed'); // toggle Closed Book class
    triggerIcon.classList.toggle('helpIconOpen'); // toggle Open Book class
    helpSpan.classList.toggle('hiddenHelp'); // toggle Help visibility
}
// Updates player count button and clarification text
function switchPlayerCount() {
    if (elem.playerCountButton.textContent === "Duel") {
        elem.playerCountButton.textContent = "Group"; 
        elem.playerCountText.textContent = "3+";
    } else {
        elem.playerCountButton.textContent = "Duel"; 
        elem.playerCountText.textContent = "1 v 1";
    }
}
// Controls config visibility depending on List selection
function setGameControlVisibility() {

    document.getElementById("debugSelectionIndex").innerHTML = elem.listList.options.selectedIndex;
    switch (elem.listList.options.selectedIndex) {
        case 0: // Micro
            elem.vengBlock.style.display = "block";
            elem.mgBlock.style.display = "block";
            elem.exemplarBlock.style.display = "none";
            elem.schoolBlock.style.display = "none";
            elem.durationBlock.style.display = "none";
            elem.rarityBlock.style.display = "none";
            elem.mattersBlock.style.display = "none";
            elem.repeatBlock.style.display = "none";
            break;
        case 1: // Lite
            elem.vengBlock.style.display = "block";
            elem.mgBlock.style.display = "block";
            elem.exemplarBlock.style.display = "none";
            elem.schoolBlock.style.display = "none";
            elem.durationBlock.style.display = "none";
            elem.rarityBlock.style.display = "none";
            elem.mattersBlock.style.display = "none";
            elem.repeatBlock.style.display = "block";
            break;
        case 2: // Exemplar
            elem.vengBlock.style.display = "block";
            elem.mgBlock.style.display = "block";
            elem.exemplarBlock.style.display = "block";
            elem.schoolBlock.style.display = "none";
            elem.durationBlock.style.display = "none";
            elem.rarityBlock.style.display = "none";
            elem.mattersBlock.style.display = "none";
            elem.repeatBlock.style.display = "block";
            break;
        case 3: // Legacy
            elem.vengBlock.style.display = "block";
            elem.mgBlock.style.display = "none";
            elem.exemplarBlock.style.display = "none";
            elem.schoolBlock.style.display = "none";
            elem.durationBlock.style.display = "none";
            elem.rarityBlock.style.display = "none";
            elem.mattersBlock.style.display = "none";
            elem.repeatBlock.style.display = "block";
            break;
        case 4: // Full
            elem.vengBlock.style.display = "block";
            elem.mgBlock.style.display = "none";
            elem.exemplarBlock.style.display = "none";
            elem.schoolBlock.style.display = "none";  
            elem.durationBlock.style.display = "none";
            elem.rarityBlock.style.display = "none";
            elem.mattersBlock.style.display = "none";
            elem.repeatBlock.style.display = "block";
            break;
        case 5: // Custom
            elem.vengBlock.style.display = "block";
            elem.mgBlock.style.display = "block";
            elem.exemplarBlock.style.display = "none";
            elem.schoolBlock.style.display = "block";
            elem.durationBlock.style.display = "block";
            elem.rarityBlock.style.display = "block";
            elem.mattersBlock.style.display = "block";
            elem.repeatBlock.style.display = "block";
    }
}
// Controls vengeance button visibility
function setVengeanceVisibility() {
    const vengeanceDiv = document.getElementById("generateVengeance");
    const checkState = document.getElementById("vengeanceToggle");
    if (checkState.checked === false) {
        vengeanceDiv.style.display = "none";
    } else {
        vengeanceDiv.style.display = "block";
    }
}
// Controls minigame delay slider visibility
function setMinigameDelayVisibility() {
    const delaySpan = document.getElementById("minigameDelaySetting");
    const checkState = document.getElementById("minigameToggle");
    if (elem.mgCheck.checked === true) {
        elem.mgDelayBlock.style.display = "block";
    } else {
        elem.mgDelayBlock.style.display = "none";
    }
}
// Updates minigame delay number
const delaySlider = document.getElementById("minigameDelay");
            const outputDelay = document.getElementById("delayNum");
            outputDelay.textContent = delaySlider.value;
            delaySlider.oninput = function() {
                if (delaySlider.value === "0") {
                    outputDelay.textContent = "Whenever"
                } else {
                    outputDelay.textContent = this.value;
                }
            }
// Change Theme Multiselect when ALL is checked or unchecked
function switchThemeMulti() {
    const listSelector = document.getElementById("exemplarTheme");
    const checkState = document.getElementById("allThemes");
    if (checkState.checked === true) {
        elem.exemplarList.type = "select-multiple";
        elem.exemplarList.multiple = true;
    } else {
        elem.exemplarList.type = "select-one";
        elem.exemplarList.multiple = false;
    }
}
// Unchecks ALL and updates Theme Multiselect when theme list is clicked
function uncheckThemeAll() {
    document.getElementById("allThemes").checked = false;
    document.getElementById("exemplarTheme").type = "select-one";
    document.getElementById("exemplarTheme").multiple = false;
}
// Reusable selectAll/unselect for ALL checkboxes *** I can't seem to make this work with elem. structure, so leaving as they are.
function selectAll(allCheck, selectName) {
    const listSelector = document.getElementById(selectName);
    const checkState = document.getElementById(allCheck);
    const listLength = listSelector.options.length;
    if (checkState.checked === false) {
        for (let i = 1; i < listLength; i++) {
            listSelector.options[0].selected = true; // selects the first value (to avoid filtering EVERYTHING out)
            listSelector.options[i].selected = false; // unselects the rest
        }
    } else {
        for (let i = 0; i < listLength; i++) {
            listSelector.options[i].selected = true; // selects all the options
        }
    }
}
// Checks if all values are selected, if so, checks ALL *** I can't seem to make this work with elem. structure, so leaving as they are.
function testSelectAll(allCheck, selectName) {
    const listSelector = document.getElementById(selectName);
    const checkState = document.getElementById(allCheck);
    const listLength = listSelector.options.length;
    let allSelected = 0;
        for (let i = 0; i < listLength; i++) {
            if (listSelector.options[i].selected === false) {
                allSelected++;
            }
        }
    if (checkState.checked === false && allSelected === 0) {
        checkState.checked = true;
    } else if (checkState.checked === true && allSelected !== 0) {
        checkState.checked = false;
    }
}
// FANCY BITWISE ARRAY ENCODING/DECODING
let generatedArray = [];
let encodedValue = 0;
let encodedValueLength = 0;
function generateArrayToEncode(selectElement) {
    const listSelection = document.getElementById(selectElement);
    generatedArray = [];
    for (let i = 0; i < listSelection.options.length; i++) {
        generatedArray.push(listSelection.options[i].selected);
    }
    document.getElementById("debugGeneratedSchool").innerHTML = generatedArray;
    document.getElementById("debugGeneratedSchoolLength").innerHTML = generatedArray.length;
}
function encodeArrayToBitwise() {
    encodedValue = 0;
    encodedValueLength = generatedArray.length;
    for (let i = 0; i < encodedValueLength; i++) {
        if (generatedArray[i]) {
            encodedValue |= (1 << i);
        }
    }
    document.getElementById("debugEncodedSchool").innerHTML = encodedValue;
    document.getElementById("debugEncodedSchoolLength").innerHTML = encodedValueLength;
}
function decodeArrayFromBitwise() {
    let decodedArray = [];
    for (let i = 0; i < encodedValueLength; i++) {
        decodedArray.push((encodedValue & (1 << i)) !== 0);
    }
    document.getElementById("debugDecodedSchool").innerHTML = decodedArray;
}
function doItAll(inputElement) {
    generateArrayToEncode(inputElement);
    encodeArrayToBitwise();
    decodeArrayFromBitwise();
}