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
let settingsPayload = {}
// get settingsPayload
export function getSettingsPayload() {
    return settingsPayload;
}
// set settingsPayload
export function setSettingsPayload(newSettings) {
    settingsPayload = newSettings;
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

// SOURCE LIST

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

// VENGEANCE LIST
// (This may be replaced by a function that creates it based on tags from the source list, so I just have to update one file)
// for now, it's a separate JSON

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
// clear weightedVeng
export function clearWeightedVeng() {
    weightedVeng = [];
}

// GAME LIST
// (This is gonna get complicated, because it needs to be responsive to the settings payload)

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
// update gameList
export function updateGameList() {
    clearGameList();
    buildFilterConditions();
    console.log('Filter Criteria ', filterCriteria);
    console.log('Source List pre-filter ', getSourceList());
    console.log('Game List pre-filter ', getGameList());
    setGameList(buildGameList());
    console.log('Game List after filter', getGameList());
}
// clear gameList
function clearGameList() {
    if (!gameList) {
        for (let key in gameList) { // for each key in gameList...
            if (gameList.hasOwnProperty(key)) { // if gameList has a property with that name (it should!)
                delete gameList[key]; // delete that property
            }
        }
    }
    console.log(`Game List Cleared.`);
}

// *** Weighted list (for RarityMatters = TRUE)
// define weightedList
let weightedList =[];
// get weightedList
export function getWeightedList() {
    return weightedList;
}
// set weightedList
function setWeightedList(newWeightedList) {
    weightedList = newWeightedList;
}
// update weightedList
export function updateWeightedList() {
    for (const effect of gameList.effects) { // for each effect...
        let instances = null;
        switch (effect.rarity) { // weight it based on 'rarity' by number of times it shows in the array
            case 'common':
                instances = 3;
                break;
            case 'uncommon':
                instances = 2;
                break;
            case 'rare':
                instances = 1;
        }
        for (let i = 0; i < instances; i++) { // for each instance...
            weightedList.push(effect.indexNum); // add the effect's indexNum to the array
        }
    }
}
// clear weightedList
export function clearWeightedList() {
    weightedList = [];
}

// randomizer settings
let randomizerConfig = [];
// get randomizerConfig
export function getRandomizerConfig() {
    return randomizerConfig;
}
// update randomizerConfig
export function updateRandomizerConfig() {
    randomizerConfig.repetition = settingsPayload.repetition;
    randomizerConfig.rarityMatters = settingsPayload.rarityMatters;
}
// clear randomizerConfig
export function clearRandomizerConfig() {
    randomizerConfig = [];
}

// AW SNAP, it's the RANDOMIZER
export function getRandomEffect() {
    // interpret the randomizer config and do some logic to get to the function
    if (randomizerConfig.repetition === true) {
        if (randomizerConfig.rarityMatters === true) {
            setNewEffect(getWeightedRandFromGameList()); // rep true, weight true
        } else {
            setNewEffect(getRandFromGameList()); // rep true, weight false
        }
    } else {
        if (randomizerConfig.rarityMatters === true) {
            setNewEffect(getWeightedSlicedRandFromGameList()); // rep false, weight true
        } else {
            setNewEffect(getSlicedRandFromGameList()); // rep false, weight false
        }
    }
}
// return random element from gameList (For Repetition = TRUE, Weighted = FALSE)
function getRandFromGameList() {
    let roll = Math.floor(Math.random() * gameList.length); // random on the list
    return gameList.effect[roll]; // pass it back
}
// return random element from gameList (destructive with slice for Repetition = FALSE, Weighted = FALSE)
function getSlicedRandFromGameList() {
    let roll = Math.floor(Math.random() * gameList.length); // random on the list
    return gameList.effect.splice[roll, 1]; // splice it out and return the removed element
}
// return weighted random element from gameList (For Repetition = TRUE, Weighted = TRUE)
function getWeightedRandFromGameList() {
    let roll = Math.floor(Math.random() * weightedList.length); // random on the weighted list
    let weightedIndex = weightedList[roll]; // set the indexNum from the list
    let targetIndex = gameList.effects.findIndex(effectIndex => effectIndex === weightedIndex); // then find the effect in the game list...
    return gameList.effect[targetIndex]; // pass it back
}
// return weighted random element from gameList (destructive with slice for Repetition = FALSE, Weighted = TRUE)
function getWeightedSlicedRandFromGameList() {
    let roll = Math.floor(Math.random() * weightedList.length); // random on the weighted list
    let weightedIndex = weightedList[roll]; // set the indexNum from the list
    // remove the instances of that index from the weightedList
    let tempWeightedList = []; // create a temp weighted list
    for (let i = 0; i < weightedList.length; i++) { // for each entry in the weighted list... 
        if (weightedList[i] !== weightedIndex) { // if it doesn't match the index value...
            tempWeightedList.push(weightedList[i]); // add it to the temp weighted list
        }
    }
    setWeightedList(tempWeightedList); // and then set the weighted list to the new array
    let targetIndex = gameList.effects.findIndex(effectIndex => effectIndex === weightedIndex);// then find the effect in the game list...
    return gameList.effect.splice[targetIndex, 1]; // splice it out and return the removed element
}


// settingsPayload = {
//    players:
//    list:
//    physical:
//    theme:
//    school:
//    duration:
//    rarity:
//    repetition: <-- Not used in filter
//    rarityMatters: <-- Not used in filter
//    vengeance: <-- Not used in filter
//    minigame: <-- Not used in filter
//    minigameDelay: <-- Not used in filter
// }

let filterCriteria = {};

function buildFilterConditions() {
    if (settingsPayload.players === 2) { // Set players (duel/multi)
        filterCriteria.player = 'duel'; 
    } else {
        filterCriteria.player = null; // null = everything
    }
    console.log(`player filter = ${filterCriteria.player}`);
    if (settingsPayload.physical === true) { // Set accessible (boolean) (this is a little confusing, because the checkbox is "checked if including effects that involve physical activity")
        filterCriteria.accessible = null; // if true, includes everything (filter logic says "null = everything")
    } else {
        filterCriteria.accessible = true; // otherwise, only include accessible effects
    }
    console.log(`physical filter = ${filterCriteria.accessible}`);
    // List selector controls a BUNCH
    // broke it out into list-specific pieces
    switch (settingsPayload.list) {
        case "micro":
            filterMicro();
        break;
        case "lite":
            filterLite();
        break;
        case "exemplar":
            filterExemplar();
        break;
        case "legacy":
            filterLegacy();
        break;
        case "full":
            filterFull();
        break;
        case "custom":
            filterCustom();
    }
    console.log(`inclusion filter = ${filterCriteria.inclusion}`);
    console.log(`exemplarTheme filter = ${filterCriteria.exemplarTheme}`);
    console.log(`school filter = ${filterCriteria.school}`);
    console.log(`duration filter = ${filterCriteria.duration}`);
    console.log(`rarity filter = ${filterCriteria.rarity}`);
}
function filterMicro() {
    // Micro only cares about inclusion
    filterCriteria.inclusion = settingsPayload.list;
    filterCriteria.exemplarTheme = null;
    filterCriteria.school = null;
    filterCriteria.duration = null;
    filterCriteria.rarity = null;
}
function filterLite() {
    // Lite  only cares about inclusion, same as Micro
    filterMicro();
}
function filterExemplar() {
    // Exemplar cares about inclusion and theme (if all, include everything)
    filterCriteria.inclusion = settingsPayload.list;
    if (settingsPayload.theme === "all") {
        filterCriteria.exemplarTheme = null; // filter logic says "null = everything"
    } else {
        filterCriteria.exemplarTheme = settingsPayload.theme;
    }
    filterCriteria.school = null;
    filterCriteria.duration = null;
    filterCriteria.rarity = null;
}
function filterLegacy() {
    // Legacy only cares about inclusion, same as Micro
    filterMicro();
}
function filterFull() {
    // Full REALLY doesn't care
    filterCriteria.inclusion = null;
    filterCriteria.exemplarTheme = null;
    filterCriteria.school = null;
    filterCriteria.duration = null;
    filterCriteria.rarity = null;
}
function filterCustom() {
    // Custom cares about inclusion, school, duration, rarity
    filterCriteria.inclusion = settingsPayload.list;
    filterCriteria.exemplarTheme = null;
    filterCriteria.school = settingsPayload.school;
    filterCriteria.duration = settingsPayload.duration;
    filterCriteria.rarity = settingsPayload.rarity;
}
function buildGameList() {
    // first version of this was really messy, lets see if we can sort out a cleaner conditional
    // const tempSourceList = getSourceList();
    // console.log(tempSourceList);
    let effectFilterCycleCount = 0; // debug thing
    return sourceList.effects.filter(effect => {
        // effects is the array within the sourceList entity, so call .filter() on it directly
        console.log('player match', (!filterCriteria.player || effect.player.includes(filterCriteria.player)));
        console.log('accessible match', (!filterCriteria.accessible || effect.accessible.includes(filterCriteria.accessible)));
        console.log('inclusion match', (!filterCriteria.inclusion || effect.inclusion.includes(filterCriteria.inclusion)));
        console.log('theme match', (!filterCriteria.exemplarTheme || effect.exemplarTheme.includes(filterCriteria.exemplarTheme)));
        console.log('school match', (!filterCriteria.school || effect.school.includes(filterCriteria.school)));
        console.log('duration match', (!filterCriteria.duration || effect.duration.includes(filterCriteria.duration)));
        console.log('rarity match', (!filterCriteria.rarity || effect.rarity.includes(filterCriteria.rarity)));
        effectFilterCycleCount = effectFilterCycleCount + 1;
        console.log('Effect Filter Cycle Count', effectFilterCycleCount);
        return ( // This is an inline function, so it's returning a boolean. that parens opens the conditional
            // Structure: If filter is unspecified (!thing) or entry matches filter, then true. If all true, include in output
        // player match
            (!filterCriteria.player || effect.player.includes(filterCriteria.player)) &&
        // accessible match
            (!filterCriteria.accessible || effect.accessible.includes(filterCriteria.accessible)) &&
        // inclusion match
            (!filterCriteria.inclusion || effect.inclusion.includes(filterCriteria.inclusion)) &&
        // theme match
            (!filterCriteria.exemplarTheme || effect.exemplarTheme.includes(filterCriteria.exemplarTheme)) &&
        // school match
            (!filterCriteria.school || effect.school.includes(filterCriteria.school)) &&
        // duration match
            (!filterCriteria.duration || effect.duration.includes(filterCriteria.duration)) &&
        // rarity match
            (!filterCriteria.rarity || effect.rarity.includes(filterCriteria.rarity))
        );
    });
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
