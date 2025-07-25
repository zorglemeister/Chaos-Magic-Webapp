// This holds the main gamestate and all the little pieces of it.
// pretty sure I need to import the bits...

import { registerEffectComponent } from './effectComponent.js';

// let's build a template!
const gameTemplate = document.createElement('template');
gameTemplate.innerHTML = `
<div class="gameField drawerContainer visibleBlueBorder">
<div class="initialModal modalFrame">
<button type="button" class="defaultButton">Use Defaults</button>
<button type="button" class="customizeButton">Open Settings</button>
</div>
<div class="visiblePart visibleBorder">
<div class="activeContainer">active cont</div>
<div class="minigameModal">Minigame Cont
<button type="button" class="minigameCloseButton">Done</button></div>
</div>
<div class="vengeanceModal">vengeance cont
<button type="button" class="vengeanceCloseButton">Done</button></div>
</div>
<div class="controlContainer visibleBorder">
<div class="rollControl">
<button type="button" class="rollButton">Roll</button>
</div>
<div class="minigameControl">
<button type="button" class="minigameButton">Minigame</button></div>
<div class="vengeanceControl">
<button type="button" class="vengeanceButton">Vengeance</button></div>
<div class="historyControlPlaceholder"></div>
</div>
</div>
<div class="historyDrawer  visibleGreenBorder">
<button type="button" class="historyButton drawerToggle drawerClosed"></button>
<div class="historyContainer drawerContents">hist Cont</div>
</div>
</div>
`

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
// vengeace is clicked
// if vengeanceEffect exists, remove it from vengeanceModal
// generate vengeanceEffect, add to vengeanceModal
// display vengeanceModal
// when "vengeance complete" is clicked, hide vengeanceModal

// minigame flow
// (pretty much just the same as vengeance)

// Defining elements (not as complex as Settings!)
let gameField = null;
    let initialModal = null;
        let defaultButton = null;
        let customizeButton = null;
    let visiblePart = null;
        let activeContainer = null;
        let minigameModal = null;
            let minigameCloseButton = null;
        let vengeanceModal = null;
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
// Settings, in case i need it?
    let settingsBlock = null;

class GameComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    render() {
        registerEffectComponent(); // get the effectComponent in here
        this.append(gameTemplate.content.cloneNode(true)); // clone the template and stick it in the DOM
        // after it's in the DOM, initialize the element references
        gameField = this.getElementsByClassName("gameField")[0];
            initialModal = this.getElementsByClassName("initialModal")[0];
                defaultButton = this.getElementsByClassName("defaultButton")[0];
                customizeButton = this.getElementsByClassName("customizeButton")[0];
            visiblePart = this.getElementsByClassName("visiblePart")[0];
                activeContainer = this.getElementsByClassName("activeContainer")[0];
                minigameModal = this.getElementsByClassName("minigameModal")[0];
                    minigameCloseButton = this.getElementsByClassName("minigameCloseButton")[0];
                vengeanceModal = this.getElementsByClassName("vengeanceModal")[0];
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
        this.hide(visiblePart);
        this.hide(historyDrawer);
        // hide settings
        this.hide(settingsBlock);
        // display initialModal
        this.show(initialModal);
    }
    customizeClick() {
        // hide initialModal
        this.hide(initialModal);
        // show settings
        this.show(settingsBlock);
        // trigger "settingsButton" click
        const clickSettings = new Event('click');
        document.getElementsByClassName('gameSettingsButton')[0].dispatchEvent(clickSettings);
    }
    settingsUpdatedHandler() {
        // hide initialModal (no effect if past initial state)
        this.hide(initialModal);
        // wipe active effect
        activeContainer.innerHTML = '';
        // wipe history
        historyContainer.innerHTML = '';
        // activate game controls (no effect is past initial state)
        this.show(visiblePart);
        this.show(historyDrawer);
        // call list generator
    }
    defaultsClick() {
        // load preset into settingsPayload
        // call list generator
        // call randomizer update
        // activate game controls
        this.show(visiblePart);
        this.show(historyDrawer);
        // hide initialModal
        this.hide(initialModal);
    }

    // GAME CONTROLS -----------------------
    rollClick() { // assuming one click per player turn
        // poke the randomizer to update generatedEffect
        // move the current active effect to history
        // this.moveActiveToHistory();
        // create a new effect in activeContainer
        // increment minigameTimer
    }
    moveActiveToHistory() { // here's moving the active effect to the top of the history section:
        const activeEffect = document.getElementById('activeContainer').firstChild; // get the first (and only) div in the active container
        const historyTarget = document.getElementById('historyContainer'); // get the history container
        historyTarget.insertBefore(activeEffect, historyTarget.firstChild); // reparent the effect to the top of the history container
    }
    vengeanceClick() {
        // poke the vengeanceRandomizer
        // update the vengeanceModal contents
        // display the vengeanceModal
        this.show(vengeanceModal);
    }
    closeVengeanceClick() {
        // hide the vengeanceModal
        this.hide(vengeanceModal);
    }
    minigameClick() {
        // poke the minigameRandomizer
        // update the minigameModal contents
        // display the minigameModal
        this.show(minigameModal);
    }
    closeMinigameClick() {
        // hide the minigameModal
        this.hide(minigameModal);
        // reset the minigameTimer
    }

    // Utility! -----------------------
    hide(elementName) {
        if (!elementName.classList.contains('hiddenPart')) {
            elementName.classList.add('hiddenPart');
        }
    }
    show(elementName) {
        if (elementName.classList.contains('hiddenPart')) {
            elementName.classList.remove('hiddenPart');
        }
    }
}







// aaaaand the exported register:

export const registerGameComponent = () => {
    customElements.define('z-game', GameComponent);
}