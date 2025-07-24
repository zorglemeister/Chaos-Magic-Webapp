// This holds the main gamestate and all the little pieces of it.



// for now, it's notes.

// Initial state:
// active = empty
// history = empty
// roll = visible
// vengeance = setting
// minigame = setting

// Main flow:
// Roll is clicked
// if activeEffect exists, move to history (visual note: slide historyDrawer up just enough to see the old effect add to it, then close it again)
// generate newEffect, add to active
// increment turn counter

// vengeance flow:
// vengeace is clicked
// if vengeanceEffect exists, remove it from vengeanceModal
// generate vengeanceEffect, add to vengeanceModal
// display vengeanceModal
// when "vengeance complete" is clicked, hide vengeanceModal

// minigame flow
// (pretty much just the same as vengeance)




// here's moving the active effect to the top of the history section:
moveActiveToHistory() {
    const activeEffect = document.getElementById('activeContainer').firstChild; // get the first (and only) div in the active container
    const historyTarget = document.getElementById('historyContainer'); // get the history container
    historyTarget.insertBefore(activeEffect, historyTarget.firstChild); // reparent the effect to the top of the history container
}