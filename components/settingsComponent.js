// do i need to import the helpbox here?

import { registerHelpBoxComponent } from '../components/helpBoxComponent.js';

// Page Content as Component?

const settingsTemplate = document.createElement('template');
settingsTemplate.innerHTML = `
        <div id="settingsContainer" class="configBlock">
                <button type="button" id="gameSettingsButton">Hide Game Settings</button>
            <div id="gameSettings">
            <p>Configure your Chaos!</p>
            <div class="settingGroup" id="settingBasics">
                <div id="playerCountSetting" class="settingContainer">
                    <label for="playerCount">How many players?</label>
                    <input type="range" class="slider" id="playerCountSlider" min="4" max="10" value="2"><span id="playerCountText"></span>
                     <z-hb>Some effects work better (or only work) in games with three or more players.</z-hb>
                </div>
                <div id="listSetting" class="settingContainer">
                    <label for="listSelect">Choose a list:</label>
                    <select type="select-one" id="listSelect" size="6" style="overflow: hidden">
                        <option value="micro">Micro</option>
                        <option value="lite" selected>Lite</option>
                        <option value="exemplar">Exemplar</option>
                        <option value="legacy">Legacy</option>
                        <option value="full">Full</option>
                        <option value="custom">Custom</option>
                    </select>
                    <z-hb>The List has had several "collections" over the years. Pick one or define your own.</z-hb>
                </div>
                <div id="themeSetting" class="settingContainer">
                    <label for="themeSelect">Exemplar Theme Table</label>
                    <select type="select-one" id="themeSelect" size="8" style="overflow: hidden">
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
                <div id="schoolSetting" class="settingContainer">
                    <label for="schoolSelect">Choose included schools of magic (Shift and Ctrl click to select multiple)</label>
                    <label for="allSchoolsToggle">All</label>
                    <input type="checkbox" id="allSchoolsToggle" value="allSchools" checked/>
                    <select type="select-multiple" id="schoolSelect" size="9" multiple style="overflow: hidden">
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
                <div id="durationSetting" class="settingContainer">
                    <label for="durationSelect">Choose included durations of effects (Shift and Ctrl click to select multiple)</label>
                    <label for="allDurationsToggle">All</label>
                    <input type="checkbox" id="allDurationsToggle" value="allDurations" checked/>
                    <select type="select-multiple" id="durationSelect" size="4" multiple style="overflow: hidden">
                        <option value="instant" selected>Instant</option>
                        <option value="turn" selected>Turn</option>
                        <option value="round" selected>Round</option>
                        <option value="ongoing" selected>Ongoing</option>
                    </select>
                    <z-hb>TEXT EXPLAINING DURATION</z-hb>
                </div>
                <div id="raritySetting" class="settingContainer">
                    <label for="raritySelect">Choose included rarity of effects (Shift and Ctrl click to select multiple)</label>
                    <label for="allRaritiesToggle">All</label>
                    <input type="checkbox" id="allRaritiesToggle" value="allRarities" checked/>
                    <select type="select-multiple" id="raritySelect" size="4" multiple style="overflow: hidden">
                        <option value="common" selected>Common</option>
                        <option value="uncommon" selected>Uncommon</option>
                        <option value="rare" selected>Rare</option>
                        <option value="mythic" selected>Mythic</option>
                    </select>
                    <z-hb>TEXT EXPLAINING RARITY</z-hb>
                </div>
                </div>
                <div class="settingGroup" id="settingRandomizer">
                <div id="repetitionSetting" class="settingContainer">
                    <label for="repetitionToggle">Repeat Effects?</label>
                    <input type="checkbox" id="repetitionToggle" value="repetition" checked/>
                    <z-hb>Allow effects to occur more than once in a game.</z-hb>
                </div>
                <div id="rarityMattersSetting" class="settingContainer">
                    <p>
                    <label for="rarityMattersToggle">Rarity Matters?</label>
                    <input type="checkbox" id="rarityMattersToggle" value="rarityMatters"/>
                    <z-hb>Controls randomizer: effects occur more or less frequently depending on their rarity.</z-hb>
                </div>
                </div>
                <div class="settingGroup" id="settingExtras">
                <div id="physicalSetting" class="settingContainer">
                    <label for="physicalToggle">Physical</label>
                    <input type="checkbox" id="physicalToggle" value="physical" checked/>
                    <z-hb>Some effects involve physical activity that may not be accessible for all players.</z-hb>
                </div>
                <div id="vengeanceSetting" class="settingContainer">
                    <label for="vengeanceToggle">Vengeance 
                        <div class="toggleBox">
                            <input type="checkbox" id="vengeanceToggle" value="vengeance" checked/>
                            <span class="slide"></span>
                        </div>
                    </label>
                    <z-hb>When a player would lose the game, they roll Vengeance. This <i>might</i> keep them in the game.</z-hb>
                </div>
                <div id="minigameSetting" class="settingContainer">
                    <label for="minigameToggle">Minigames</label>
                    <input type="checkbox" id="minigameToggle" value="minigame"/>
                    <div id="minigameDelaySetting" style="display:none">
                        <label for="minigameDelaySlider">Turns between minigames</label>
                        <input type="range" class="slider" id="minigameDelaySlider" min="0" max="10" value="4"><span id="minigameDelayText" style="display: none"></span>
                    </div>
                    <z-hb>Minigames are more complicated effects that may pull attention away from the game. If you wish to play with them, you can set a round timer between minigames or choose to manually trigger one when you feel like it.</z-hb>
                </div>
                </div>
                <div id="updateGame">
                    <button type="button" id="updateSettingsButton">Update Game Settings</button> This will reset the current game!
                </div>
            </div>
            </div>
`;

class SettingsComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    render() {
        registerHelpBoxComponent();
        this.append(settingsTemplate.content.cloneNode(true)) // I _think_ this'll clone the template and append it to the contents in the HTML?

    }
}

export const registerSettingsComponent = () => {
    customElements.define('z-settings', SettingsComponent);
}