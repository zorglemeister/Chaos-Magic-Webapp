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

// SETTINGSPAYLOAD STRUCTURE <- updated by settings, then used by randomizer (game) and list generator (settings)
let settingsPayload = {};
export function getSettingsPayload() {
    return settingsPayload;
}
export function setSettingsPayload(newSettings) {
    settingsPayload = newSettings;
}

// PREVIOUSEFFECT STRUCTURE <- updated by randomizer (game), used by effect, vengeance, and minigame (game)
let newEffect = {};
export function getNewEffect() {
    return newEffect;
}
export function setNewEffect(newNewEffect) {
    newEffect = newNewEffect;
}

// PREVIOUSEFFECT STRUCTURE
let previousEffect = null;
export function getPreviousEffect() {
    return previousEffect;
}
export function setPreviousEffect(newPreviousEffect) {
    previousEffect = newPreviousEffect;
}

// NEW VENGEANCE EFFECT STRUCTURE
let newVengEffect = {};
export function getNewVengEffect() {
    return newVengEffect;
}
export function setNewVengEffect(newNewVengEffect) {
    newVengEffect = newNewVengEffect;
}

// NEW MINI EFFECT STRUCTURE
let newMiniEffect = {};
export function getNewMiniEffect() {
    return newMiniEffect;
}
export function setNewMiniEffect(newNewMiniEffect) {
    newMiniEffect = newNewMiniEffect;
}

// NEW THEME EFFECT STRUCTURE
let newThemeEffect = {};
export function getNewThemeEffect() {
    return newThemeEffect;
}
export function setNewThemeEffect(newNewThemeEffect) {
    newThemeEffect = newNewThemeEffect;
}

// ROLLCOUNTER STRUCTURE
let rollCounter = null;
export function getRollCounter() {
    return rollCounter;
}
export function setRollCounter(newRollCounter) {
    rollCounter = newRollCounter;
}

// MINIGAMECOUNTER STRUCTURE
let minigameCounter = null;
export function getMinigameCounter() {
    return minigameCounter;
}
export function setMinigameCounter(newMinigameCounter) {
    minigameCounter = newMinigameCounter;
}

// ACTIVEPLAYERS STRUCTURE
let activePlayers = null;
export function getActivePlayers() {
    return activePlayers;
}
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
let sourceList = {
    effects: undefined
};

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

// define vengList
let vengList = {};

// get vengList
export function getVengList() {
    return vengList;
}

// set vengList
function setVengList(newVengList) {
    vengList = newVengList;
}

// clear vengList
function clearVengList() {
    if (!vengList) {
        for (let key in vengList) { // for each key in vengList...
            if (vengList.hasOwnProperty(key)) { // if vengList has a property with that name (it should!)
                delete vengList[key]; // delete that property
            }
        }
    }
}

// update vengList
export function updateVengList() {
    clearVengList();
    setVengList(buildVengList());
}

// build the vengeance list (by filtering sourceList)
function buildVengList() {
    return sourceList.effects.filter(effect => {
        return (
            (effect.inclusion.includes('vengeance')));
    });
}

// define weightedVeng
let weightedVeng = [];

// get weightedVeng
export function getWeightedVeng() {
    return weightedVeng;
}

// set weightedVeng
function setWeightedVeng(newWeightedVeng) {
    weightedVeng = newWeightedVeng;
}

// update weightedVeng (specifically, populates it with entries = key * weight)
export function updateWeightedVeng() {
    let tempWeightedVeng = [];
    for (const effect of vengList) { // for each effect...
        let instances = null;
        switch (effect.rarity) { // weight it based on 'rarity' by number of times it shows in the array
            case 'common':
                instances = 10;
                break;
            case 'uncommon':
                instances = 2;
                break;
            case 'rare':
                instances = 1;
        }
        for (let i = 0; i < instances; i++) { // for each instance...
            tempWeightedVeng.push(effect.indexNum); // add the effect's indexNum to the array
        }
    }
    setWeightedVeng(tempWeightedVeng);
}

// clear weightedVeng
export function clearWeightedVeng() {
    weightedVeng = [];
}

// VENGEANCE RANDOMIZER
export function getRandomVengEffect() {
    let roll = Math.floor(Math.random() * weightedVeng.length); // random on the weighted list
    let weightedIndex = weightedVeng[roll]; // set the indexNum from the list
    let targetIndex = vengList.findIndex(effectIndex => effectIndex.indexNum === weightedIndex); // then find the effect in the veng list...
    let tempEffect = vengList[targetIndex];
    tempEffect.roll = roll; // add the rolled value as a parameter
    setNewVengEffect(tempEffect); // set the newVengEffect
}

// MINIGAME LIST

// define miniList
let miniList = {};

// get miniList
export function getMiniList() {
    return miniList;
}

// set miniList
function setMiniList(newMiniList) {
    miniList = newMiniList;
}

// clear miniList
function clearMiniList() {
    if (!miniList) {
        for (let key in miniList) { // for each key in miniList...
            if (miniList.hasOwnProperty(key)) { // if miniList has a property with that name (it should!)
                delete miniList[key]; // delete that property
            }
        }
    }
}

// update miniList
export function updateMiniList() {
    clearMiniList();
    setMiniList(buildMiniList());
}

// build the minigame list (by filtering sourceList)
function buildMiniList() {
    return sourceList.effects.filter(effect => {
        return (
            (effect.inclusion.includes('minigame')));
    });
}

// MINIGAME RANDOMIZER
export function getRandomMiniEffect() {
    const miniListLength = Object.keys(miniList).length;
    if (miniListLength > 0) {
        const roll = Math.floor(Math.random() * miniListLength); // random on the list
        let tempEffect = miniList[Object.keys(miniList)[roll]];

        tempEffect.roll = roll; // add the rolled value as a parameter
        setNewMiniEffect(tempEffect); // set the newMiniEffect
    }
}

// THEME LIST

// define themeList
let themeList = {};

// get themeList
export function getThemeList() {
    return themeList;
}

// set themeList
function setThemeList(newThemeList) {
    themeList = newThemeList;
}

// clear themeList
function clearThemeList() {
    if (!themeList) {
        for (let key in themeList) { // for each key in themeList...
            if (themeList.hasOwnProperty(key)) { // if themeList has a property with that name (it should!)
                delete themeList[key]; // delete that property
            }
        }
    }
}

// update themeList
export function updateThemeList() {
    clearThemeList();
    setThemeList(buildThemeList());
}

// build the theme list (by filtering sourceList)
function buildThemeList() {
    return sourceList.effects.filter(effect => {
        return (
            (effect.exemplarTheme.includes(filterCriteria.theme)));
    });
}

// THEME RANDOMIZER
export function getRandomThemeEffect() {
    let tempEffect = {};
    const themeListLength = Object.keys(themeList).length;
    if (randomizerConfig.repetition === true) {
            tempEffect = getRandFromThemeList(themeListLength); // rep true
        } else {
            tempEffect = getSplicedRandFromThemeList(themeListLength); // rep false
        }

    
    if (themeListLength > 0) {
        const roll = Math.floor(Math.random() * themeListLength); // random on the list
        let tempEffect = themeList[Object.keys(themeList)[roll]];

        tempEffect.roll = roll; // add the rolled value as a parameter
    }
    setNewThemeEffect(tempEffect); // set the newThemeEffect
}

// return random element from themeList, Repetition = TRUE
function getRandFromThemeList(themeListLength) {
    if (themeListLength > 0) {
        const roll = Math.floor(Math.random() * themeListLength); // random on the list
        let tempEffect = themeList[Object.keys(themeList)[roll]];

        tempEffect.roll = roll; // add the rolled value as a parameter
    }
    return tempEffect; // pass it back
}

// return random element from themeList, destructive with splice for Repetition = FALSE
function getSplicedRandFromThemeList(themeListLength) {
    if (themeListLength > 0) {
        const roll = Math.floor(Math.random() * themeListLength); // random on the list
        let tempEffect = themeList.splice(Object.keys(themeList)[roll], 1); // i THINK this'll splice it out?

        tempEffect.roll = roll; // add the rolled value as a parameter
    }
    /* let roll = Math.floor(Math.random() * gameList.length); // random on the list
    let splicedEffect = gameList.splice(roll, 1); */
    return tempEffect[0]; // splice it out and return the removed element
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
    setGameList(buildGameList());
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
}

// *** Weighted list (for RarityMatters = TRUE)
// define weightedList
let weightedList = [];

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
    console.log(`Updating the Weighted List`);
    let tempWeightedList = [];
    console.log(`gamelist.length: `, gameList.length);
    for (const effect of gameList) { // for each effect...
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
            tempWeightedList.push(effect.indexNum); // add the effect's indexNum to the array
        }
    }
    console.log(`tempWeightedList: `, tempWeightedList);
    setWeightedList(tempWeightedList);
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
    if (randomizerConfig.rarityMatters === true) {
        clearWeightedList();
        updateWeightedList();
    }
}

// clear randomizerConfig
export function clearRandomizerConfig() {
    randomizerConfig = [];
}

// AW SNAP, it's the RANDOMIZER
export function getRandomEffect() {
    // interpret the randomizer config and do some logic to get to the function
    let tempEffect;
    if (randomizerConfig.repetition === true) {
        if (randomizerConfig.rarityMatters === true) {
            tempEffect = getWeightedRandFromGameList(); // rep true, weight true
        } else {
            tempEffect = getRandFromGameList(); // rep true, weight false
        }
    } else {
        if (randomizerConfig.rarityMatters === true) {
            tempEffect = getWeightedSplicedRandFromGameList(); // rep false, weight true
        } else {
            tempEffect = getSplicedRandFromGameList(); // rep false, weight false
        }
    }
    return tempEffect;
}

// return random element from gameList (For Repetition = TRUE, Weighted = FALSE)
function getRandFromGameList() {
    let roll = Math.floor(Math.random() * gameList.length); // random on the list
    return gameList[roll]; // pass it back
}

// return random element from gameList (destructive with splice for Repetition = FALSE, Weighted = FALSE)
function getSplicedRandFromGameList() {
    let roll = Math.floor(Math.random() * gameList.length); // random on the list
    console.log(`gamelist length: `, gameList.length)
    let splicedEffect = gameList.splice(roll, 1);
    console.log(`splicedEffect: `, splicedEffect);
    return splicedEffect[0]; // splice it out and return the removed element
}

// return weighted random element from gameList (For Repetition = TRUE, Weighted = TRUE)
function getWeightedRandFromGameList() {
    let roll = Math.floor(Math.random() * weightedList.length); // random on the weighted list
    console.log(`roll`, roll);
    console.log(`weightedList.length`, weightedList.length);
    let weightedIndex = weightedList[roll]; // set the indexNum from the list
    let targetIndex = gameList.findIndex(effectIndex => effectIndex.indexNum === weightedIndex); // then find the effect in the game list...
    return gameList[targetIndex]; // pass it back
}

// return weighted random element from gameList (destructive with splice for Repetition = FALSE, Weighted = TRUE)
function getWeightedSplicedRandFromGameList() {
    let roll = Math.floor(Math.random() * weightedList.length); // random on the weighted list
    console.log(`roll`, roll);
    console.log(`weightedList.length`, weightedList.length);
    let weightedIndex = weightedList[roll]; // set the indexNum from the list
    // remove the instances of that index from the weightedList
    let tempWeightedList = []; // create a temp weighted list
    for (let i = 0; i < weightedList.length; i++) { // for each entry in the weighted list... 
        if (weightedList[i] !== weightedIndex) { // if it doesn't match the index value...
            tempWeightedList.push(weightedList[i]); // add it to the temp weighted list
        }
    }
    setWeightedList(tempWeightedList); // and then set the weighted list to the new array
    console.log(`weightedIndex`, weightedIndex);
    let targetIndex = gameList.findIndex(effectIndex => effectIndex.indexNum === weightedIndex);// then find the effect in the game list...
    console.log(`targetIndex`, targetIndex);
    let splicedEffect = gameList.splice(targetIndex, 1);
    console.log(`splicedEffect: `, splicedEffect);
    console.log(`splicedEffect[0]: `, splicedEffect[0]);
    return splicedEffect[0]; // splice it out and return the removed element
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
    // Set players (duel/multi)
    filterCriteria.player = settingsPayload.players === 2 ? 'duel' : null; 
    // Set accessible (boolean) (this is a little confusing, because the checkbox is "checked if including effects that involve physical activity")
    // if true, includes everything (filter logic says "null = everything")
    // otherwise, only include accessible effects
    filterCriteria.accessible = settingsPayload.physical === true ? null : true;
    // only exemplar cares about theme, and it's not going to be used in the buildGameList method
    filterCriteria.theme = settingsPayload.list === 'exemplar' ? settingsPayload.theme : null;
    // other filter parameters based on the list selection
    switch (settingsPayload.list) {
        case "full":
            // Full REALLY doesn't care
            filterCriteria.inclusion = null;
            filterCriteria.school = null;
            filterCriteria.duration = null;
            filterCriteria.rarity = null;
            break;
        case "custom":
            // Custom cares about inclusion, school, duration, rarity
            filterCriteria.inclusion = settingsPayload.list;
            filterCriteria.school = settingsPayload.school;
            filterCriteria.duration = settingsPayload.duration;
            filterCriteria.rarity = settingsPayload.rarity;
            break;
        default:
            // Micro, Lite, Exemplar, and Legacy only care about inclusion
            filterCriteria.inclusion = settingsPayload.list;
            filterCriteria.school = null;
            filterCriteria.duration = null;
            filterCriteria.rarity = null;
    }
}

function buildGameList() {
    // first version of this was really messy, lets see if we can sort out a cleaner conditional
    // const tempSourceList = getSourceList();
    return sourceList.effects.filter(effect => {
        // effects is the array within the sourceList entity, so call .filter() on it directly
        return ( // This is an inline function, so it's returning a boolean. that parens opens the conditional
            // Structure: If filter is unspecified (!thing) or entry matches filter, then true. If all true, include in output
            // player match
            (!filterCriteria.player || effect.player.includes(filterCriteria.player)) &&
            // accessible match
            (!filterCriteria.accessible || effect.accessible.includes(filterCriteria.accessible)) &&
            // inclusion match
            (!filterCriteria.inclusion || effect.inclusion.includes(filterCriteria.inclusion)) &&
            // theme match *** Pulled this, was reducing Exemplar to JUST the theme table
            /* (!filterCriteria.exemplarTheme || effect.exemplarTheme.includes(filterCriteria.exemplarTheme)) && */
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
