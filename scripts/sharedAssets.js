// holds things that are used all over the place
// needs to be imported in all the things that reference it
// anything in /components will use
// import * as shared from '../scripts/sharedAssets.js';





// settingsPayload <- updated by settings, then used by randomizer (game) and list generator (settings)
export let settingsPayload = {
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
export let gameList = null;

// newEffect <- updated by randomizer (game), used by effect, vengeance, and minigame (game)
export let newEffect = null;
// previousEffect <- updated by new roll (game), used by ongoing
export let previousEffect = null;

// Here there be functions!

// Build the lists
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// sourceList <- raw effect data source
let sourceList = {};
// sourceList Getter
export function getSourceList() {
    return sourceList;
}
// sourceList Setter
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

// vengList <- vengeance effect data source
let vengList = {};
// vengList Getter
export function getVengList() {
    return vengList;
}
// vengList Setter
export async function updateVengList(vengPath) {
    const newVengList = await loadJSON(vengPath); // get the file and put it into a new object
    for (let key in vengList) { // for each key in vengList...
        if (vengList.hasOwnProperty(key)) { // if vengList has a property with that name (it should!)
            delete vengList[key]; // delete that property
        }
    }
    Object.assign(vengList, newVengList); // target vengList and assign the new object definition to it
}


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

// *** OOH! I need to put the effect builder/randomizer in here!

// lets try it with Vengeance first as POC
// initialize weighted Vengeance array
let weightedVeng = [];
// this is called a "getter" (watch Jo learn common concepts!)
export function getWeightedVeng() {
    return weightedVeng;
}
// this is called a "setter". it modifies the array
// (specifically, populates it with entries = key * weight)
export function updateWeightedVeng() { 
    for (let effect in vengList.effects) { // for each effect...
        for (let i = 0; i < effect.weight; i++) { // for the "weight"...
            weightedVeng.push(effect.effectName); // add the effectName to the array
        } // This should create an array where each effectName shows up a number of times equal to the weight value
    }
}