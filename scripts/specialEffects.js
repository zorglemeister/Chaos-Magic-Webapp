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
    let playerCount = shared.getActivePlayers();
    let effectShortIntro = 'Each player creates some Zerglings.'; // First part of shortDesc
    let effectFullIntro = 'Each player creates 2d6 1/1 colorless Zergling creature tokens with haste.'; // First part of fullDesc
    let effectFuncContent = '<div class="individualRollContainer">'; // Builds a container with a dice block for each player
    for (let i = 0; i < playerCount; i++) {
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
    let playerCount = shared.getActivePlayers();
    let effectShortIntro = 'Everyone gains some life.'; // First part of shortDesc
    let effectFullIntro = 'Gain 2d10 life. All other players gain 1d10 life.'; // First part of fullDesc
    let effectFuncContent = '<div class="individualRollContainer">'; // Builds a container with a dice block for each player
    effectFuncContent = effectFuncContent + `<div class="individualRollBox">
            <div class="individualRollTitle">You</div>
            <z-rb>2d20</z-rb>
            </div>`;
    for (let i = 0; i < (playerCount - 1); i++) { 
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




