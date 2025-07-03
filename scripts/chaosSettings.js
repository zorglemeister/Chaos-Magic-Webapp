// THIS FILE HOLDS THE SETTINGS PANEL
//
// onLoad behaviours
window.onload = setSettingsVisibility(), setGameControlVisibility()

// Div Definition
// I'm only defining the divs I need to interact with, but I placeholdered the rest in the structure

// "settingsContainer"
const settingsDiv = document.getElementById("gameSettings");
    // "settingBasics"
        // "playerCountSetting"
        // "listSetting"
        const themeDiv = document.getElementById("themeSetting");
        const schoolDiv = document.getElementById("schoolSetting");
        const durationDiv = document.getElementById("durationSetting");
        const rarityDiv = document.getElementById("raritySetting");
    // "settingRandomizer"
        const repetitionDiv = document.getElementById("repetitionSetting");
        const mattersDiv = document.getElementById("rarityMattersSetting");
    // "settingExtras"
        // "physicalSetting"
        const vengeanceDiv = document.getElementById("vengeanceSetting");
        const minigameDiv = document.getElementById("minigameSetting");
        const delayDiv = document.getElementById("minigameDelaySetting");
    // "updateGame"


// Element Definition + Click Handlers

// All the elements with onClicks
const configSettingsButton = document.getElementById("gameSettingsButton");
configSettingsButton.addEventListener('click', setSettingsVisibility());

const configListSelect = document.getElementById("listSelect");
configListSelect.addEventListener('click', setGameControlVisibility());

const configSchoolAll = document.getElementById("allSchoolsToggle");
configSchoolAll.addEventListener('click', selectAll('allSchoolsToggle', 'schoolSelect'));

const configSchoolSelect = document.getElementById("schoolSelect");
configSchoolSelect.addEventListener('click', testSelectAll('allSchoolsToggle', 'schoolSelect'));

const configDurationAll = document.getElementById("allDurationsToggle");
configDurationAll.addEventListener('click', selectAll('allDurationsToggle', 'durationSelect'));

const configDurationSelect = document.getElementById("durationSelect");
configDurationSelect.addEventListener('click', testSelectAll('allDurationsToggle', 'durationSelect'));

const configRarityAll = document.getElementById("allRaritiesToggle");
configRarityAll.addEventListener('click', selectAll('allRaritiesToggle', 'raritySelect'));

const configRaritySelect = document.getElementById("raritySelect");
configRaritySelect.addEventListener('click', testSelectAll('allRaritiesToggle', 'raritySelect'));

const configMinigame = document.getElementById("minigameToggle");
configMinigame.addEventListener('click', setMinigameDelayVisibility());

// Defining the Sliders and value update handlers

const configPlayerCount = document.getElementById("playerCountSlider");
const configOutputPlayer = document.getElementById("playerCountText");
    configOutputPlayer.innerHTML = configPlayerCount.value;
    configPlayerCount.oninput = function() {
        configOutputPlayer.innerHTML = this.value;
    }

const configMinigameDelay = document.getElementById("minigameDelaySlider");
const configOutputDelay = document.getElementById("minigameDelayText");
    configOutputDelay.innerHTML = configMinigameDelay.value;
    configMinigameDelay.oninput = function() {
        if (configMinigameDelay.value == 0) {
            configOutputDelay.innerHTML = "Whenever"
        } else {
            configOutputDelay.innerHTML = this.value;
        }
    }

// All the "simple" elements

const configTheme = document.getElementById("themeSelect");
const configRepetition = document.getElementById("repetitionToggle");
const configRarityMatters = document.getElementById("rarityMattersToggle");
const configVengeance = document.getElementById("vengeanceToggle");
const configPhysical = document.getElementById("physicalToggle");




//
//
// THIS IS THE GAME CONFIGURATION STUFF

// Controls settings visibility
function setSettingsVisibility() {
    if (configSettingsButton.innerHTML === "Hide Game Settings") {
        configSettingsButton.innerHTML = "Show Game Settings"; 
        settingsDiv.style.display = "none";
    } else {
        configSettingsButton.innerHTML = "Hide Game Settings"; 
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
// Controls config visibility depending on List selection
function setGameControlVisibility() {
    switch (configListSelect.options.selectedIndex) {
        case 0: // Micro
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            themeDiv.style.display = "none";
            schoolDiv.style.display = "none";
            durationDiv.style.display = "none";
            rarityDiv.style.display = "none";
            mattersDiv.style.display = "none";
            repetitionDiv.style.display = "none";
            break;
        case 1: // Lite
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            themeDiv.style.display = "none";
            schoolDiv.style.display = "none";
            durationDiv.style.display = "none";
            rarityDiv.style.display = "none";
            mattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 2: // Exemplar
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            themeDiv.style.display = "block";
            schoolDiv.style.display = "none";
            durationDiv.style.display = "none";
            rarityDiv.style.display = "none";
            mattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 3: // Legacy
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "none";
            themeDiv.style.display = "none";
            schoolDiv.style.display = "none";
            durationDiv.style.display = "none";
            rarityDiv.style.display = "none";
            mattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 4: // Full
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "none";
            themeDiv.style.display = "none";
            schoolDiv.style.display = "none";  
            durationDiv.style.display = "none";
            rarityDiv.style.display = "none";
            mattersDiv.style.display = "none";
            repetitionDiv.style.display = "block";
            break;
        case 5: // Custom
            vengeanceDiv.style.display = "block";
            minigameDiv.style.display = "block";
            themeDiv.style.display = "none";
            schoolDiv.style.display = "block";
            durationDiv.style.display = "block";
            rarityDiv.style.display = "block";
            mattersDiv.style.display = "block";
            repetitionDiv.style.display = "block";
    }
}
// Controls vengeance visibility
function setVengeanceVisibility() {
    if (configVengeance.checked === false) {
        vengeanceDiv.style.display = "none";
    } else {
        vengeanceDiv.style.display = "block";
    }
}
// Controls minigame delay slider visibility
function setMinigameDelayVisibility() {
    if (configMinigame.checked === true) {
        delayDiv.style.display = "block";
    } else {
        delayDiv.style.display = "none";
    }
}
// Reusable selectAll/unselect for ALL checkboxes
function selectAll(allCheck, selectName) {
    if (allCheck.checked === false) {
        for (let i = 1; i < selectName.options.length; i++) {
            selectName.options[0].selected = true; // selects the first value (to avoid filtering EVERYTHING out)
            selectName.options[i].selected = false; // unselects the rest
        }
    } else {
        for (let i = 0; i < listLength; i++) {
            selectName.options[i].selected = true; // selects all the options
        }
    }
}
// Checks if all values are selected, if so, checks ALL
function testSelectAll(allCheck, selectName) {
    let allSelected = 0;
        for (let i = 0; i < selectName.options.length; i++) {
            if (selectName.options[i].selected === false) {
                allSelected++;
            };
        }
    if (allCheck.checked === false && allSelected === 0) {
        allCheck.checked = true;
    } else if (allCheck.checked === true && allSelected !== 0) {
        allCheck.checked = false;
    }
}
// FANCY BITWISE ARRAY ENCODING/DECODING
// THIS ISN'T IMPORTANT, IT'S ME BEING A NERD
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