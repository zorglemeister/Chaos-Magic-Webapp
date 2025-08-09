// Component mapping:
// - settings
// - - helpBox
// - game
// - - effect
// - - - rollButton
// - - - inlineSymbol

import { registerSettingsComponent } from '../components/settingsComponent.js';
import { registerGameComponent } from '../components/gameComponent.js';

// add them to the app definition here
const app = () => {
    registerSettingsComponent(); 
    registerGameComponent();
    
}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);

// this is where I need to declare the primary game objects, so they're at the app scope and everything else can see them, right?

// sourceList <- updated by "loadJSON" function, holds the complete list source
// set the sourceJSON location
const filePath = './lists/chaosList.json'

// go get the file
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// make the list from the file
const sourceList = await loadJSON(filePath); // the contents shouldn't change, so its a const

// settingsPayload <- updated by settings, then used by randomizer (game) and list generator (settings)
let settingsPayload = { // the contents will change, so its a let
    players: null, // any
    list: null, // any
    physical: null, // any
    theme: null, // string
    school: null, // any[]
    duration: null, // any[]
    rarity: null, // any[]
    repetition: null, // any
    rarityMatters: null, // any
    vengeance: null, // any
    minigame: null, // any
    minigameDelay: null // any
}

// gameList <- updated by list generator (settings), holds the subset of effects for the game, used by randomizer (game)
let gameList = null; // the contents will change, so its a let

// generatedEffect <- updated by randomizer (game), used by effect, vengeance, and minigame (game)
let generatedEffect = null; // the contents will change, so its a let
