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

}