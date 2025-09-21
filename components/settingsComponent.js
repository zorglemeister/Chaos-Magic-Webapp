// Do I need to import the help box here?

import { registerHelpBoxComponent } from './helpBoxComponent.js';
import * as shared from '../scripts/sharedAssets.js';

// pull in the base objects from index.js
// import { sourceList } from '../scripts/index.js'; // source list
// import { settingsPayload } from '../scripts/index.js'; // settings
// import { gameList } from '../scripts/index.js'; // filtered game list

// Page Content as Component?

const settingsTemplate = document.createElement('template');
// templates don't play nice with element ids
// since they can be replicated on the page, and the id must be unique, that'll cause problems if the section is duplicated
// this template will only be used once, so I think I can get away with it
// for the effect template, I'll need to write a unique ID function so they can be properly referenced

// I've moved the id's for most elements into the class instead
// The exceptions are the labeled pieces, because label's for= uses the id

settingsTemplate.innerHTML = `
        <div class="settingsContainer configBlock drawerContainer">
            <button type="button" class="gameSettingsButton drawerSettings drawerClosed"></button>
            <button type="button" class="updateSettingsButton drawerUpdate drawerUpdateClosed">Update Game Settings</button>
            <div class="gameSettings drawerContents">
            <div class="configTitle">Configure your Chaos!</div>
            <div class="settingBasics settingGroup">
                <div class="playerCountSetting settingContainer">
                    <div class="settingTitle">Player Count</div>
                    <label class="settingText" for="playerCount">How many players?</label>
                    <div class="settingContent">
                    <p><input id="playerCountSlider" class="playerCountSlider slider" type="range" min="2" max="10" value="4"></p><span class="playerCountText"></span>
                    </div>
                    <z-hb>Some effects work better (or only work) in games with three or more players.</z-hb>
                </div>
                <div class="listSetting settingContainer">
                    <div class="settingTitle">List Template</div>
                    <label class="settingText" for="listSelect">Choose a list:</label>
                    <div class="settingContent">
                    <select id="listSelect" class="listSelect selectList" type="select-one" size="6" style="overflow: hidden">
                        <option value="micro">Micro</option>
                        <option value="lite">Lite</option>
                        <option value="exemplar">Exemplar</option>
                        <option value="legacy">Legacy</option>
                        <option value="full" selected>Full</option>
                        <option value="custom">Custom</option>
                    </select>
                    </div>
                    <z-hb>The List has had several "collections" over the years. Pick one or define your own.</z-hb>
                </div>
                <div class="themeSetting settingContainer">
                    <div class="settingTitle">Theme Table</div>
                    <label class="settingText" for="themeSelect">Exemplar Theme Table</label>
                    <div class="settingContent">
                    <select id="themeSelect" class="themeSelect selectList" type="select-one" size="8" style="overflow: hidden">
                        <option value="tokenizer" selected>Tokenizer</option>
                        <option value="complexity">Complexity</option>
                        <option value="soundalike">Sound-Alike</option>
                        <option value="prodigal">Prodigal</option>
                        <option value="beat">Beat</option>
                        <option value="university">University</option>
                        <option value="toxin">Toxin</option>
                        <option value="badthings">Bad Things</option>
                    </select>
                    </div>
                    <z-hb>The Exemplar Chaos List involves a themed sub-list for some effects. Choose your theme table.</z-hb>
                </div>
                <div class="schoolSetting settingContainer">
                    <div class="settingTitle">Schools of Magic</div>
                    <label class="settingText" for="schoolSelect">Choose included schools of magic (Shift and Ctrl click to select multiple)</label>
                    <div class="settingContent">
                    <div class="allSelect">
                    <label for="allSchoolsToggle">All</label>
                    <input id="allSchoolsToggle" class="bigControl allSchoolsToggle" type="checkbox" checked/>
                    </div>
                    <select id="schoolSelect" class="schoolSelect selectList" type="select-multiple" size="9" multiple style="overflow: hidden">
                        <option value="abjuration" selected>Abjuration</option>
                        <option value="chronomancy" selected>Chronomancy</option>
                        <option value="conjuration" selected>Conjuration</option>
                        <option value="divination" selected>Divination</option>
                        <option value="enchantment" selected>Enchantment</option>
                        <option value="evocation" selected>Evocation</option>
                        <option value="illusion" selected>Illusion</option>
                        <option value="necromancy" selected>Necromancy</option>
                        <option value="transmutation" selected>Transmutation</option>
                    </select>
                    </div>
                    <z-hb>Every effect belongs to one or more schools of magic. Choose which sorts of effects to include.</z-hb>
                </div>
                <div class="durationSetting settingContainer">
                    <div class="settingTitle">Durations</div>
                    <label class="settingText" for="durationSelect">Choose included durations of effects (Shift and Ctrl click to select multiple)</label>
                    <div class="settingContent">
                    <div class="allSelect">
                    <label for="allDurationsToggle">All</label>
                    <input id="allDurationsToggle" class="bigControl allDurationsToggle" type="checkbox" checked/>
                    </div>
                    <select id="durationSelect" class="durationSelect selectList" type="select-multiple" size="4" multiple style="overflow: hidden">
                        <option value="instant" selected>Instant</option>
                        <option value="turn" selected>Turn</option>
                        <option value="round" selected>Round</option>
                        <option value="ongoing" selected>Ongoing</option>
                    </select>
                    </div>
                    <z-hb>TEXT EXPLAINING DURATION</z-hb>
                </div>
                <div class="raritySetting settingContainer">
                    <div class="settingTitle">Rarities</div>
                    <label class="settingText" for="raritySelect">Choose included rarity of effects (Shift and Ctrl click to select multiple)</label>
                    <div class="settingContent">
                    <div class="allSelect">
                    <label for="allRaritiesToggle">All</label>
                    <input id="allRaritiesToggle" class="bigControl allRaritiesToggle" type="checkbox" checked/>
                    </div>
                    <select id="raritySelect" class="raritySelect selectList" type="select-multiple" size="4" multiple style="overflow: hidden">
                        <option value="common" selected>Common</option>
                        <option value="uncommon" selected>Uncommon</option>
                        <option value="rare" selected>Rare</option>
                        <option value="mythic" selected>Mythic</option>
                    </select>
                    </div>
                    <z-hb>TEXT EXPLAINING RARITY</z-hb>
                </div>
                </div>
                <div class="settingRandomizer settingGroup">
                <div class="repetitionSetting settingContainer">
                    <div class="settingTitle">Effect Repetition</div>
                    <label class="settingText" for="repetitionToggle">Effects can be repeated more than once in a session.</label>
                    <div class="settingContent">
                    <input id="repetitionToggle" class="bigControl repetitionToggle" type="checkbox" checked/>
                    </div>
                    <z-hb>Allow effects to occur more than once in a game.</z-hb>
                </div>
                <div class="rarityMattersSetting settingContainer">
                    <div class="settingTitle">Weighted Rarities</div>
                    <label class="settingText" for="rarityMattersToggle">Rarity matters for frequency of effects.</label>
                    <div class="settingContent">
                    <input id="rarityMattersToggle" class="bigControl rarityMattersToggle" type="checkbox"/>
                    </div>
                    <z-hb>Controls randomizer: effects occur more or less frequently depending on their rarity.</z-hb>
                </div>
                </div>
                <div class="settingExtras settingGroup">
                <div class="physicalSetting settingContainer">
                    <div class="settingTitle">Physical Effects</div>
                    <label class="settingText" for="physicalToggle">Effects that involve physical action are included.</label>
                    <div class="settingContent">
                    <input id="physicalToggle" class="bigControl physicalToggle" type="checkbox" checked/>
                    </div>
                    <z-hb>Some effects involve physical activity that may not be accessible for all players.</z-hb>
                </div>
                <div class="vengeanceSetting settingContainer">
                    <div class="settingTitle">Vengeance</div>
                    <label class="settingText" for="vengeanceToggle">Players roll on the Vengeance table if they would lose the game.</label>
                    <div class="settingContent">
                    <input id="vengeanceToggle" class="bigControl vengeanceToggle" type="checkbox" checked/>
                    </div>
                    <z-hb>When a player would lose the game, they roll Vengeance. This <i>might</i> keep them in the game.</z-hb>
                </div>
                <div class="minigameSetting settingContainer">
                    <div class="settingTitle">Minigames</div>
                    <label class="settingText" for="minigameToggle">Play a minigame occasionally.</label>
                    <div class="settingContent">
                    <input id="minigameToggle" class="bigControl minigameToggle" type="checkbox"/>
                    <div class="minigameDelaySetting hiddenPart">
                        <label class="sliderLabel" for="minigameDelaySlider">Turns between minigames</label>
                        <p><input id="minigameDelaySlider" class="minigameDelaySlider slider" type="range" min="0" max="10" value="4"></p>
                        <span class="minigameDelayText"></span>
                    </div>
                    </div>
                    <z-hb>Minigames are more complicated effects that may pull attention away from the game. If you wish to play with them, you can set a round timer between minigames or choose to manually trigger one when you feel like it.</z-hb>
                </div>
                </div>
            </div>
            
            <div class="updateModal hiddenPart">
                        <div class="updateText">
                        Updating Game Settings will reset the current game. Do you wish to save settings and start a new game?
                        <div>
                        <div class="updateButtons">
                        <button type="button" class="saveButton">Save</button>
                        <button type="button" class="cancelButton">Cancel</button>
                        </div>
                    </div>
            </div>
`;

// trying to declare elements to be scoped for the whole component
        // define the constants so they can be referenced across methods
        // using let so the values can be updated in render()
        // "settingsContainer"
        let settingsDiv = null;
            // "settingBasics"
                // "playerCountSetting"
                // "listSetting"
                let themeDiv = null;
                let schoolDiv = null;
                let durationDiv = null;
                let rarityDiv = null;
            // "settingRandomizer"
                let repetitionDiv = null;
                let mattersDiv = null;
            // "settingExtras"
                // "physicalSetting"
                let vengeanceDiv = null;
                let minigameDiv = null;
                let delayDiv = null;
            // "updateGame"

        // All the elements with onClicks
        let configSettingsButton = null;
        let configListSelect = null;
        let configSchoolAll = null;
        let configSchoolSelect = null;
        let configDurationAll = null;
        let configDurationSelect = null;
        let configRarityAll = null;
        let configRaritySelect = null;
        let configMinigame = null;
        let configUpdateButton = null;

        // The sliders and value spans
        let configPlayerCount = null;
        let configOutputPlayer = null;

        let configMinigameDelay = null;
        let configOutputDelay = null;

        // All the "simple" elements
        let configTheme = null;
        let configRepetition = null;
        let configRarityMatters = null;
        let configVengeance = null;
        let configPhysical = null;

        // The Drawer Pieces
        let drawerButton = null;
        let drawerContents = null;

        // the Update modal
        let updateModal = null;
        let saveButton = null;
        let cancelButton = null;

class SettingsComponent extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        this.render(); // render it!
    }
    render() {
        registerHelpBoxComponent(); // get the helpBox in here
        this.append(settingsTemplate.content.cloneNode(true)); // This'll clone the template and append it to the contents in the HTML

        // initialize the constants when this shows up in the DOM
        // "settingsContainer"
        settingsDiv = this.getElementsByClassName("gameSettings")[0];
            // "settingBasics"
                // "playerCountSetting"
                // "listSetting"
                themeDiv = this.getElementsByClassName("themeSetting")[0];
                schoolDiv = this.getElementsByClassName("schoolSetting")[0];
                durationDiv = this.getElementsByClassName("durationSetting")[0];
                rarityDiv = this.getElementsByClassName("raritySetting")[0];
            // "settingRandomizer"
                repetitionDiv = this.getElementsByClassName("repetitionSetting")[0];
                mattersDiv = this.getElementsByClassName("rarityMattersSetting")[0];
            // "settingExtras"
                // "physicalSetting"
                vengeanceDiv = this.getElementsByClassName("vengeanceSetting")[0];
                minigameDiv = this.getElementsByClassName("minigameSetting")[0];
                delayDiv = this.getElementsByClassName("minigameDelaySetting")[0];
            // "updateGame"

        // All the elements with onClicks
        configSettingsButton = this.getElementsByClassName("gameSettingsButton")[0];
        configListSelect = this.getElementsByClassName("listSelect")[0];
        configSchoolAll = this.getElementsByClassName("allSchoolsToggle")[0];
        configSchoolSelect = this.getElementsByClassName("schoolSelect")[0];
        configDurationAll = this.getElementsByClassName("allDurationsToggle")[0];
        configDurationSelect = this.getElementsByClassName("durationSelect")[0];
        configRarityAll = this.getElementsByClassName("allRaritiesToggle")[0];
        configRaritySelect = this.getElementsByClassName("raritySelect")[0];
        configMinigame = this.getElementsByClassName("minigameToggle")[0];
        configUpdateButton = this.getElementsByClassName("updateSettingsButton")[0];

        // The sliders and value spans
        configPlayerCount = this.getElementsByClassName("playerCountSlider")[0];
        configOutputPlayer = this.getElementsByClassName("playerCountText")[0];

        configMinigameDelay = this.getElementsByClassName("minigameDelaySlider")[0];
        configOutputDelay = this.getElementsByClassName("minigameDelayText")[0];

        // All the "simple" elements
        configTheme = this.getElementsByClassName("themeSelect")[0];
        configRepetition = this.getElementsByClassName("repetitionToggle")[0];
        configRarityMatters = this.getElementsByClassName("rarityMattersToggle")[0];
        configVengeance = this.getElementsByClassName("vengeanceToggle")[0];
        configPhysical = this.getElementsByClassName("physicalToggle")[0];

        // The Drawer Pieces
        drawerButton = this.getElementsByClassName("drawerSettings")[0];
        drawerContents = this.getElementsByClassName("drawerContents")[0];

        // The Update Modal
        updateModal = this.getElementsByClassName("updateModal")[0];
        saveButton = this.getElementsByClassName("saveButton")[0];
        cancelButton = this.getElementsByClassName("cancelButton")[0];

        // Define the Event Handlers
        // configSettingsButton.addEventListener('click', this.setSettingsVisibility.bind(this)); // handled by Drawer
        configListSelect.addEventListener('click', this.setGameControlVisibility.bind(this));
        configSchoolAll.addEventListener('click', this.selectAll.bind(this, configSchoolAll, configSchoolSelect));
        configSchoolSelect.addEventListener('click', this.testSelectAll.bind(this, configSchoolAll, configSchoolSelect));
        configDurationAll.addEventListener('click', this.selectAll.bind(this, configDurationAll, configDurationSelect));
        configDurationSelect.addEventListener('click', this.testSelectAll.bind(this, configDurationAll, configDurationSelect));
        configRarityAll.addEventListener('click', this.selectAll.bind(this, configRarityAll, configRaritySelect));
        configRaritySelect.addEventListener('click', this.testSelectAll.bind(this, configRarityAll, configRaritySelect));
        configMinigame.addEventListener('click', () => {delayDiv.classList.toggle("hiddenPart");});// this.setMinigameDelayVisibility.bind(this,));
        configPlayerCount.addEventListener('input', () => {configOutputPlayer.innerHTML = configPlayerCount.value;});
        configMinigameDelay.addEventListener('input', () => {if (configMinigameDelay.value === 0) {
            configOutputDelay.innerHTML = "Whenever";
            } else {
            configOutputDelay.innerHTML = configMinigameDelay.value;
            }});
        configUpdateButton.addEventListener('click', () => {updateModal.classList.toggle('hiddenPart');});

        // Drawer Handler
        drawerButton.addEventListener('click', this.drawerToggleAction.bind(this));

        // Save Modal
        cancelButton.addEventListener('click', () => {updateModal.classList.toggle('hiddenPart');});
        saveButton.addEventListener('click', this.updateSettings.bind(this));

        // set the "Settings" and "Save" button height and width for fancy drawer CSS
        document.documentElement.style.setProperty('--settings-button-width', `${configSettingsButton.offsetWidth}px`);
        document.documentElement.style.setProperty('--settings-button-height', `${configSettingsButton.offsetHeight}px`);
        document.documentElement.style.setProperty('--update-button-width', `${configUpdateButton.offsetWidth}px`);
        document.documentElement.style.setProperty('--update-button-height', `${configUpdateButton.offsetHeight}px`);

        // Set the initial state
        this.setInitialState();

    }
    drawerToggleAction() {
        drawerContents.classList.toggle('openDrawer'); // trigger the drawer slide in/out
        drawerButton.classList.toggle('drawerClosed'); // change the Settings button state
        drawerButton.classList.toggle('drawerOpen'); // flippity-flip-flop
        configUpdateButton.classList.toggle('drawerUpdateClosed'); // change the Update button state
        configUpdateButton.classList.toggle('drawerUpdateOpen'); // flippity-flip-flop
    }
    setInitialState() { // this is a method in case I need to call it separately
        configOutputPlayer.innerHTML = configPlayerCount.value;
        configOutputDelay.innerHTML = configMinigameDelay.value;
        // this.setSettingsVisibility(); // handled by Drawer
        this.setGameControlVisibility();
    }
    // This is handled by the Drawer functionality
    //
    // setSettingsVisibility() { // configSettingsButton action
    //    if (configSettingsButton.textContent === "Hide Game Settings") {
    //        configSettingsButton.textContent = "Show Game Settings"; 
    //    } else {
    //        configSettingsButton.textContent = "Hide Game Settings";
    //    }
    //    settingsDiv.classList.toggle("hiddenPart");
    //}
    setGameControlVisibility() { // configListSelect action
        switch (configListSelect.options.selectedIndex) {
            case 0: // Micro
                this.hide([themeDiv,schoolDiv,durationDiv,rarityDiv,mattersDiv,repetitionDiv]);
                this.show([vengeanceDiv,minigameDiv]);
                break;
            case 1: // Lite
                this.hide([themeDiv,schoolDiv,durationDiv,rarityDiv,mattersDiv]);
                this.show([vengeanceDiv,minigameDiv,repetitionDiv]);
                break;
            case 2: // Exemplar
                this.hide([schoolDiv,durationDiv,rarityDiv,mattersDiv]);
                this.show([vengeanceDiv,minigameDiv,themeDiv,repetitionDiv]);
                break;
            case 3: // Legacy
                this.hide([minigameDiv,themeDiv,schoolDiv,durationDiv,rarityDiv,mattersDiv]);
                this.show([vengeanceDiv,repetitionDiv]);
                break;
            case 4: // Full
                this.hide([minigameDiv,themeDiv,schoolDiv,durationDiv,rarityDiv,mattersDiv]);
                this.show([vengeanceDiv,repetitionDiv]);
                break;
            case 5: // Custom
                this.hide([themeDiv]);
                this.show([vengeanceDiv,minigameDiv,schoolDiv,durationDiv,rarityDiv,mattersDiv,repetitionDiv]);
        }
    }
    setMinigameDelayVisibility() { // configMinigame action
        if (configMinigame.checked === true) {
            this.hide([delayDiv]);
            /* delayDiv.classList.add("hiddenPart"); */
        } else {
            this.show([delayDiv]);
            /* delayDiv.classList.remove("hiddenPart"); */
        }
    }
    selectAll(allCheck, selectName) { // Reusable selectAll/unselect for ALL checkboxes
        if (allCheck.checked === false) {
            for (let i = 1; i < selectName.options.length; i++) {
                selectName.options[0].selected = true; // selects the first value (to avoid filtering EVERYTHING out)
                selectName.options[i].selected = false; // unselects the rest
            }
        } else {
            for (let i = 0; i < selectName.options.length; i++) {
                selectName.options[i].selected = true; // selects all the options
            }
        }
    }
    testSelectAll(allCheck, selectName) { // Checks if all values are selected, if so, checks ALL
        let allSelected = 0;
            for (let i = 0; i < selectName.options.length; i++) {
                if (selectName.options[i].selected === false) {
                    allSelected++;
                }
            }
        if (allCheck.checked === false && allSelected === 0) {
            allCheck.checked = true;
        } else if (allCheck.checked === true && allSelected !== 0) {
            allCheck.checked = false;
        }
    }
    // saveSettings() { // displays and handles the save modal
        // add click handlers
        
        // show the Save Modal
        // saveModal.classList.toggle('hiddenPart');
    // }
    updateSettings() {

        // here's the structure of settingsPayload
        // settingsPayload = {
        //     players: null, // any
        //     list: null, // any
        //     physical: null, // any
        //     theme: null, // string
        //     school: null, // any[]
        //     duration: null, // any[]
        //     rarity: null, // any[]
        //     repetition: null, // any
        //     rarityMatters: null, // any
        //     vengeance: null, // any
        //     minigame: null, // any
        //     minigameDelay: null // any
        // }
        // capture config
        let customPayload = {
                    players: configPlayerCount.value, // any
                    list: configListSelect.value, // any
                    physical: configPhysical.checked, // any
                    theme: configTheme.value, // string
                    school: configSchoolSelect.value, // any[]
                    duration: configDurationSelect.value, // any[]
                    rarity: configRaritySelect.value, // any[]
                    repetition: configRepetition.checked, // any
                    rarityMatters: configRarityMatters.checked, // any
                    vengeance: configVengeance.checked, // any
                    minigame: configMinigame.checked, // any
                    minigameDelay: configMinigameDelay.value // any
                }
        // set settingsPayload
        shared.setSettingsPayload(customPayload);
        // update the gameList
        shared.updateGameList();
        // Send the "settings updated" event
        const settingsUpdated = new Event('settingsUpdate');
        window.dispatchEvent(settingsUpdated);
        // hide Update Modal and close Settings drawer
        updateModal.classList.toggle('hiddenPart');
        this.drawerToggleAction();
    }
    // Utility! -----------------------
    hide(elementArray) {
        for (const element of elementArray) {
            if (!element.classList.contains('hiddenPart')) {
                element.classList.add('hiddenPart');
            }
        }
    }
    show(elementArray) {
        for (const element of elementArray) {
            if (element.classList.contains('hiddenPart')) {
                element.classList.remove('hiddenPart');
            }
        }
    }
}

export const registerSettingsComponent = () => {
    customElements.define('z-settings', SettingsComponent);
}