// do i need to import the helpbox here?

import { registerHelpBoxComponent } from '../components/helpBoxComponent.js';

// Page Content as Component?

const settingsTemplate = document.createElement('template');
// templates don't play nice with element ids
// since they can be replicated on the page, and the id must be unique, that'll cause problems if the section is duplicated
// this template will only be used once, so I think I can get away with it
// for the effect template, I'll need to write a unique ID function so they can be properly referenced

// I've moved the id's for most elements into the class instead
// The exceptions are the labeled pieces, because label's for= uses the id

settingsTemplate.innerHTML = `
        <div class="settingsContainer configBlock">
                <button type="button" class="gameSettingsButton">Hide Game Settings</button>
            <div class="gameSettings">
            <p>Configure your Chaos!</p>
            <div class="settingBasics settingGroup">
                <div class="playerCountSetting settingContainer">
                    <label for="playerCount">How many players?</label>
                    <input id="playerCountSlider" class="playerCountSlider slider" type="range" min="4" max="10" value="2"><span class="playerCountText"></span>
                     <z-hb>Some effects work better (or only work) in games with three or more players.</z-hb>
                </div>
                <div class="listSetting settingContainer">
                    <label for="listSelect">Choose a list:</label>
                    <select id="listSelect" class="listSelect" type="select-one" size="6" style="overflow: hidden">
                        <option value="micro">Micro</option>
                        <option value="lite" selected>Lite</option>
                        <option value="exemplar">Exemplar</option>
                        <option value="legacy">Legacy</option>
                        <option value="full">Full</option>
                        <option value="custom">Custom</option>
                    </select>
                    <z-hb>The List has had several "collections" over the years. Pick one or define your own.</z-hb>
                </div>
                <div class="themeSetting settingContainer">
                    <label for="themeSelect">Exemplar Theme Table</label>
                    <select id="themeSelect" class="themeSelect" type="select-one" size="8" style="overflow: hidden">
                        <option value="tokenizer" selected>Tokenizer</option>
                        <option value="complexity">Complexity</option>
                        <option value="soundalike">Sound-Alike</option>
                        <option value="prodigal">Prodigal</option>
                        <option value="beat">Beat</option>
                        <option value="university">University</option>
                        <option value="toxin">Toxin</option>
                        <option value="badthings">Bad Things</option>
                    </select>
                    <z-hb>The Exemplar Chaos List involves a themed sub-list for some effects. Choose your theme table.</z-hb>
                </div>
                <div class="schoolSetting settingContainer">
                    <label for="schoolSelect">Choose included schools of magic (Shift and Ctrl click to select multiple)</label>
                    <label for="allSchoolsToggle">All</label>
                    <input id="allSchoolsToggle" class="allSchoolsToggle" type="checkbox" checked/>
                    <select id="schoolSelect" class="schoolSelect" type="select-multiple" size="9" multiple style="overflow: hidden">
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
                    <z/hb>Every effect belongs to one or more schools of magic. Choose which sorts of effects to include.</z-hb>
                </div>
                <div class="durationSetting settingContainer">
                    <label for="durationSelect">Choose included durations of effects (Shift and Ctrl click to select multiple)</label>
                    <label for="allDurationsToggle">All</label>
                    <input id="allDurationsToggle" class="allDurationsToggle" type="checkbox" checked/>
                    <select id="durationSelect" class="durationSelect" type="select-multiple" size="4" multiple style="overflow: hidden">
                        <option value="instant" selected>Instant</option>
                        <option value="turn" selected>Turn</option>
                        <option value="round" selected>Round</option>
                        <option value="ongoing" selected>Ongoing</option>
                    </select>
                    <z-hb>TEXT EXPLAINING DURATION</z-hb>
                </div>
                <div class="raritySetting settingContainer">
                    <label for="raritySelect">Choose included rarity of effects (Shift and Ctrl click to select multiple)</label>
                    <label for="allRaritiesToggle">All</label>
                    <input id="allRaritiesToggle" class="allRaritiesToggle" type="checkbox" checked/>
                    <select id="raritySelect" class="raritySelect" type="select-multiple" size="4" multiple style="overflow: hidden">
                        <option value="common" selected>Common</option>
                        <option value="uncommon" selected>Uncommon</option>
                        <option value="rare" selected>Rare</option>
                        <option value="mythic" selected>Mythic</option>
                    </select>
                    <z-hb>TEXT EXPLAINING RARITY</z-hb>
                </div>
                </div>
                <div class="settingRandomizer settingGroup">
                <div class="repetitionSetting settingContainer">
                    <label for="repetitionToggle">Repeat Effects?</label>
                    <input id="repetitionToggle" class="repetitionToggle" type="checkbox" checked/>
                    <z-hb>Allow effects to occur more than once in a game.</z-hb>
                </div>
                <div class="rarityMattersSetting settingContainer">
                    <p>
                    <label for="rarityMattersToggle">Rarity Matters?</label>
                    <input id="rarityMattersToggle" class="rarityMattersToggle" type="checkbox"/>
                    <z-hb>Controls randomizer: effects occur more or less frequently depending on their rarity.</z-hb>
                </div>
                </div>
                <div class="settingExtras settingGroup">
                <div class="physicalSetting settingContainer">
                    <label for="physicalToggle">Physical</label>
                    <input id="physicalToggle" class="physicalToggle" type="checkbox" checked/>
                    <z-hb>Some effects involve physical activity that may not be accessible for all players.</z-hb>
                </div>
                <div class="vengeanceSetting settingContainer">
                    <label for="vengeanceToggle">Vengeance</label>
                    <input id="vengeanceToggle" class="vengeanceToggle" type="checkbox" checked/>
                    <z-hb>When a player would lose the game, they roll Vengeance. This <i>might</i> keep them in the game.</z-hb>
                </div>
                <div class="minigameSetting settingContainer">
                    <label for="minigameToggle">Minigames</label>
                    <input id="minigameToggle" class="minigameToggle" type="checkbox"/>
                    <div class="minigameDelaySetting" style="display:none">
                        <label for="minigameDelaySlider">Turns between minigames</label>
                        <input id="minigameDelaySlider" class="minigameDelaySlider slider" type="range" min="0" max="10" value="4">
                        <span class="minigameDelayText" style="display: none"></span>
                    </div>
                    <z-hb>Minigames are more complicated effects that may pull attention away from the game. If you wish to play with them, you can set a round timer between minigames or choose to manually trigger one when you feel like it.</z-hb>
                </div>
                </div>
                <div class="updateGame">
                    <button class="updateSettingsButton" type="button">Update Game Settings</button> This will reset the current game!
                </div>
            </div>
            </div>
`;

class SettingsComponent extends HTMLElement {
    constructor() {
        super();
        // define the constants so they can be referenced across methods
        // "settingsContainer"
        const settingsDiv = null;
            // "settingBasics"
                // "playerCountSetting"
                // "listSetting"
                const themeDiv = null;
                const schoolDiv = null;
                const durationDiv = null;
                const rarityDiv = null;
            // "settingRandomizer"
                const repetitionDiv = null;
                const mattersDiv = null;
            // "settingExtras"
                // "physicalSetting"
                const vengeanceDiv = null;
                const minigameDiv = null;
                const delayDiv = null;
            // "updateGame"

        // All the elements with onClicks
        const configSettingsButton = null;
        const configListSelect = null;
        const configSchoolAll = null;
        const configSchoolSelect = null;
        const configDurationAll = null;
        const configDurationSelect = null;
        const configRarityAll = null;
        const configRaritySelect = null;
        const configMinigame = null;
        const configSaveButton = null;

        // The sliders and value spans
        const configPlayerCount = null;
        const configOutputPlayer = null;

        const configMinigameDelay = null;
        const configOutputDelay = null;

        // All the "simple" elements
        const configTheme = null;
        const configRepetition = null;
        const configRarityMatters = null;
        const configVengeance = null;
        const configPhysical = null;

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
        configSaveButton = this.getElementsByClassName("updateSettingsButton")[0];

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

        // Define the Event Handlers
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
        configSaveButton.addEventListener('click', saveSettings());

        // Set the initial state
        this.setInitialState();

    }
    setInitialState() { // this is a method in case i need to call it separately
        configOutputPlayer.innerHTML = configPlayerCount.value;
        configOutputDelay.innerHTML = configMinigameDelay.value;
        setSettingsVisibility();
        setGameControlVisibility();
    }
}

export const registerSettingsComponent = () => {
    customElements.define('z-settings', SettingsComponent);
}