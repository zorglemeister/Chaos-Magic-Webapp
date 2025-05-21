// ALL THIS STUFF WORKS. DON'T MESS WITH IT, JO! - Jo

// onLoad behaviours
window.onload = setSettingsVisibility(), setGameControlVisibility()

//
//
// THIS IS THE GAME CONFIGURATION STUFF

// Controls settings visibility
function setSettingsVisibility() {
    var settingsDiv = document.getElementById("gameSettings");
    var btnText = document.getElementById("gameSettingsButton");
    if (btnText.innerHTML === "Hide Game Settings") {
        btnText.innerHTML = "Show Game Settings"; 
        settingsDiv.style.display = "none";
    } else {
        btnText.innerHTML = "Hide Game Settings"; 
        settingsDiv.style.display = "block";
    }
}
// Control help text visibility
function toggleHelp(targetSpan, triggerIcon) {
    // var helpSpan = document.getElementById(toString(triggerIcon) + "Text");
    var helpSpan = document.getElementById(targetSpan);
    triggerIcon.classList.toggle('helpIconClosed'); // toggle Closed Book class
    triggerIcon.classList.toggle('helpIconOpen'); // toggle Open Book class
    helpSpan.classList.toggle('hiddenHelp'); // toggle Help visibility
}
// Updates player count button and clarification text
function switchPlayerCount() {
    var helpText = document.getElementById("playerCountText");
    var btnText = document.getElementById("playerCountButton");
    if (btnText.innerHTML === "Duel") {
        btnText.innerHTML = "Group"; 
        helpText.innerHTML = "3+";
    } else {
        btnText.innerHTML = "Duel"; 
        helpText.innerHTML = "1 v 1";
    }
}
// Controls config visibility depending on List selection
function setGameControlVisibility() {
    var mode = document.getElementById("listBase").options.selectedIndex;
    var vengeanceDiv = document.getElementById("vengeanceSelector");
    var minigameDiv = document.getElementById("minigameSelector");
    var exemplarDiv = document.getElementById("exemplarThemeSelector");
    var customSchoolDiv = document.getElementById("customSchoolSelector");
    var customDurationDiv = document.getElementById("customDurationSelector");
    var customRarityDiv = document.getElementById("customRaritySelector");
    var customMattersDiv = document.getElementById("customRarityMattersSelector");
    var repetitionDiv = document.getElementById("repetitionSelector");
    document.getElementById("debugSelectionIndex").innerHTML = mode;
    switch (mode) {
        case 0: // Micro
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            exemplarDiv.style.display = "none";
            customSchoolDiv.style.display = "none";
            customDurationDiv.style.display = "none";
            customRarityDiv.style.display = "none";
            customMattersDiv.style.display = "none";
            repetitionDiv.style.display = "none";
            break;
        case 1: // Lite
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            exemplarDiv.style.display = "none";
            customSchoolDiv.style.display = "none";
            customDurationDiv.style.display = "none";
            customRarityDiv.style.display = "none";
            customMattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 2: // Exemplar
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            exemplarDiv.style.display = "block";
            customSchoolDiv.style.display = "none";
            customDurationDiv.style.display = "none";
            customRarityDiv.style.display = "none";
            customMattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 3: // Legacy
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "none";
            exemplarDiv.style.display = "none";
            customSchoolDiv.style.display = "none";
            customDurationDiv.style.display = "none";
            customRarityDiv.style.display = "none";
            customMattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 4: // Full
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "none";
            exemplarDiv.style.display = "none";
            customSchoolDiv.style.display = "none";  
            customDurationDiv.style.display = "none";
            customRarityDiv.style.display = "none";
            customMattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 5: // Custom
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            exemplarDiv.style.display = "none";
            customSchoolDiv.style.display = "block";
            customDurationDiv.style.display = "block";
            customRarityDiv.style.display = "block";
            customMattersDiv.style.display = "block";
            repetitionDiv.style.display = "block";
    }
}
// Controls vengeance visibility
function setVengeanceVisibility() {
    var vengeanceDiv = document.getElementById("generateVengeance");
    var checkState = document.getElementById("vengeanceToggle");
    if (checkState.checked === false) {
        vengeanceDiv.style.display = "none";
    } else {
        vengeanceDiv.style.display = "block";
    }
}
// Controls minigame delay slider visibility
function setMinigameDelayVisibility() {
    var delaySpan = document.getElementById("minigameDelaySetting");
    var checkState = document.getElementById("minigameToggle");
    if (checkState.checked === true) {
        delaySpan.style.display = "block";
    } else {
        delaySpan.style.display = "none";
    }
}
// Updates minigame delay number
var delaySlider = document.getElementById("minigameDelay");
            var outputDelay = document.getElementById("delayNum");
            outputDelay.innerHTML = delaySlider.value;
            delaySlider.oninput = function() {
                if (delaySlider.value == 0) {
                    outputDelay.innerHTML = "Whenever"
                } else {
                    outputDelay.innerHTML = this.value;
                }
            }
// Change Theme Multiselect when ALL is checked or unchecked
function switchThemeMulti() {
    var listSelector = document.getElementById("exemplarTheme");
    var checkState = document.getElementById("allThemes"); 
    if (checkState.checked === true) {
        listSelector.type = "select-multiple";
        listSelector.multiple = true;
    } else {
        listSelector.type = "select-one";
        listSelector.multiple = false;
    }
}
// Unchecks ALL and updates Theme Multiselect when theme list is clicked
function uncheckThemeAll() {
    document.getElementById("allThemes").checked = false;
    document.getElementById("exemplarTheme").type = "select-one";
    document.getElementById("exemplarTheme").multiple = false;
}
// Reusable selectAll/unselect for ALL checkboxes
function selectAll(allCheck, selectName) {
    var listSelector = document.getElementById(selectName);
    var checkState = document.getElementById(allCheck);
    var listLength = listSelector.options.length;
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
// Checks if all values are selected, if so, checks ALL
function testSelectAll(allCheck, selectName) {
    var listSelector = document.getElementById(selectName);
    var checkState = document.getElementById(allCheck);
    var listLength = listSelector.options.length;
    var allSelected = 0;
        for (let i = 0; i < listLength; i++) {
            if (listSelector.options[i].selected === false) {
                allSelected++;
            };
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
    var listSelection = document.getElementById(selectElement);
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