// This holds the main gamestate and all the little pieces of it.
// pretty sure I need to import the bits...

import { registerEffectComponent } from './effectComponent.js';

// let's build a template!
const gameTemplate = document.createElement('template');
gameTemplate.innerHTML = `
<div class="gameField visibleBlueBorder">
<div class="visiblePart visibleBorder">
<div class="activeContainer">active cont</div>
<div class="minigameModal">minigame cont</div>
<div class="vengeanceModal">vengeance cont</div>
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
<div class="historyDrawer gameDrawerContainer visibleGreenBorder">
<button type="button" class="historyButton gameDrawerToggle gameDrawerClosed"></button>
<div class="historyContainer gameDrawerContents">hist Cont</div>
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
        registerEffectComponent(); // get the effectComponent in here
        this.append(gameTemplate.content.cloneNode(true)); // clone the template and stick it in the DOM

        // The Drawer Pieces
        const drawerButton = this.getElementsByClassName("gameDrawerToggle")[0];
        const drawerContents = this.getElementsByClassName("gameDrawerContents")[0];
        const drawerContainer = this.getElementsByClassName("gameDrawerContainer")[0];
         // Drawer Handler
        drawerButton.addEventListener('click', () => {
            drawerContainer.classList.toggle('open'); // trigger the drawer slide in/out
            drawerButton.classList.toggle('gameDrawerClosed'); // change the Settings button state
            drawerButton.classList.toggle('gameDrawerOpen'); // flippity-flip-flop
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