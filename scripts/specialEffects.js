// Rewriting the component as a module here.
// This'll contain the functions for the dozen-or-so really special effects that can't be handled by regular ccomponents
// like the "roll more times" or the intricately-worded-yet-dynamic ones
// returning the content for the effectComponent that it was included in
// This'll populate the descBlock of the effectComponent template, so output needs to be in this stucture:
//     <div class="shortDesc"></div>
//     <div class="fullDesc hiddenPart"></div>

import * as shared from '../scripts/sharedAssets.js'; // includes randomUnique() and dieRoll(count, sides)


// TEST EFFECT (remove before going live)
export function effect11() {
    return `<div class="shortDesc">SPECIAL EFFECT DID THIS</div>
        <div class="fullDesc hiddenPart">OHAI, Full desc from a special effect</div>
        `;
}

// Zerg Rush (136)
export function effect136() {
    let effectShortIntro = 'Each player creates some Zerglings.'; // First part of shortDesc
    let effectFullIntro = 'Each player creates 2d6 1/1 colorless Zergling creature tokens with haste.'; // First part of fullDesc
    let effectFuncContent = '<div class="individualRollContainer">'; // Builds a container with a dice block for each player
    for (let i = 0; i < shared.playerCount; i++) {
        effectFuncContent = effectFuncContent + `<div class="individualRollBox">
            <div class="individualRollTitle">Player ${i + 1}</div>
            <z-rb>2d6</z-rb>
            </div>`;
        }
    effectFuncContent = effectFuncContent + '</div>'; // wraps the container
    return `
        <div class="shortDesc">${effectShortIntro}${effectFuncContent}</div>
        <div class="fullDesc hiddenPart">${effectFullIntro}${effectFuncContent}</div>
        `; // returns the descBlock construct with the same functional content in both the short and full
}

// Ocean of Life (37)
export function effect37() {
    let effectShortIntro = 'Everyone gains some life.'; // First part of shortDesc
    let effectFullIntro = 'Gain 2d10 life. All other players gain 1d10 life.'; // First part of fullDesc
    let effectFuncContent = '<div class="individualRollContainer">'; // Builds a container with a dice block for each player
    effectFuncContent = effectFuncContent + `<div class="individualRollBox">
            <div class="individualRollTitle">You</div>
            <z-rb>2d20</z-rb>
            </div>`;
    for (let i = 0; i < (shared.playerCount - 1); i++) { 
        effectFuncContent = effectFuncContent + `<div class="individualRollBox">
            <div class="individualRollTitle">Player ${i + 1}</div>
            <z-rb>1d10</z-rb>
            </div>`;
        }
    effectFuncContent = effectFuncContent + '</div>'; // wraps the container
    return `
        <div class="shortDesc">${effectShortIntro}${effectFuncContent}</div>
        <div class="fullDesc hiddenPart">${effectFullIntro}${effectFuncContent}</div>
        `; // returns the descBlock construct with the same functional content in both the short and full
}

// Nuclear Launch Detected (104)
export function effect104() {
    // create linking ID
    let sharedId = shared.randomUnique();
    // create shortDesc ID
    let shortId = `sdesc-${sharedId}`;
    // create fullDesc ID
    let fullId = `fdesc-${sharedId}`;
    // create shortButton ID
    let shortButtonId = `sbutt-${sharedId}`;
    // create fullButton ID
    let fullButtonId = `fbutt-${sharedId}`;
    // set up the shortDesc
    let shortDesc = `<div id="${shortId}"<button class="specRoll" id="${shortButtonId}>&#127922; Destroy a random color.</button></div>`;
    // set up the fullDesc
    let fullDesc = `<div id="${fullId}"<button class="specRoll" id="${fullButtonId}>&#127922; Destroy a random color.</button></div>`;
    // create the content body
    let effectContent = `
        <div class="shortDesc">${shortDesc}</div>
        <div class="fullDesc hiddenPart">${fullDesc}</div>
        `;
    // set up click handlers
    const shortButton = this.getElementById(shortButtonId);
    const fullButton = this.getElementById(fullButtonId);
    shortButton.addEventListener('click', this.effect104click.bind(this));
    fullButton.addEventListener('click', this.effect104click.bind(this));
    return effectContent;
}
export function effect104click() {
    switch (shared.dieRoll(1,6)) {
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
    this.shortButton.innerHTML = message;
    this.fullButton.innerHTML = message;
}




