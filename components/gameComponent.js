// This holds the main gamestate and all the little pieces of it.
// pretty sure I need to import the bits...

import { registerEffectComponent } from './effectComponent.js';

// let's build a template!
const gameTemplate = document.createElement('template');
gameTemplate.innerHTML = `
<div class="gameField">
<div class="visiblePart">
<div class="activeContainer"></div>
<div class="minigameModal"></div>
<div class="vengeanceModal"></div>
<div class="controlContainer">
<div class="rollControl">
<button type="button" class="rollButton"></button>
</div>
<div class="minigameControl">
<button type="button" class="minigameButton"></button></div>
<div class="vengeanceControl">
<button type="button" class="vengeanceButton"></button></div>
<div class="historyControlPlaceholder"></div>
</div>
</div>
<div class="historyDrawer drawerContainer">
<button type="button" class="historyButton drawerToggle"></button>
<div class="historyContainer drawerContents"></div>
</div>
</div>
`

// for now, it's notes.

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

class GameComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    render() {
        // The Drawer Pieces
        drawerButton = this.getElementsByClassName("drawerToggle")[0];
        drawerContents = this.getElementsByClassName("drawerContents")[0];
         // Drawer Handler
        drawerButton.addEventListener('click', () => {
            drawerContents.classList.toggle('openDrawer'); // trigger the drawer slide in/out
            drawerButton.classList.toggle('drawerClosed'); // change the Settings button state
            drawerButton.classList.toggle('drawerOpen'); // flippity-flip-flop
        });

    }
    // here's moving the active effect to the top of the history section:
    moveActiveToHistory() {
        const activeEffect = document.getElementById('activeContainer').firstChild; // get the first (and only) div in the active container
        const historyTarget = document.getElementById('historyContainer'); // get the history container
        historyTarget.insertBefore(activeEffect, historyTarget.firstChild); // reparent the effect to the top of the history container
}
}







// aaaaand the exported register:

export const registerGameComponent = () => {
    customElements.define('z-game', GameComponent);
}