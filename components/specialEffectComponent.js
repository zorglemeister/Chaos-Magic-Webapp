// This'll handle any of the weird and complicated effects
// like the "roll more times" or the intricately-worded-yet-dynamic ones
// It'll be set up much like the "word" handling of the rollButton
// where I pass the name/id of the effect in the contents of the component tag
// and then parse that through a switch/case to the method for that effect
// returning the content for the effectComponent that it was included in
// This'll replace the descBlock of the effectComponent template, so output needs to be in this stucture:
// <div class="descBlock">
//     <div class="shortDesc"></div>
//     <div class="fullDesc hiddenPart"></div>
// </div>

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
        const sourceText = this.textContent.trim(); // Get the text
        this.innerHTML = handleEffect(sourceText); // make it happen!
    }
        handleEffect(index) { // can i just use the content of the tag to directly call a method of the same name?
        let returnBody = null;
        // let option = null; // if i need another block scope, i can set it up here
        // some of these will involve tripping the randomizer, how do i target that method from gameComponent?
        switch (word) {
            case '':
                // 

                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
        } 
        return returnBody; // should return as something that works in innerHTML
    }
    // Here's the dice roller, because that's always nice


    // Beyond this is the specific effect functions
    // each one will be called by the effect's canonical index number
    // if there's a randomized element, it should be styled to look like the rollButton
    // if rollButton can be used (for example, Zerg Rush has each player roll 2d6), use it
    // the output format should be nearly identical to the effectComponent structure

    // Zerg Rush (136)
    effect136() {
        let effectShortIntro = '<div style="effectText">Each player creates some Zerglings.</div>'; // First part of shortDesc
        let effectFullIntro = '<div style="effectText">Each player creates 2d6 1/1 colorless Zergling creature tokens with haste.</div>'; // First part of fullDesc
        let effectFuncContent = '<div style="136ZergContainer">'; // Builds a container with a dice block for each player
        for (let i = 0; i < playerCount; i++) { // How do i reference the gameConfig variable?
            effectFuncContent = effectFuncContent + `<div style="136ZergPlayerBox">
                <div style="136ZergPlayerTitle">Player ${i + 1}</div>
                <z-rb>2d6</z-rb>
                </div>`;
            }
        effectFuncContent = effectFuncContent + '</div>'; // wraps the container
        return `<div class="descBlock">
            <div class="shortDesc">${effectShortIntro}${effectFuncContent}</div>
            <div class="fullDesc hiddenPart">${effectFullIntro}${effectFuncContent}</div>
            </div>`; // returns the descBlock construct with the same functional content in both the short and full
    }

    // Nuclear Launch Detected (104)
    effect104() {
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
}

export const registerSpecialEffectComponent = () => {
    customElements.define('special-effect', SpecialEffect);
}