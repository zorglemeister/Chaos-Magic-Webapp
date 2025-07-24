// This holds the main gamestate and all the little pieces of it.



// for now, it's notes.

// here's moving the active effect to the top of the history section:
moveActiveToHistory() {
    const activeEffect = document.getElementById('activeContainer').firstChild; // get the first (and only) div in the active container
    const historyTarget = document.getElementById('historyContainer'); // get the history container
    historyTarget.insertBefore(activeEffect, historyTarget.firstChild); // reparent the effect to the top of the history container
}