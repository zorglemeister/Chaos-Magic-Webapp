



// Collects all the game settings and turns them into an object
// WHY DOESN'T THIS WORK??!?!?!?!
function makeGame() {
    const gameConfig = []
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
        exemplarTheme = "All";
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
    var customRarityMatters = document.getElementById("customRarityMAttersToggle").checked;
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

//
//
// LET'S MAKE A LIST!

// First, load the main JSON as our library:

// tell it where it is
const filePath = './lists/chaosList.json'

// declare the library with global scope calling the file loader
const effectLibrary = loadJson(filePath)

// function to go get the file
async function loadJSON(filePath) {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}




//
//
// THIS IS THE RANDOMIZER STUFF



// Basic Randomizer
// const sourceList = 
// function basicGenerator() {
//     var 
rngValue = Math.floor(Math.random() * effectList.length);

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
