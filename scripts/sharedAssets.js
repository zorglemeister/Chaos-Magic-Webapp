// holds things that are used all over the place
// needs to be imported in all the things that reference it
// anything in /components will use
// import * as shared from '../scripts/sharedAssets.js';

// define
// let thing = null/[]/{};
// get
// export function getThing() {
//    return thing;
// }
// set
// export function setThing(value) {
//    thing = value;
// }
// update
// export function updateThing(value) {
//    // complicated make the thing stuff
// }



// ***
// HERE BE THINGS THAT ARE SET/GET

// define settingsPayload <- updated by settings, then used by randomizer (game) and list generator (settings)
let settingsPayload = {
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
// get settingsPayload
export function getSettingsPayload() {
    return settingsPayload;
}
// set settingsPayload
export function setSettingsPayload(newSettings) {
    settingsPayload = newSettings;
}

// define gameList <- updated by list generator (settings), holds the subset of effects for the game, used by randomizer (game)
let gameList = {};
// get gameList
export function getGameList() {
    return gameList;
}
// set gameList
export function setGameList(newGameList) {
    gameList = newGameList;
}

// define newEffect <- updated by randomizer (game), used by effect, vengeance, and minigame (game)
let newEffect = {};
// get newEffect
export function getNewEffect() {
    return newEffect;
}
// set newEffect
export function setNewEffect(newNewEffect) {
    newEffect = newNewEffect;
}

// define previousEffect <- updated by new roll (game), used by ongoing
let previousEffect = null;
// get previousEffect
export function getPreviousEffect() {
    return previousEffect;
}
// set previousEffect
export function setPreviousEffect(newPreviousEffect) {
    previousEffect = newPreviousEffect;
}

// define rollCounter
let rollCounter = null;
// get rollCounter
export function getRollCounter() {
    return rollCounter;
}
// set rollCounter
export function setRollCounter(newRollCounter) {
    rollCounter = newRollCounter;
}

// define minigameCounter
let minigameCounter = null;
// get minigameCounter
export function getMinigameCounter() {
    return minigameCounter;
}
// set minigameCounter
export function setMinigameCounter(newMinigameCounter) {
    minigameCounter = newMinigameCounter;
}

// define activePlayers
let activePlayers = null;
// get activePlayers
export function getActivePlayers() {
    return activePlayers;
}
// set activePlayers
export function setActivePlayers(newActivePlayers) {
    activePlayers = newActivePlayers;
}


// ***
// HERE BE THINGS THAT ARE FANCY

// fetch a file
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// define sourceList
let sourceList = {};
// get sourceList
export function getSourceList() {
    return sourceList;
}
// update sourceList
export async function updateSourceList(sourcePath) {
    const newSourceList = await loadJSON(sourcePath); // get the file and put it into a new object

    // how to clear an object?
    // loop through properties and delete them?
    for (let key in sourceList) { // for each key in sourceList...
        if (sourceList.hasOwnProperty(key)) { // if sourceList has a property with that name (it should!)
            delete sourceList[key]; // delete that property
        }
    }

    Object.assign(sourceList, newSourceList); // target sourceList and assign the new object definition to it
}

// define vengList
let vengList = {};
// get vengList
export function getVengList() {
    return vengList;
}
// update vengList
export async function updateVengList(vengPath) {
    const newVengList = await loadJSON(vengPath); // get the file and put it into a new object
    for (let key in vengList) { // for each key in vengList...
        if (vengList.hasOwnProperty(key)) { // if vengList has a property with that name (it should!)
            delete vengList[key]; // delete that property
        }
    }
    Object.assign(vengList, newVengList); // target vengList and assign the new object definition to it
}

// define weightedVeng
let weightedVeng = [];
// get weightedVeng
export function getWeightedVeng() {
    return weightedVeng;
}
// update weightedVeng (specifically, populates it with entries = key * weight)
export function updateWeightedVeng() { 
    for (const effect of vengList.effects) { // for each effect...
        for (let i = 0; i < effect.weight; i++) { // for the "weight"...
            weightedVeng.push(effect.effectName); // add the effectName to the array
        } // This should create an array where each effectName shows up a number of times equal to the weight value
    }
}

// ***
// HERE BE SUPPORTING FUNCTIONS

// The dice roller!
export function dieRoll(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        let roll = Math.ceil(Math.random() * sides);
        total = total + roll;
        }
    return total;
    }

// Random Unique Id generator
export function randomUnique() {
        return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; 
        // should be sufficiently unique because timestamp inclusion, even if the randomizer creates the same output twice
        // sliced because the Math.random().toString(36) will always start with a "0.", so that's like, two characters less random, amirite?
        // this is where I hum The Eels "My Beloved Monster" (you're welcome, Jewel!)
    }
