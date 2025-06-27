// THIS FILE HOLDS THE EFFECT SCRIPTS

//
//
// THIS IS ALL THE EFFECT-LEVEL SPECIAL FUNCTIONS
//
// They should all return two strings:
// one for the short desc
// one for the full desc
// Some might have custom buttons?

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
    return "Gain ${toString(dieRoll(1,10))} life.";
}
// River of Life (36)
function effectRiverOfLife() {
    return "Gain ${toString(dieRoll(1,20))} life.";
}
// Ocean of Life (36)
function effectOceanOfLife() {
    return "Gain ${toString(dieRoll(2,20))} life. Each opponent gains ${toString(dieRoll(1,10))} life.";
}
// Musical Chairs (38)
function effectMusicalChairs() {
    return "Players (and any player-attached auras, counters, life totals, etc.) rotate to the ${randDirection()}. All cards in other zones remain where they started.";
}
// Musical Hands (39)
function effectMusicalHands() {
    return "Each player's hand is passed to the player to the ${randDirection()}.";
}
// Musical Libraries (40)
function effectMusicalLibraries() {
    return "Each player's library is passed to the player to the ${randDirection()}.";
}
// Musical Life (41)
function effectMusicalLife() {
    let message = "";
    message += "Each player's life total is transferred to the player to the ${randDirection()}.";
}
// Musical Creatures (42)
function effectMusicalCreatures() {
    return "All creatures each player controls are passed to the player to the ${randDirection()}. They remain tapped or untapped.";
}
// Musical Lands (43)
function effectMusicalLands() {
    return "All lands each player controls are passed to the player to the ${randDirection()}. They remain tapped or untapped.";
}
// Hurkyl's Mixer (315)
function effectHurkylMixer() {
    return "Put all artifacts target player controls into the player to their ${randDirection()}'s hand.";
}
// An almost fanatical devotion to the Pope! (47)
function effectPopeDevotion() {
    return "Create ${toString(dieRoll(1,6))} Spirits.";
}
// Nice red uniforms! (48)
function effectRedUniforms() {
    return "Create ${toString(dieRoll(1,3))} Dragons.";
}
// Redshirt Brigade (55)
function effectRedshirts() {
    return "Create ${toString(dieRoll(2,4) + 1)} Starfleet Ensigns.";
}
// Someone Didn't Balance This One (58)
function effectNoBalance() {
    return "Gain 20 life. Each opponent loses 5 life. Each opponent sacrifices a creature, artifact, and land. Create ${toString(dieRoll(1,3))} Goliaths. You become the monarch.";
}
// random colour + choice
// Nuclear Launch Detected (104)
function effectColorNuke() {
    let message = "Something Went Wrong - Jo";
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
    return "Create ${toString(dieRoll(2,6))} Zerglings."; // NEED A BUTTON THAT RANDOMIZES, so each player rolls.
}
// Thopter Brigade (153)
function effectThopters() {
    return "Create ${toString(dieRoll(1,8))} Thopters.";
}
// Scryb Brigade (154)
function effectScryb() {
    return "Create ${toString(dieRoll(1,4))} Sprites.";
}
// Whelp Brigade (155)
function effectWhelps() {
    return "Create ${toString(dieRoll(1,3))} Whelps.";
}
// How Many Of These Are There?! (156) ***********************************************************************************
function effectHowMany() {
    return "Create ${toString(dieRoll(2,6))} Zerglings."; // Rolls twice, displays those results.
}
// By The Gods Below, Make It Stop, Please! (172) ***********************************************************************************
function effectMakeItStop() {
    return "Create ${toString(dieRoll(2,6))} Zerglings."; // Rolls thrice, displays those results.
}
// Oh No, Not Again... (173) ***********************************************************************************
function effectNotAgain() {
    return "Create ${toString(dieRoll(2,6))} Zerglings."; // Repeats the previous roll.
}
// Ryan Loves Dice (185)
function effectRyanDice() {
    let plusY = dieRoll(1,20).toString();
    return "Choose up to ${toString(dieRoll(1,8))} target creatures. Put ${toString(dieRoll(1,6))} +1/+1 counters on each. Choose up to ${toString(dieRoll(1,4))} other target creatures. Those gain +" + plusY + "/+" + plusY + " until end of turn. All players discard ${toString(dieRoll(1,6))} cards, then draw ${toString(dieRoll(1,8))} cards. Flip a coin. If you win the flip, all players gain ${toString(dieRoll(1,10))} life. If you lose the flip, all players lose ${toString(dieRoll(2,4))} life.";
}
// random colour + colourless
// Bouncy house (187)
function effectBouncyHouse() {
    let message = "Something Went Wrong - Jo";
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
    return "Create ${toString(dieRoll(2,6))} Zerglings."; // Somehow need to browse the list and select an effect.
}
// Raid the Library (210)
function effectRaidLibrary() {
    return "Until the start of your next turn, all players have no maximum hand size. Each player draws ${toString(dieRoll(2,6))} cards.";
}

// random mana
// Effects: Chaos Sleight (321), Terrestrial Upheaval (494)
function randMana() {
    let genMana = "Something Went Wrong - Jo";
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
    let genLand = "Something Went Wrong - Jo";
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
    let genLand = "Something Went Wrong - Jo";
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
    let genWalk = "Something Went Wrong - Jo";
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
    let genWalk = "Something Went Wrong - Jo";
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
    let genLand = "Something Went Wrong - Jo";
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
    let genLand = "Something Went Wrong - Jo";
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








