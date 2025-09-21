// This holds the main gamestate and all the little pieces of it.
// pretty sure I need to import the bits...

import { registerEffectComponent } from './effectComponent.js';
import { registerFlipCoinComponent } from './flipCoinComponent.js';
import { registerOngoingComponent } from './ongoingComponent.js';
import { registerInlineSymbolComponent } from './inlineSymbolComponent.js';
import { registerRollButtonComponent } from './rollButtonComponent.js';
// pull in the shared assets
import * as shared from '../scripts/sharedAssets.js';

// import { settingsPayload } from '../scripts/index.js'; // settings
// import { gameList } from '../scripts/index.js'; // filtered game list
// import { generatedEffect } from '../scripts/index.js'; // global generated effect

// let's build a template!
const gameTemplate = document.createElement('template');
gameTemplate.innerHTML = `
<div class="gameField drawerContainer">
<div class="welcomeModal">
<div class="welcomeTitle">
Welcome to Chaos Magic
</div>
<div class="welcomeDecription">
Meaningful intro text here. Really, choose a quick start or configure your game.
</div>
<div class="welcomeColumns">
<div class="welcomeDetail">
<button type="button" class="welcomeButton defaultButton">Quick Start</button>
<ul>
<li>4 players</li>
<li>Chaos Lite (120)</li>
<li>Vengeance: On</li>
<li>Minigames: Off</li>
<li>Repetition: On</li>
</ul>
</div>
<div class="welcomeDetail">
<button type="button" class="welcomeButton customizeButton">Custom Chaos</button>
<ul>
<li>Variable player count</li>
<li>Choose-a-List</li>
<li>Filter included effects</li>
<li>Tweak randomizer</li>
</ul>
</div>
</div>
</div>
<div class="visiblePart">
<z-oe></z-oe>
<div class="activeContainer">active cont</div>
<div class="minigameModal">
<div class="minigameContent">
Minigame Content
</div>
<button type="button" class="minigameCloseButton">Done</button></div>
</div>
<div class="vengeanceModal">
<div class="vengeanceContent">
Vengeance Content
</div>
<button type="button" class="vengeanceCloseButton">Done</button></div>
</div>
<div class="controlContainer">
<div class="buttonWrapper">
<!-- div class="rollControl" -->
<button type="button" class="controlButton rollButton"></button>
<!-- /div -->
<!-- div class="minigameControl" -->
<button type="button" class="controlButton minigameButton"></button><!-- /div -->
<!-- div class="vengeanceControl" -->
<button type="button" class="controlButton vengeanceButton"></button><!-- /div -->
<!-- div class="historyControlPlaceholder" --><!-- /div -->
</div>
</div>
</div>
<div class="historyDrawer">
<button type="button" class="historyButton drawerToggle drawerClosed"></button>
<div class="historyContainer drawerContents"><div class="histGameStart">Game Start</div></div>
</div>
</div>
`;

// notes:

// Initial state:
// active = empty
// history = empty
// roll = visible
// vengeance = setting
// minigame = setting

// Main flow:
// Roll is clicked
// if activeEffect exists, move to history (visual note: slide historyDrawer up just enough to see the old effect add to it, then close it again)
// generate newEffect, add to active
// increment turn counter

// vengeance flow:
// vengeance is clicked
// if vengeanceEffect exists, remove it from vengeanceModal
// generate vengeanceEffect, add to vengeanceModal
// display vengeanceModal
// when "vengeance complete" is clicked, hide vengeanceModal

// minigame flow
// (pretty much just the same as vengeance)

// Defining elements (not as complex as Settings!)
let gameField = null;
    let welcomeModal = null;
        let defaultButton = null;
        let customizeButton = null;
    let visiblePart = null;
        let activeContainer = null;
        let minigameModal = null;
            let minigameContent = null;
            let minigameCloseButton = null;
        let vengeanceModal = null;
            let vengeanceContent = null;
            let vengeanceCloseButton = null;
        let controlContainer = null;
            let rollControl = null;
                let rollButton = null;
            let minigameControl = null;
                let minigameButton = null;
            let vengeanceControl = null;
                let vengeanceButton = null;
            let historyControlPlaceholder = null;
    let historyDrawer = null;
        let historyButton = null;
        let historyContainer = null;

// The Drawer Pieces
    let drawerButton = null;
    let drawerContents = null;
// Settings, in case I need it?
    let settingsBlock = null;

// Gamestate counters
    let rollCounter = 0;
    let minigameCounter = 0;

class GameComponent extends HTMLElement {
    constructor() {
        super();
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        registerEffectComponent(); // get the effectComponent in here
        registerFlipCoinComponent(); // get the coinFlip in here
        registerOngoingComponent(); // get the ongoing Effect drawer in here
        registerInlineSymbolComponent(); // get the inline Symbols in here
        registerRollButtonComponent(); // get the roll button in here
        this.append(gameTemplate.content.cloneNode(true)); // clone the template and stick it in the DOM
        // after it's in the DOM, initialize the element references
        gameField = this.getElementsByClassName("gameField")[0];
            welcomeModal = this.getElementsByClassName("welcomeModal")[0];
                defaultButton = this.getElementsByClassName("defaultButton")[0];
                customizeButton = this.getElementsByClassName("customizeButton")[0];
            visiblePart = this.getElementsByClassName("visiblePart")[0];
                activeContainer = this.getElementsByClassName("activeContainer")[0];
                minigameModal = this.getElementsByClassName("minigameModal")[0];
                    minigameContent = this.getElementsByClassName("minigameContent")[0];
                    minigameCloseButton = this.getElementsByClassName("minigameCloseButton")[0];
                vengeanceModal = this.getElementsByClassName("vengeanceModal")[0];
                    vengeanceContent = this.getElementsByClassName("vengeanceContent")[0];
                    vengeanceCloseButton = this.getElementsByClassName("vengeanceCloseButton")[0];
                controlContainer = this.getElementsByClassName("controlContainer")[0];
                    rollControl = this.getElementsByClassName("rollControl")[0];
                        rollButton = this.getElementsByClassName("rollButton")[0];
                    minigameControl = this.getElementsByClassName("minigameControl")[0];
                        minigameButton = this.getElementsByClassName("minigameButton")[0];
                    vengeanceControl = this.getElementsByClassName("vengeanceControl")[0];
                        vengeanceButton = this.getElementsByClassName("vengeanceButton")[0];
                    historyControlPlaceholder = this.getElementsByClassName("historyControlPlaceholder")[0];
            historyDrawer = this.getElementsByClassName("historyDrawer")[0];
                historyButton = this.getElementsByClassName("historyButton")[0];
                historyContainer = this.getElementsByClassName("historyContainer")[0];
        // The Drawer Pieces
        drawerButton = this.getElementsByClassName("drawerToggle")[0];
        drawerContents = this.getElementsByClassName("drawerContents")[0];
        // const drawerContainer = this.getElementsByClassName("gameDrawerContainer")[0];
        // Drawer Handler
        drawerButton.addEventListener('click', () => {
            drawerContents.classList.toggle('openDrawer'); // trigger the drawer slide in/out
            drawerButton.classList.toggle('drawerClosed'); // change the History button state
            drawerButton.classList.toggle('drawerOpen'); // flippity-flip-flop
        });
        // set the "History" button height and width for fancy drawer CSS
        document.documentElement.style.setProperty('--history-button-width', `${historyButton.offsetWidth}px`);
        document.documentElement.style.setProperty('--history-button-height', `${historyButton.offsetHeight}px`);

        // settings reference, because fancy
        settingsBlock = document.getElementsByClassName('settingsBlock')[0];
        // time for event handlers!
        defaultButton.addEventListener('click',this.defaultsClick.bind(this));
        customizeButton.addEventListener('click',this.customizeClick.bind(this));
        minigameCloseButton.addEventListener('click',this.closeMinigameClick.bind(this));
        vengeanceCloseButton.addEventListener('click',this.closeVengeanceClick.bind(this));
        rollButton.addEventListener('click',this.rollClick.bind(this));
        minigameButton.addEventListener('click',this.minigameClick.bind(this));
        vengeanceButton.addEventListener('click',this.vengeanceClick.bind(this));
        // settings update listener
        window.addEventListener('settingsUpdate', this.settingsUpdatedHandler.bind(this));

        // start things off!
        this.initiateChaos();
    }

    // INITIAL STATE -----------------------
    initiateChaos() {
        // hide game controls and history
        // this.hide(visiblePart);
        // this.hide(controlContainer);
        // this.hide(historyDrawer);
        // hide minigame and vengeance modals
        // this.hide(minigameModal);
        // this.hide(vengeanceModal);
        // hide settings
        // this.hide(settingsBlock);
        this.hide([visiblePart,controlContainer,historyDrawer,minigameModal,vengeanceModal,settingsBlock]);
        // display welcomeModal
        this.show([welcomeModal]);
    }
    customizeClick() {
        // hide welcomeModal
        this.hide([welcomeModal]);
        // show settings
        this.show([settingsBlock]);
        // trigger "settingsButton" click
        const clickSettings = new Event('click');
        document.getElementsByClassName('gameSettingsButton')[0].dispatchEvent(clickSettings);
    }
    settingsUpdatedHandler() {
        // hide welcomeModal (no effect if past initial state)
        this.hide([welcomeModal]);
        
        // activate game controls (no effect is past initial state)
        this.show([visiblePart,controlContainer,historyDrawer]);
        // this.show(controlContainer);
        // this.show(historyDrawer);
        
        // reset Gamestate Counters
        this.initializeGame();
    }
    defaultsClick() {
        // load preset into settingsPayload
        let defaultPayload = {
            players: 4, // any
            list: 'lite', // any
            physical: true, // any
            theme: null, // string
            school: null, // any[]
            duration: null, // any[]
            rarity: null, // any[]
            repetition: true, // any
            rarityMatters: false, // any
            vengeance: true, // any
            minigame: false, // any
            minigameDelay: null // any
        };
        console.log('Default Payload ', defaultPayload);
        // set settingsPayload
        console.log('settings payload before default set ', shared.getSettingsPayload());
        shared.setSettingsPayload(defaultPayload);
        console.log('settings payload after default set ', shared.getSettingsPayload());
        // call list generator
        shared.updateGameList();
        // call randomizer update
        this.initializeGame();
    }
    initializeGame() {
        // hide the Welcome Modal
        this.hide([welcomeModal]);
        // show the game UI
        this.show([settingsBlock,visiblePart,controlContainer,historyDrawer]);
        // call list generator
        shared.updateGameList();
        shared.updateRandomizerConfig();
        // handle vengeance setting
        if (shared.getSettingsPayload().vengeance) {
            shared.updateVengList(); // make the vengeance list
            shared.updateWeightedVeng(); // make the weighted vengeance array
            this.show[vengeanceControl];
        } else {
            this.hide[vengeanceControl];
        }
        // handle minigame setting
        if (shared.getSettingsPayload().minigame) {
            shared.updateMiniList(); // make the minigame list
            this.show[minigameControl];
        } else {
            this.hide[minigameControl];
        }
        // wipe active effect
        activeContainer.innerHTML = '';
        // wipe history
        historyContainer.innerHTML = '<div class="histGameStart">Game Start</div>';
        shared.setRollCounter(0);
        shared.setMinigameCounter(0);
        shared.setActivePlayers(shared.getSettingsPayload().players);
    }
    // GAME CONTROLS -----------------------
    rollClick() { // assuming one click per player turn
        // send the "newRoll" event
        const newRoll = new Event('newRoll');
        window.dispatchEvent(newRoll);
        // increment rollCounter
        shared.setRollCounter(shared.getRollCounter() + 1);
        // poke the randomizer to update generatedEffect
        // this.randomizer
        // move the current active effect to history
        if (activeContainer.firstElementChild) {
            this.moveActiveToHistory();
        }

        // LET TRY IT!

        if (shared.getNewEffect()) { // if there's a current new effect... 
            shared.setPreviousEffect(shared.getNewEffect()) // set it to the previous effect
        }
        shared.setNewEffect(shared.getRandomEffect()); // trip the randomizer...
        // ONCE THE EFFECT COMPONENT IS BUILT, THIS'LL PUT THE TRIGGER TAG INTO THE ACTIVE CONTAINER:
        // OKAY, Going to TRY IT! (committing current state first)
        activeContainer.innerHTML = '<z-eff></z-eff>';
        /* let localEffect = shared.getNewEffect(); // then get the newEffect...
        // put the newEffect into a TOTALLY PLACEHOLDER THING
        activeContainer.innerHTML = `
        <div class="testEffect"><b>${localEffect.displayNum} ${localEffect.effectName}</b> <i>${localEffect.shortDesc}</i><br>${localEffect.fullDesc}`;
 */
        // this.moveActiveToHistory();
        // create a new effect in activeContainer

        // ** CURRENTLY A PLACEHOLDER FOR TESTING
        // activeContainer.innerHTML = `<div class="testEffect">Oh gosh, looks like roll number ${shared.getRollCounter()}! Do the inline symbols work? <z-is>WUBRG</z-is> and for an effect: <z-is>1</z-is>, <z-is>T</z-is>: do a thing! MORE! <z-is>TXICS0123EEEE</z-is> Let's try rolling <z-rb>2d6</z-rb>, <z-rb>1d10+20</z-rb>, <z-rb>1d4+2d6</z-rb>, <z-rb>direction</z-rb>, <z-rb>color</z-rb>, <z-rb>mana type</z-rb>, <z-rb>color or colorless</z-rb>, <z-rb>basic land</z-rb>, <z-rb>basic and wastes</z-rb>, <z-rb>land type</z-rb>, <z-rb>any basic land</z-rb>, <z-rb>landwalk</z-rb>, <z-rb>permanent</z-rb>, <z-rb>walk</z-rb> inline.</div>`;
        // took out "as well as flipping a coin.<z-fc></z-fc>" until I'm ready to dive in to troubleshooting that...
        // increment minigameTimer
        shared.setMinigameCounter(shared.getMinigameCounter() + 1);
    }
    moveActiveToHistory() { // here's moving the active effect to the top of the history section:
        const moveEffect = activeContainer.firstElementChild; // get the first (and only) div in the active container
        historyContainer.insertBefore(moveEffect, historyContainer.firstElementChild); // reparent the effect to the top of the history container
    }
    vengeanceClick() {
        // poke the vengeanceRandomizer
        // update the vengeanceModal contents
        // display the vengeanceModal
        vengeanceContent.innerHTML = this.vengRand();
        this.show([vengeanceModal]);
    }
    vengRand() {
    // the new, new version, with sharedAssets scripting
    shared.getRandomVengEffect();
    let localVengEffect = shared.getNewVengEffect();
    return `
    <div class="vengEffect"><div class="vengRoll">${localVengEffect.roll}</div><div class="vengContent"><div class="vengTitle">${localVengEffect.effectName}</div><div class="vengBody">${localVengEffect.fullDesc}</div></div></div>`; // send back the innerHTML
    }
    closeVengeanceClick() {
        if (vengeanceContent.firstElementChild) {
            this.moveVengeanceToHistory();
        }
        // hide the vengeanceModal
        this.hide([vengeanceModal]);
        // move the effect to the History list
        // this.moveVengeanceToHistory();
    }
    moveVengeanceToHistory() { // here's moving the vengeance effect to the top of the history section:
        const moveEffect = vengeanceContent.firstElementChild; // get the first (and only) div in the vengeance container
        historyContainer.insertBefore(moveEffect, historyContainer.firstElementChild); // reparent the effect to the top of the history container
    }
    minigameClick() {
        // poke the minigameRandomizer
        // update the minigameModal contents
        // display the minigameModal
        minigameContent.innerHTML = this.miniRand();
        this.show([minigameModal]);
    }
    miniRand() {
    // the new, new version, with sharedAssets scripting
    shared.getRandomMiniEffect();
    let localMiniEffect = shared.getNewMiniEffect();
    return `
    <div class="miniEffect"><div class="miniRoll">${localMiniEffect.roll}</div><div class="miniContent"><div class="miniTitle">${localMiniEffect.effectName}</div><div class="miniBody">${localMiniEffect.fullDesc}</div></div></div>`; // send back the innerHTML
    }
    closeMinigameClick() {
        if (minigameContent.firstElementChild) {
            this.moveMinigameToHistory();
        }
        // hide the minigameModal
        this.hide([minigameModal]);
        // reset the minigameTimer
    }
    moveMinigameToHistory() { // here's moving the minigame effect to the top of the history section:
        const moveEffect = minigameContent.firstElementChild; // get the first (and only) div in the minigame container
        historyContainer.insertBefore(moveEffect, historyContainer.firstElementChild); // reparent the effect to the top of the history container
    }
    nextTurn() {
        // minigame timer
        // check active effects
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







// aaaaand the exported register:

export const registerGameComponent = () => {
    customElements.define('z-game', GameComponent);
}