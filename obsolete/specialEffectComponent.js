// This'll handle any of the weird and complicated effects
// like the "roll more times" or the intricately-worded-yet-dynamic ones
// returning the content for the effectComponent that it was included in
// This'll populate the descBlock of the effectComponent template, so output needs to be in this stucture:
//     <div class="shortDesc"></div>
//     <div class="fullDesc hiddenPart"></div>

import * as shared from '../scripts/sharedAssets.js'; // includes randomUnique() and dieRoll(count, sides)

class SpecialEffect extends HTMLElement {
    constructor() {
        super(); // apparently this is important?
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        const sourceText = this.textContent.trim(); // Get the text content
        this.innerHTML = handleEffect(sourceText); // make it happen!
    }
    /* handleEffect(index) { // can i just use the content of the tag to directly call a method of the same name?
        // i don't want to just pull a function based on the sourcetext, but i need a way to call a somewhat arbitrary method...
        // can I define "functions" as an object with key-value pairs for the index and the function name?
        let functionList = {
            11: 'this.effect11', // TEST EFFECT
            104: 'this.effect104', // Nuclear Launch Detected
            136: 'this.effect136', // Zerg Rush
            37: 'this.effect37' // Ocean of Life
            // indexNum: 'this.effect[indexNum]', // Effect Name
        }
        let returnBody = null;
        if (functionList[index]) {
            returnBody = functionList[index]();
        } else {
            returnBody = "What are you doing? (Special Function not found/defined)"
        }
        return returnBody; // should return as something that works in innerHTML
    } */
    handleEffect(index) { // LETS TRY IT A DIFFERENT WAY
        const methodName = `effect${index}`; // build the methodName
        if (typeof this[methodName] === 'function') { // if the methodName is actually a function...
            return this[methodName](); // run it
        } else { // otherwise...
            return 'Custom function not defined'; // let me know it didn't work
        }
    }

    // Beyond this is the specific effect functions
    // each one will be called by the effect's canonical index number
    // if there's a randomized element, it should be styled to look like the rollButton
    // if rollButton can be used (for example, Zerg Rush has each player roll 2d6), use it
    // the output format should be identical to the effectComponent structure

    // TEST EFFECT (remove before going live)
    effect11() {
        return `<div class="shortDesc">SPECIAL EFFECT DID THIS</div>
            <div class="fullDesc hiddenPart">OHAI, Full desc from a special effect</div>
            `;
    }

    // Zerg Rush (136)
    effect136() {
        let effectShortIntro = 'Each player creates some Zerglings.'; // First part of shortDesc
        let effectFullIntro = 'Each player creates 2d6 1/1 colorless Zergling creature tokens with haste.'; // First part of fullDesc
        let effectFuncContent = '<div class="136ZergContainer">'; // Builds a container with a dice block for each player
        for (let i = 0; i < shared.playerCount; i++) {
            effectFuncContent = effectFuncContent + `<div class="136ZergPlayerBox">
                <div class="136ZergPlayerTitle">Player ${i + 1}</div>
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
    effect37() {
        let effectShortIntro = 'Everyone gains some life.'; // First part of shortDesc
        let effectFullIntro = 'Gain 2d10 life. All other players gain 1d10 life.'; // First part of fullDesc
        let effectFuncContent = '<div class="37OceanContainer">'; // Builds a container with a dice block for each player
        effectFuncContent = effectFuncContent + `<div class="37OceanPlayerBox">
                <div class="37OceanPlayerTitle">You</div>
                <z-rb>2d20</z-rb>
                </div>`
        for (let i = 0; i < (shared.playerCount - 1); i++) { 
            effectFuncContent = effectFuncContent + `<div class="37OceanPlayerBox">
                <div class="37OceanPlayerTitle">Player ${i + 1}</div>
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
    effect104() {
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
        
        return effectContent;
    }
    effect104click() {
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
    }
}

export const registerSpecialEffectComponent = () => {
    customElements.define('special-effect', SpecialEffect);
}