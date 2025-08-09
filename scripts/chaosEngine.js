// THIS FILE HAS THE "MAKE THINGS WORK" STUFF





// CLEANED UP: This sets up the gameConfig with a function to capture each setting ...
// ... and then a function to turn them into object parameters

function getPlayerCount() {
    return document.getElementById("playerCountButton").innerHTML;
}
function getList() {
    return document.getElementById("listBase").value;
}
function getVeng() {
    return document.getElementById("vengeanceToggle").checked;
}
function getPhys() {
    return document.getElementById("physicalToggle").checked;
}
function getMG() {
    return document.getElementById("minigameToggle").checked;
}
function getMGDelay() {
    return document.getElementById("minigameDelay").value;
}
function getTheme() {
    let exemplarTheme;
    if (document.getElementById("allThemes").checked === true) { // if it's "all", set it to "all"
        exemplarTheme = "all";
    } else {
        exemplarTheme = document.getElementById("exemplarTheme").value; // otherwise set it to the selected single value
    }
    return exemplarTheme;
}
function getSchool() {
    const schoolSelection = document.getElementById("customSchool");
    return getSelectedValues(schoolSelection);
}
function getDuration() {
    const durationSelection = document.getElementById("customDuration");
    return getSelectedValues(durationSelection);
}
function getRarity() {
    const raritySelection = document.getElementById("customRarity");
    return getSelectedValues(raritySelection);
}
function getSelectedValues(element) {
    const arr = [];
        for (let i = 0; i < element.options.length; i++) {
        if (element.options[i].selected) {
        arr.push(element.options[i].value);
        }
    }
    return arr;
}
function getRM() {
    return document.getElementById("customRarityMattersToggle").checked;
}
function getRep() {
    return document.getElementById("repetitionToggle").checked;
}
function getGameConfig() {
    return {
        players: getPlayerCount(), // string
        list: getList(), // any
        physical: getPhys(), // any
        theme: getTheme(), // string
        school: getSchool(), // any[]
        duration: getDuration(), // any[]
        rarity: getRarity(), // any[]
        repetition: getRep(), // any
        rarityMatters: getRM(), // any
        vengeance: getVeng(), // any
        minigame: getMG(), // any
        minigameDelay: getMGDelay() // any
    };
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
    return await response.json();
}

// DEBUG
// WHAT DOES THE effectLibrary LOOK LIKE?
async function debugShowEffectLibrary() {
    window.effectLibrary = await loadJSON(filePath)
    document.getElementById("makeEffectLibrary").innerHTML = JSON.stringify(window.effectLibrary, null, 2);
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
    if (window.gameConfig.physical === "physical") {
        window.filterCriteria.accessible = []; // if it's empty, everything is included
    } else {
        window.filterCriteria.accessible = [true]; // set to true, inaccessible effects will be excluded
    }

    // Player is set here
        if (window.gameConfig.players === "multi") {
        window.filterCriteria.player = ""; // if it's empty, everything is included
    } else {
        window.filterCriteria.player = "duel"; // set to duel, multi effects will be excluded
    }

    // the list selection will determine SO MUCH, so it's top level logic
    // aaaaaand I'm gonna do it with a case...
    // OH! Since I objectified gameConfig, and the filter condition is an object
    // I don't have to do this in a crazy tree!

    switch (window.gameConfig.list) {
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
    window.filterCriteria.inclusion = window.gameConfig.list;
    window.filterCriteria.exemplarTheme = "";
    window.filterCriteria.school = [""];
    window.filterCriteria.duration = [""];
    window.filterCriteria.rarity = [""];
}
function filterLite() {
    // Lite  only cares about inclusion, same as Micro
    filterMicro();
}
function filterExemplar() {
    // Exemplar cares about inclusion and theme (if all, include everything)
    window.filterCriteria.inclusion = window.gameConfig.list;
    if (gameConfig.theme === "all") {
        window.filterCriteria.exemplarTheme = ["tokenizer", "complexity", "soundalike", "prodigal", "beat", "university", "toxin", "badthings"];
    } else {
        window.filterCriteria.exemplarTheme = window.gameConfig.theme;
    }
    window.filterCriteria.school = [""];
    window.filterCriteria.duration = [""];
    window.filterCriteria.rarity = [""];
}
function filterLegacy() {
    // Legacy only cares about inclusion, same as Micro
    filterMicro();
}
function filterFull() {
    // Full REALLY doesn't care
    window.filterCriteria.inclusion = "";
    window.filterCriteria.exemplarTheme = "";
    window.filterCriteria.school = [""];
    window.filterCriteria.duration = [""];
    window.filterCriteria.rarity = [""];
}
function filterCustom() {
    // Custom cares about inclusion, school, duration, rarity
    window.filterCriteria.inclusion = window.gameConfig.list;
    window.filterCriteria.exemplarTheme = "";
    window.filterCriteria.school = window.gameConfig.school;
    window.filterCriteria.duration = window.gameConfig.duration;
    window.filterCriteria.rarity = window.gameConfig.rarity;
}



function makeGameList() {
    return window.effectLibrary.filter(obj => {
        return (
            (!window.filterCriteria.player || obj.player.includes(window.filterCriteria.player)) && // if player is defined and matches
            (!window.filterCriteria.accessible || obj.accessible.includes(window.filterCriteria.accessible)) && // if accessible is defined and matches
            (!window.filterCriteria.inclusion || obj.inclusion.includes(window.filterCriteria.inclusion)) && // if inclusion is defined and matches
            (!window.filterCriteria.exemplarTheme || obj.exemplarTheme.includes(window.filterCriteria.exemplarTheme)) && // if theme is defined and matches
            (!window.filterCriteria.school || obj.school.includes(window.filterCriteria.school)) && // if school is defined and matches
            (!window.filterCriteria.duration || obj.duration.includes(window.filterCriteria.duration)) && // duration
            (!window.filterCriteria.rarity || obj.rarity.includes(window.filterCriteria.rarity)) // rarity
        );
    });
}

function setupGame() {
    window.gameConfig = getGameConfig();
    window.filterCriteria = defineMainFilter();
    // Now that we've built the filterCriteria and the effectLibrary, let's combine the two and make our actual gameList
    window.gameList = makeGameList();


    // Debug Stuff
    // display game config
    document.getElementById("makeGameObject").innerHTML = JSON.stringify(window.gameConfig, null, 2);

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