
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


// ###########################
// Special Effect Functions
// ###########################

// REUSE BITS

// die roller (count, sides) - Returns a single number
function dieRoll(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++){
        let roll = Math.ceil(Math.random() * sides);
        total = total + roll;
    }
    return total;
}

// random direction - Returns "left" or "right"
function randDirection() {
    let genDir = "right";
    if (dieRoll(1,2) === 1) {
        genDir = "left";
    } 
    return genDir;
}

//Effect specFunc

// Stream of Life (35)
function effectStreamOfLife() {
    let message = "";
    message += "Gain " += toString(dieRoll(1,10)) += " life.";
    return message;
}
// Can I just do let message = "all the bits"?

// River of Life (36)
function effectRiverOfLife() {
    let message = "";
    message += "Gain " += toString(dieRoll(1,20)) += " life.";
    return message;
}
// Ocean of Life (36)
function effectOceanOfLife() {
    let message = "";
    message += "Gain " += toString(dieRoll(2,20)) += " life. Each opponent gains " += toString(dieRoll(1,10)) += " life.";
    return message;
}

// Musical Chairs (38)
function effectMusicalChairs() {
    let message = "";
    message += "Players (and any player-attached auras, counters, life totals, etc.) rotate to the " += randDirection() += ". All cards in other zones remain where they started.";
    return message;
}
// Musical Hands (39)
function effectMusicalHands() {
    let message = "";
    message += "Each player's hand is passed to the player to the " += randDirection() += ".";
    return message;
}
// Musical Libraries (40)
function effectMusicalLibraries() {
    let message = "";
    message += "Each player's library is passed to the player to the " += randDirection() += ".";
    return message;
}
// Musical Life (41)
function effectMusicalLife() {
    let message = "";
    message += "Each player's life total is transferred to the player to the " += randDirection() += ".";
    return message;
}
// Musical Creatures (42)
function effectMusicalCreatures() {
    let message = "";
    message += "All creatures each player controls are passed to the player to the " += randDirection() += ". They remain tapped or untapped.";
    return message;
}
// Musical Lands (43)
function effectMusicalLands() {
    let message = "";
    message += "All lands each player controls are passed to the player to the " += randDirection() += ". They remain tapped or untapped.";
    return message;
}
// Hurkyl's Mixer (315)
function effectHurkylMixer() {
    let message = "";
    message += "Put all artifacts target player controls into the player to their " += randDirection() += "'s hand.";
    return message;
}
// An almost fanatical devotion to the Pope! (47)
function effectPopeDevotion() {
    let message = "";
    message += "Create " += toString(dieRoll(1,6)) += " Spirits.";
    return message;
}
// Nice red uniforms! (48)
function effectRedUniforms() {
    let message = "";
    message += "Create " += toString(dieRoll(1,3)) += " Dragons.";
    return message;
}
// Redshirt Brigade (55)
function effectRedshirts() {
    let message = "";
    message += "Create " += toString(dieRoll(2,4) + 1) += " Starfleet Ensigns.";
    return message;
}
// Someone Didn't Balance This One (58)
function effectNoBalance() {
    let message = "";
    message += "Gain 20 life. Each opponent loses 5 life. Each opponent sacrifices a creature, artifact, and land. Create " += toString(dieRoll(1,3)) += " Goliaths. You become the monarch.";
    return message;
}
// random colour + choice
// Nuclear Launch Detected (104)
function effectColorNuke() {
    let message = "Choose a color. Destroy all permanents of chosen color.";
    switch (dieRoll(1,6)) {
        case "1":
            message = "Destroy all white permanents.";
        break;
        case "2":
            message = "Destroy all blue permanents.";
        break;
        case "3":
            message = "Destroy all black permanents.";
        break;
        case "4":
            message = "Destroy all red permanents.";
        break;
        case "5":
            message = "Destroy all green permanents.";
        break;
        case "6":
            message = "Choose a color. Destroy all permanents of chosen color.";
    }
    return message;
}
// Zerg Rush (136) ***********************************************************************************
function effectZergRush() {
    let message = "";
    message += "Create " += toString(dieRoll(2,6)) += " Zerglings."; // NEED A BUTTON THAT RANDOMIZES, so each player rolls.
    return message;
}
// Thopter Brigade (153)
function effectThopters() {
    let message = "";
    message += "Create " += toString(dieRoll(1,8)) += " Thopters.";
    return message;
}
// Scryb Brigade (154)
function effectScryb() {
    let message = "";
    message += "Create " += toString(dieRoll(1,4)) += " Sprites.";
    return message;
}
// Whelp Brigade (155)
function effectWhelps() {
    let message = "";
    message += "Create " += toString(dieRoll(1,3)) += " Whelps.";
    return message;
}
// How Many Of These Are There?! (156) ***********************************************************************************
function effectHowMany() {
    let message = "";
    message += "Create " += toString(dieRoll(2,6)) += " Zerglings."; // Rolls twice, displays those results.
    return message;
}
// By The Gods Below, Make It Stop, Please! (172) ***********************************************************************************
function effectMakeItStop() {
    let message = "";
    message += "Create " += toString(dieRoll(2,6)) += " Zerglings."; // Rolls thrice, displays those results.
    return message;
}
// Oh No, Not Again... (173) ***********************************************************************************
function effectNotAgain() {
    let message = "";
    message += "Create " += toString(dieRoll(2,6)) += " Zerglings."; // Repeats the previous roll.
    return message;
}
// Ryan Loves Dice (185)
function effectRyanDice() {
    let message = "";
    let plusY = toString(dieRoll(1,20));
    message += "Choose up to " += toString(dieRoll(1,8)) += " target creatures. Put " += toString(dieRoll(1,6)) += " +1/+1 counters on each. Choose up to " += toString(dieRoll(1,4)) += " other target creatures. Those gain +" += plusY += "/+" += plusY += " until end of turn. All players discard " += toString(dieRoll(1,6)) += " cards, then draw " += toString(dieRoll(1,8)) += " cards. Flip a coin. If you win the flip, all players gain " += toString(dieRoll(1,10)) += " life. If you lose the flip, all players lose " += toString(dieRoll(2,4)) += " life.";
    return message;
}
// random colour + colourless
// Bouncy house (187)
function effectBouncyHouse() {
    let message = "generic";
    switch (dieRoll(1,6)) {
        case "1":
            message = "Return all white permanents to their owner's hand.";
        break;
        case "2":
            message = "Return all blue permanents to their owner's hand.";
        break;
        case "3":
            message = "Return all black permanents to their owner's hand.";
        break;
        case "4":
            message = "Return all red permanents to their owner's hand.";
        break;
        case "5":
            message = "Return all green permanents to their owner's hand.";
        break;
        case "6":
            message = "Choose a color. Return all permanents of chosen color to their owner's hand.";
    }
    return message;
}
// Chaos Choice (200) ***********************************************************************************
function effectChaosChoice() {
    let message = "";
    message += "Create " += toString(dieRoll(2,6)) += " Zerglings."; // Somehow need to browse the list and select an effect.
    return message;
}
// Raid the Library (210)
function effectRaidLibrary() {
    let message = "";
    message += "Until the start of your next turn, all players have no maximum hand size. Each player draws " += toString(dieRoll(2,6)) += " cards.";
    return message;
}

// random mana
// Effects: Chaos Sleight (321), Terrestrial Upheaval (494)
function randMana() {
    let genMana = "generic";
    switch (dieRoll(1,6)) {
        case "1":
            genMana = "white";
        break;
        case "2":
            genMana = "blue";
        break;
        case "3":
            genMana = "black";
        break;
        case "4":
            genMana = "red";
        break;
        case "5":
            genMana = "green";
        break;
        case "6":
            genMana = "generic";
    }
    return genMana;
}

// random basic land type
function randBasicLand() {
    let genLand = "wastes";
    switch (dieRoll(1,6)) {
        case "1":
            genLand = "plains";
        break;
        case "2":
            genLand = "island";
        break;
        case "3":
            genLand = "swamp";
        break;
        case "4":
            genLand = "mountain";
        break;
        case "5":
            genLand = "forest";
        break;
        case "6":
            genLand = "wastes";
    }
    return genLand;
}

// random land type basic + nonbasic - wastes
// Effect: Chaos Hack (322)
function randLandHack() {
    let genLand = "nonbasic";
    switch (dieRoll(1,6)) {
        case "1":
            genLand = "plains";
        break;
        case "2":
            genLand = "island";
        break;
        case "3":
            genLand = "swamp";
        break;
        case "4":
            genLand = "mountain";
        break;
        case "5":
            genLand = "forest";
        break;
        case "6":
            genLand = "nonbasic";
    }
    return genLand;
}

// random land type basic + non-basic
// Effect: Dicewalk (636)
function randLandWalk() {
    let genWalk = "nonbasic landwalk";
    switch (dieRoll(1,7)) {
        case "1":
            genWalk = "plainswalk";
        break;
        case "2":
            genWalk = "islandwalk";
        break;
        case "3":
            genWalk = "swampwalk";
        break;
        case "4":
            genWalk = "mountainwalk";
        break;
        case "5":
            genWalk = "forestwalk";
        break;
        case "6":
            genWalk = "wasteswalk";
        break;
        case "7":
            genWalk = "nonbasic landwalk";
    }
    return genWalk;
}

// random walk
// Effect: Boots, Made for Walking (928)
function randWalk() {
    let genWalk = "full art landwalk";
    switch (dieRoll(1,7)) {
        case "1":
            genWalk = "plainswalk";
        break;
        case "2":
            genWalk = "islandwalk";
        break;
        case "3":
            genWalk = "swampwalk";
        break;
        case "4":
            genWalk = "mountainwalk";
        break;
        case "5":
            genWalk = "forestwalk";
        break;
        case "6":
            genWalk = "wasteswalk";
        break;
        case "7":
            genWalk = "nonbasic landwalk";
        break;
        case "8":
            genWalk = "denimwalk";
        break;
        case "9":
            genWalk = "snackwalk";
        break;
        case "10":
            genWalk = "facewalk";
        break;
        case "11":
            genWalk = "no cards in handwalk";
        break;
        case "12":
            genWalk = "snow landwalk";
        break;
        case "13":
            genWalk = "legendary landwalk";
        break;
        case "14":
            genWalk = "artifact landwalk";
        break;
        case "15":
            genWalk = "sagawalk";
        break;
        case "16":
            genWalk = "desertwalk";
        break;
        case "17":
            genWalk = "commanderwalk";
        break;
        case "18":
            genWalk = "eldraziwalk";
        break;
        case "19":
            genWalk = "proxywalk";
        break;
        case "20":
            genWalk = "energywalk";
        break;
        case "21":
            genWalk = "+1/+1 walk";
        break;
        case "22":
            genWalk = "full art landwalk";
    }
    return genWalk;
}

// random land type basic + all : "a/an/any landtype"
// Effect: Flare (635)
function effectFlare635() {
    let genLand = "any land";
    switch (dieRoll(1,7)) {
        case "1":
            genLand = "a plains";
        break;
        case "2":
            genLand = "an island";
        break;
        case "3":
            genLand = "a swamp";
        break;
        case "4":
            genLand = "a mountain";
        break;
        case "5":
            genLand = "a forest";
        break;
        case "6":
            genLand = "a waste";
        break;
        case "7":
            genLand = "any land";
    }
    return genLand;
}

// random permanent type
// Effect: Tariff Sheriff (911)
function randBasicLand() {
    let genLand = "non-basic";
    switch (dieRoll(1,7)) {
        case "1":
            genLand = "plains";
        break;
        case "2":
            genLand = "island";
        break;
        case "3":
            genLand = "swamp";
        break;
        case "4":
            genLand = "mountain";
        break;
        case "5":
            genLand = "forest";
        break;
        case "6":
            genLand = "wastes";
        break;
        case "7":
            genLand = "non-basic";
    }
    return genLand;
}







//
//
// THIS IS ALL THE EFFECT-LEVEL SPECIAL FUNCTIONS
//
// They should all return two strings:
// one for the short desc
// one for the full desc
