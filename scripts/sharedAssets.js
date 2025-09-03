// holds things that are used all over the place
// needs to be imported in all the things that reference it
// anything in /components will use
// import * as shared from '../scripts/sharedAssets.js';

// sourceList <- raw effect data source
export let sourceList = {};

// vengList <- vengeance effect data source
export let vengList = {};

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

// The dice roller!
export function dieRoll(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++){
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