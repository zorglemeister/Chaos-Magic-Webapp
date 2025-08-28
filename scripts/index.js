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


// I think I need to initalize the global objects first, THEN register the components that use them...

// if I put these above the imports, it breaks everything... why?

// this is where I need to declare the primary game objects, so they're at the app scope and everything else can see them, right?

// sourceList <- updated by "loadJSON" function, holds the complete list source
// set the sourceJSON location
const filePath = 'lists/chaosList.json';

// go get the file
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// make the list from the file (export so I can use it in the gameComponent)
export const sourceList = await loadJSON(filePath); // the contents shouldn't change, so it's a const

// do it again for Vengeance
const vengPath = 'lists/chaosVengeance.json';
// make the list from the file (export so I can use it in the gameComponent)
export const vengList = await loadJSON(vengPath); // the contents shouldn't change, so it's a const

// settingsPayload <- updated by settings, then used by randomizer (game) and list generator (settings)
export let settingsPayload = { // the contents will change, so it's a let
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
export let gameList = null; // the contents will change, so it's a let

// newEffect <- updated by randomizer (game), used by effect, vengeance, and minigame (game)
export let newEffect = null; // the contents will change, so it's a let
// previousEffect <- updated by new roll (game), used by ongoing
export let previousEffect = null; // the contents will change, so it's a let