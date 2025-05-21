
// MMM, global variables...

    window.effectLibrary = {}
    window.gameConfig = {}
    window.filterCriteria = {}
    window.gameList = {}




// CLEANED UP: This sets up the gameConfig with a function to capture each setting ...
// ... and then a function to turn them into object parameters

function setPlayerCount() {
    var playerCount = document.getElementById("playerCountButton").innerHTML;
    return playerCount;
}
function setList() {
    var baseList = document.getElementById("listBase").value;
    return baseList;
}
function setVeng() {
    var vengeance = document.getElementById("vengeanceToggle").checked;
    return vengeance;
}
function setPhys() {
    var physical = document.getElementById("physicalToggle").checked;
    return physical;
}
function setMG() {
    var minigames = document.getElementById("minigameToggle").checked;
    return minigames;
}
function setMGDelay() {
    var minigameDelay = document.getElementById("minigameDelay").value;
    return minigameDelay;
}
function setTheme() {
    var exemplarTheme = "";
    if (document.getElementById("allThemes").checked === true) { // if it's "all", set it to "all"
        exemplarTheme = "all";
    } else {
        exemplarTheme = document.getElementById("exemplarTheme").value; // otherwise set it to the selected single value
    }
    return exemplarTheme;
}
function setSchool() {
    var schoolArray = [];
    var schoolSelection = document.getElementById("customSchool");
    for (let i = 0; i < schoolSelection.options.length; i++) {
        if (schoolSelection.options[i].selected) {
            schoolArray.push(schoolSelection.options[i].value);
        }   
    }
    return schoolArray;
}
function setDuration() {
    var durationArray = [];
    var durationSelection = document.getElementById("customDuration");
    for (let i = 0; i < durationSelection.options.length; i++) {
        if (durationSelection.options[i].selected) {
        durationArray.push(durationSelection.options[i].value);
        }
    }
    return durationArray;
}
function setRarity() {
    var rarityArray = [];
    var raritySelection = document.getElementById("customRarity");
    for (let i = 0; i < raritySelection.options.length; i++) {
        if (raritySelection.options[i].selected) {
        rarityArray.push(raritySelection.options[i].value);
        }
    }
    return rarityArray;
}
function setRM() {
    var customRarityMatters = document.getElementById("customRarityMattersToggle").checked;
    return customRarityMatters;
}
function setRep() {
    var repetition = document.getElementById("repetitionToggle").checked;
    return repetition;
}
function makeGameConfig() {
    const configObj = {
        players: setPlayerCount(), // string
        list: setList(), // any
        physical: setPhys(), // any
        theme: setTheme(), // string
        school: setSchool(), // any[]
        duration: setDuration(), // any[]
        rarity: setRarity(), // any[]
        repetition: setRep(), // any
        rarityMatters: setRM(), // any
        vengeance: setVeng(), // any
        minigame: setMG(), // any
        minigameDelay: setMGDelay() // any
    };
    return configObj;
}

//
//
// LET'S MAKE A LIST!

// First, load the main JSON as our library:

// tell it where it is
const filePath = './lists/chaosList.json'

// declare the library with global scope calling the file loader


// function to go get the file
async function loadJSON(filePath) {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

// DEBUG
// WHAT DOES THE effectLibrary LOOK LIKE?
async function debugShowEffectLibrary() {
    const effectLibrary = await loadJSON(filePath)
    const effectLibraryString = JSON.stringify(effectLibrary, null, 2);
    document.getElementById("makeEffectLibrary").innerHTML = effectLibraryString;
}



// set up filterCriteria
// const filterCriteria = {
//     player: "",
//     inclusion: [""],
//     exemplarTheme: "",
//     school: [""],
//     duration: [""],
//     rarity: [""]
// }
// define the filter criteria (based on gameConfig object)
function defineMainFilter() {
    
    // Physical is set here
    if (gameConfig.physical === "physical") {
        filterCriteria.accessible = []; // if it's empty, everything is included
    } else {
        filterCriteria.accessible = [true]; // set to true, inaccessible effects will be excluded
    }

    // Player is set here
        if (gameConfig.players === "multi") {
        filterCriteria.player = ""; // if it's empty, everything is included
    } else {
        filterCriteria.player = "duel"; // set to duel, multi effects will be excluded
    }

    // the list selection will determine SO MUCH, so it's top level logic
    // aaaaaand I'm gonna do it with a case...
    // OH! Since I objectified gameConfig, and the filter condition is an object
    // I don't have to do this in a crazy tree!

    switch (gameConfig.list) {
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

}

// I'm going to put the filter construction for each list selection into it's own function
function filterMicro() {
    // Micro only cares about inclusion
    filterCriteria.inclusion = gameConfig.list;
    filterCriteria.exemplarTheme = "";
    filterCriteria.school = [""];
    filterCriteria.duration = [""];
    filterCriteria.rarity = [""];
}
function filterLite() {
    // Lite  only cares about inclusion
    filterCriteria.inclusion = gameConfig.list;
    filterCriteria.exemplarTheme = "";
    filterCriteria.school = [""];
    filterCriteria.duration = [""];
    filterCriteria.rarity = [""];
}
function filterExemplar() {
    // Exemplar cares about inclusion and theme (if all, include everything)
    filterCriteria.inclusion = gameConfig.list;
    if (gameConfig.theme === "all") {
        filterCriteria.exemplarTheme = ["tokenizer", "complexity", "soundalike", "prodigal", "beat", "university", "toxin", "badthings"];
    } else {
        filterCriteria.exemplarTheme = gameConfig.theme;
    }
    filterCriteria.school = [""];
    filterCriteria.duration = [""];
    filterCriteria.rarity = [""];
}
function filterLegacy() {
    // Legacy only cares about inclusion
    filterCriteria.inclusion = gameConfig.list;
    filterCriteria.exemplarTheme = "";
    filterCriteria.school = [""];
    filterCriteria.duration = [""];
    filterCriteria.rarity = [""];
}
function filterFull() {
    // Full REALLY doesn't care
    filterCriteria.inclusion = "";
    filterCriteria.exemplarTheme = "";
    filterCriteria.school = [""];
    filterCriteria.duration = [""];
    filterCriteria.rarity = [""];
}
function filterCustom() {
    // Custom cares about inclusion, school, duration, rarity
    filterCriteria.inclusion = gameConfig.list;
    filterCriteria.exemplarTheme = "";
    filterCriteria.school = gameConfig.school;
    filterCriteria.duration = gameConfig.duration;
    filterCriteria.rarity = gameConfig.rarity;
}



function makeGameList() {
    return effectLibrary.filter(obj => {
        return (
            (!filterCriteria.player || obj.player.includes(filterCriteria.player)) && // if player is defined and matches
            (!filterCriteria.accessible || obj.accessible.includes(filterCriteria.accessible)) && // if accessible is defined and matches
            (!filterCriteria.inclusion || obj.inclusion.includes(filterCriteria.inclusion)) && // if inclusion is defined and matches
            (!filterCriteria.exemplarTheme || obj.exemplarTheme.includes(filterCriteria.exemplarTheme)) && // if theme is defined and matches
            (!filterCriteria.school || obj.school.includes(filterCriteria.school)) && // if school is defined and matches
            (!filterCriteria.duration || obj.duration.includes(filterCriteria.duration)) && // duration
            (!filterCriteria.rarity || obj.rarity.includes(filterCriteria.rarity)) // rarity
        );
    });
}

function setupGame() {
    gameConfig = makeGameConfig();
    filterCriteria = defineMainFilter();
    // Now that we've built the filterCriteria and the effectLibrary, let's combine the two and make our actual gameList
    gameList = makeGameList();


    // Debug Stuff
    // display game config
    const gameConfigString = JSON.stringify(gameConfig, null, 2);
    document.getElementById("makeGameObject").innerHTML = gameConfigString;

}

//
//
// THIS IS THE RANDOMIZER STUFF



// Basic Randomizer
// const sourceList = 
// function basicGenerator() {
//     var 
// rngValue = Math.floor(Math.random() * effectList.length);

// }

// random direction


// random mana


// random land type


// random colour (and colourless)

// die roller (count, sides)

function dieRoll(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++){
        let roll = Math.ceil(Math.random() * sides);
        total = total + roll;
    }
    return total;
}

//
//
// THIS IS ALL THE EFFECT-LEVEL SPECIAL FUNCTIONS
//
// They should all return two strings:
// one for the short desc
// one for the full desc
