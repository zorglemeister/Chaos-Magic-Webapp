



// Collects all the game settings and turns them into an object
// WHY DOESN'T THIS WORK??!?!?!?!
// IT WORKS NOW!
function makeGame() {
    const gameConfig = [];
    // list configuration
    // playerCount
    var playerCount = document.getElementById("playerCountButton").innerHTML;
    // baseList
    var baseList = document.getElementById("listBase").value;
    // physical
    var physical = document.getElementById("physicalToggle").checked;
    // exemplarTheme
    var exemplarTheme = "";
    if (document.getElementById("allThemes").checked === true) { // if it's "all", set it to "all"
        exemplarTheme = "all";
    } else {
        exemplarTheme = document.getElementById("exemplarTheme").value; // otherwise set it to the selected single value
    }
    // customSchool
    var schoolArray = [];
    var schoolSelection = document.getElementById("customSchool");
    for (let i = 0; i < schoolSelection.options.length; i++) {
        if (schoolSelection.options[i].selected) {
            schoolArray.push(schoolSelection.options[i].value);
        }   
    }
    // customDuration
    var durationArray = [];
    var durationSelection = document.getElementById("customDuration");
    for (let i = 0; i < durationSelection.options.length; i++) {
        if (durationSelection.options[i].selected) {
        durationArray.push(durationSelection.options[i].value);
        }
    }
    // customRarity
    var rarityArray = [];
    var raritySelection = document.getElementById("customRarity");
    for (let i = 0; i < raritySelection.options.length; i++) {
        if (raritySelection.options[i].selected) {
        rarityArray.push(raritySelection.options[i].value);
        }
    }
    // randomizer controls
    // repetition
    var repetition = document.getElementById("repetitionToggle").checked;
    // customRarityMatters
    var customRarityMatters = document.getElementById("customRarityMattersToggle").checked;
    // additional functions
    // vengeance
    var vengeance = document.getElementById("vengeanceToggle").checked;
    // minigames
    var minigames = document.getElementById("minigameToggle").checked;
    // minigameDelay
    var minigameDelay = document.getElementById("minigameDelay").value;
    // put it into the gameConfig array
    gameConfig.push(playerCount);
    gameConfig.push(baseList);
    gameConfig.push(physical);
    gameConfig.push(exemplarTheme);
    gameConfig.push(schoolArray);
    gameConfig.push(durationArray);
    gameConfig.push(rarityArray);
    gameConfig.push(repetition);
    gameConfig.push(customRarityMatters);
    gameConfig.push(vengeance);
    gameConfig.push(minigames);
    gameConfig.push(minigameDelay);
    // "Show me." - Morpheus
    document.getElementById("gameConfigOutput").textContent = gameConfig.join(", ");
    // DEBUG OUTPUT
    document.getElementById("debugPlayerCount").textContent = playerCount;
    document.getElementById("debugBaseList").textContent = baseList;
    document.getElementById("debugPhysical").textContent = physical.toString();
    document.getElementById("debugExemplarTheme").textContent = exemplarTheme;
    document.getElementById("debugCustomSchool").textContent = schoolArray.join(", ");
    document.getElementById("debugCustomDuration").textContent = durationArray.join(", ");
    document.getElementById("debugCustomRarity").textContent = rarityArray.join(", ");
    document.getElementById("debugRepetition").textContent = repetition.toString();
    document.getElementById("debugRarityMatters").textContent = customRarityMatters.toString();
    document.getElementById("debugVengeance").textContent = vengeance.toString();
    document.getElementById("debugMinigames").textContent = minigames.toString();
    document.getElementById("debugMinigamesDelay").textContent = minigameDelay;
}

//  AAAAARGH It be debug time

// literally a button to "set" each setting, so I can see what the hell is being passed.

function debugSetPlayerCount() {
    var playerCount = document.getElementById("playerCountButton").innerHTML;
    document.getElementById("debugPC").textContent = playerCount;
    return playerCount;
}

function debugSetList() {
    var baseList = document.getElementById("listBase").value;
    document.getElementById("debugList").textContent = baseList;
    return baseList;
}

function debugSetVeng() {
    var vengeance = document.getElementById("vengeanceToggle").checked;
    document.getElementById("debugVeng").textContent = vengeance.toString();
    return vengeance; // .toString();
}

function debugSetPhys() {
    var physical = document.getElementById("physicalToggle").checked;
    document.getElementById("debugPhys").textContent = physical.toString();
    return physical; // .toString();
}

function debugSetMG() {
    var minigames = document.getElementById("minigameToggle").checked;
    document.getElementById("debugMG").textContent = minigames.toString();
    return minigames; // .toString();
}

function debugSetMGDelay() {
    var minigameDelay = document.getElementById("minigameDelay").value;
    document.getElementById("debugMGDelay").textContent = minigameDelay;
    return minigameDelay;
}

function debugSetTheme() {
    var exemplarTheme = "";
    if (document.getElementById("allThemes").checked === true) { // if it's "all", set it to "all"
        exemplarTheme = "all";
    } else {
        exemplarTheme = document.getElementById("exemplarTheme").value; // otherwise set it to the selected single value
    }
    document.getElementById("debugTheme").textContent = exemplarTheme;
    return exemplarTheme;
}

function debugSetSchool() {
    var schoolArray = [];
    var schoolSelection = document.getElementById("customSchool");
    for (let i = 0; i < schoolSelection.options.length; i++) {
        if (schoolSelection.options[i].selected) {
            schoolArray.push(schoolSelection.options[i].value);
        }   
    }
    document.getElementById("debugSchool").textContent = schoolArray.join(", ");
    return schoolArray; // what does it look like if I don't use .join(", ") ??
}

function debugSetDuration() {
    var durationArray = [];
    var durationSelection = document.getElementById("customDuration");
    for (let i = 0; i < durationSelection.options.length; i++) {
        if (durationSelection.options[i].selected) {
        durationArray.push(durationSelection.options[i].value);
        }
    }
    document.getElementById("debugDuration").textContent = durationArray.join(", ");
    return durationArray; // .join(", ");
}

function debugSetRarity() {
    var rarityArray = [];
    var raritySelection = document.getElementById("customRarity");
    for (let i = 0; i < raritySelection.options.length; i++) {
        if (raritySelection.options[i].selected) {
        rarityArray.push(raritySelection.options[i].value);
        }
    }
    document.getElementById("debugRarity").textContent = rarityArray.join(", ");
    return rarityArray; // .join(", ");
}

function debugSetRM() {
    var customRarityMatters = document.getElementById("customRarityMattersToggle").checked;
    document.getElementById("debugRM").textContent = customRarityMatters.toString();
    return customRarityMatters; // .toString();
}

function debugSetRep() {
    var repetition = document.getElementById("repetitionToggle").checked;
    document.getElementById("debugRep").textContent = repetition.toString();
    return repetition; // .toString();
}

// OKAY, so each individual function works FINE.
// What if I just make a function that calls each of those in order and use THAT?!
// need to add a "return" to each one and split MG and MG Delay...
// Alright, that's done, now let's make a thing that strings them together and pushes each to an array

function debugMakeGame() {
    var debugGameConfig = [];
    debugGameConfig.push(debugSetPlayerCount());
    debugGameConfig.push(debugSetList());
    debugGameConfig.push(debugSetPhys());
    debugGameConfig.push(debugSetTheme());
    debugGameConfig.push(debugSetSchool());
    debugGameConfig.push(debugSetDuration());
    debugGameConfig.push(debugSetRarity());
    debugGameConfig.push(debugSetRep());
    debugGameConfig.push(debugSetRM());
    debugGameConfig.push(debugSetVeng()); // Why doesn't this, 
    debugGameConfig.push(debugSetMG());  // this, 
    debugGameConfig.push(debugSetMGDelay()); // or this fire? What's wrong with RM?
    document.getElementById("debugMakeGameOutput").textContent = debugGameConfig.join(", ");

}

// AAAAAARGH


// HAHAHAHAHA, I had typed "customRarityMAttersToggle", LOOK AT THE CAPITAL 'A' HAHAHAHAHAHA

// Let's make it an object instead... (THANKS AARON)
function makeGameConfig() {
    const gameConfig = {
        players: debugSetPlayerCount(), // string
        list: debugSetList(), // any
        physical: debugSetPhys(), // any
        theme: debugSetTheme(), // string
        school: debugSetSchool(), // any[]
        duration: debugSetDuration(), // any[]
        rarity: debugSetRarity(), // any[]
        repetition: debugSetRep(), // any
        rarityMatters: debugSetRM(), // any
        vengeance: debugSetVeng(), // any
        minigame: debugSetMG(), // any
        minigameDelay: debugSetMGDelay() // any
    };
    const gameConfigString = JSON.stringify(gameConfig, null, 2);
    document.getElementById("makeGameObject").innerHTML = gameConfigString;

}

// IT LIVES!

//
//
// LET'S MAKE A LIST!

// First, load the main JSON as our library:

// tell it where it is
const filePath = './lists/chaosList.json'

// declare the library with global scope calling the file loader
const effectLibrary = loadJSON(filePath)

// function to go get the file
async function loadJSON(filePath) {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}
// set up filterCriteria
const filterCriteria = {
    player: "",
    inclusion: "",
    exemplarTheme: "",
    school: [""],
    duration: [""],
    rarity: [""]
}
// define the filter criteria (based on gameConfig array)
function defineFilter() {
    // First, the list selection will determine SO MUCH, so it's top level logic
    // aaaaaand I'm gonna do it with a case...
    // OH! Since I objectified gameConfig, and the filter condition is an object
    // I don't have to do this in a crazy tree!

    // How... How do I add attributes to an object?
    // can I do const filterCriteria.list = micro ??
    switch (gameConfig.list) {
        case "micro":
            const filterCriteria.baseList = "micro"

        break;
        case "lite":

        break;
        case "exemplar":

        break;
        case "legacy":

        break;
        case "full":

        break;
        case "custom":

    }

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
