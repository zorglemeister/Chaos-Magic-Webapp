
// import child components
import { registerRollButtonComponent } from './rollButtonComponent.js';
import { registerInlineSymbolComponent } from './inlineSymbolComponent.js';

// import specialEffects.js <- holds all the effect-specific scripts
import * as special from '../scripts/specialEffects.js';
// define a template

const effectTemplate = document.createElement('template');

// effect parameters the display cares about:
// effectName
// shortDesc
// fullDesc
// displayNum
// component
// inspiration
// specFunc (just for the call)
effectTemplate.innerHTML = `
<div class="effectContainer">
    <div class="effectName"></div>
    <div class="displayNum"></div>
    <div class="descDetails">
        <div class="descBlock">
            <div class="shortDesc"></div>
            <div class="fullDesc hiddenPart"></div>
        </div>
        <div class="effectComponents"></div>
        <div class="inspiration"></div>
    </div>
    <button type="button" class="descSwitch descClosed"></button>
</div>
`

// handling flow:
// receive effect data from randomizer
// check for and call any special effects
// put the effect data into the template

// generate a unique ID for the effectContainer div
// this will facilitate reparenting it between active and history

// Effect shortdesc should have a "⮟ ⮟" at the bottom that expands to the full description
// clicking that hides the short, displays the full, and changes to a "⮝ ⮝"
// this'll use the same CSS class structure and JS toggle as the helpBox

// this way, the specialEffect payload can be used for the whole "descBlock", and I don't have to write two functions (one for each return)

// replacement syntax for specialEffect
// insertSpecial(specFunc) {
// this.getElementsByClassName("descBlock")[0].innerHTML = special.specFunc();
// }

// scope challenge for effects that reference other effects (like "roll twice" or "repeat last"):
// how do I allow the specialEffect function to reference the effect generator and the effect history?
// I only want one instance of the randomizer, so it'll be loaded in index.js and then can be called from special effect. I won't need the FULL effect body (right?), so maybe I write a new interpreter there? or should I compartmentalize the effect composer as well?
// what happens if "roll twice" happens to generate "roll thrice"?

class EffectComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() { // what happens when this is reparented? do I need to use something on the first render only?
        // I need a uniqueId for each instance of this component, because DOM manipulation (reparenting)
        const uniqueId = 'effect-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}'; //generate unique Id "effect-timestamp-randomNumber" (should be sufficiently unique because timestamp inclusion, even if the randomizer)
        let effectContent = effectTemplate.content.cloneNode(true); // copy the template into this instance (const? or let? I'm going to be modifying the contents, right? so let.)
        effectContent.getElementsByClassName('effectContainer')[0].setAttribute('id', uniqueId); // does this WORK? will be cool if it does.
        // could also use this to tag id/label pairs with a .setAttribute('for', uniqueId);
        // might be worth pulling this into a higher-scope method
        this.append(effectContent); // sticks the updated copy in the DOM

        this.render(); 
    }
    render() {

    }
    randomElementId() {
        

    }
}

export const registerEffectComponent = () => {
    customElements.define('z-eff', EffectComponent);
}