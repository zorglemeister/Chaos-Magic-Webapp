// Element Definition + Click Handlers

// "settingsContainer"
export const settingsDiv = document.getElementById("gameSettings");
    // "settingBasics"
        // "playerCountSetting"
        // "listSetting"
        export const themeDiv = document.getElementById("themeSetting");
        export const schoolDiv = document.getElementById("schoolSetting");
        export const durationDiv = document.getElementById("durationSetting");
        export const rarityDiv = document.getElementById("raritySetting");
    // "settingRandomizer"
        export const repetitionDiv = document.getElementById("repetitionSetting");
        export const mattersDiv = document.getElementById("rarityMattersSetting");
    // "settingExtras"
        // "physicalSetting"
        export const vengeanceDiv = document.getElementById("vengeanceSetting");
        export const minigameDiv = document.getElementById("minigameSetting");
        export const delayDiv = document.getElementById("minigameDelaySetting");
    // "updateGame"

// All the elements with onClicks
export const configSettingsButton = document.getElementById("gameSettingsButton");
export const configListSelect = document.getElementById("listSelect");
export const configSchoolAll = document.getElementById("allSchoolsToggle");
export const configSchoolSelect = document.getElementById("schoolSelect");
export const configDurationAll = document.getElementById("allDurationsToggle");
export const configDurationSelect = document.getElementById("durationSelect");
export const configRarityAll = document.getElementById("allRaritiesToggle");
export const configRaritySelect = document.getElementById("raritySelect");
export const configMinigame = document.getElementById("minigameToggle");

// Defining the sliders and value spans
export const configPlayerCount = document.getElementById("playerCountSlider");
export const configOutputPlayer = document.getElementById("playerCountText");

export const configMinigameDelay = document.getElementById("minigameDelaySlider");
export const configOutputDelay = document.getElementById("minigameDelayText");

// All the "simple" elements
export const configTheme = document.getElementById("themeSelect");
export const configRepetition = document.getElementById("repetitionToggle");
export const configRarityMatters = document.getElementById("rarityMattersToggle");
export const configVengeance = document.getElementById("vengeanceToggle");
export const configPhysical = document.getElementById("physicalToggle");

// Set the events
export function defineEvents() {
    configSettingsButton.addEventListener('click', setSettingsVisibility());
    configListSelect.addEventListener('click', setGameControlVisibility());
    configSchoolAll.addEventListener('click', selectAll('allSchoolsToggle', 'schoolSelect'));
    configSchoolSelect.addEventListener('click', testSelectAll('allSchoolsToggle', 'schoolSelect'));
    configDurationAll.addEventListener('click', selectAll('allDurationsToggle', 'durationSelect'));
    configDurationSelect.addEventListener('click', testSelectAll('allDurationsToggle', 'durationSelect'));
    configRarityAll.addEventListener('click', selectAll('allRaritiesToggle', 'raritySelect'));
    configRaritySelect.addEventListener('click', testSelectAll('allRaritiesToggle', 'raritySelect'));
    configMinigame.addEventListener('click', setMinigameDelayVisibility());
    configPlayerCount.addEventListener('input', () => {configOutputPlayer.innerHTML = this.value;});
    configMinigameDelay.addEventListener('input', () => {if (configMinigameDelay.value == 0) {
            configOutputDelay.innerHTML = "Whenever"
        } else {
            configOutputDelay.innerHTML = this.value;
        }});
}

// Set the initial state
export function initialState() {
    configOutputPlayer.innerHTML = configPlayerCount.value;
    configOutputDelay.innerHTML = configMinigameDelay.value;
    setSettingsVisibility();
    setGameControlVisibility();
}

// The rest of these are specific to the Settings scope and don't need to be triggered externally,
// so I'm not importing them? (Or do they need to be imported to run at all?)

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
// Control help text visibility <-- Offload to HelpBoxComponent
// function toggleHelp(targetSpan, triggerIcon) {
    // var helpSpan = document.getElementById(targetSpan);
    // triggerIcon.classList.toggle('helpIconClosed'); // toggle Closed Book class
    // triggerIcon.classList.toggle('helpIconOpen'); // toggle Open Book class
    // helpSpan.classList.toggle('hiddenHelp'); // toggle Help visibility
// }
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
// Controls vengeance visibility  <-- MOVE THIS TO THE "Save Settings" process
// function setVengeanceVisibility() {
//     if (configVengeance.checked === false) {
//         vengeanceDiv.style.display = "none";
//     } else {
//         vengeanceDiv.style.display = "block";
//     }
// }
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