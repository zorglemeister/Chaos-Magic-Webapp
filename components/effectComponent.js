
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
    <button type="button" class="descSwitch descButtonClosed"></button>
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
    connectedCallback() { // what happens when this is reparented? do I need to use something on the first render only? UPDATE - reparenting does NOT trip connectedCallback() !!
        // I need a uniqueId for each instance of this component, because DOM manipulation (reparenting)
        let effectContent = effectTemplate.content.cloneNode(true); // copy the template into this instance (const? or let? I'm going to be modifying the contents, right? so let.)
        effectContent.getElementsByClassName('effectContainer')[0].setAttribute('id', `effect-${this.randomUnique()}`); // does this WORK? will be cool if it does.
        // could also use this to tag id/label pairs with a .setAttribute('for', uniqueId);
        // might be worth pulling this into a higher-scope method
        this.append(effectContent); // sticks the updated copy in the DOM

        this.render(); 
    }
    render() {
        // get the generatedEffect

        // put the pieces of the generated effect into the template contents


        let rollTags = this.getElementsByTagName('z-rb'); // find all the rollTags
        for (let rollTag of rollTags) { // loop through them and add an event handler on update
            rollTag.addEventListener('update', this.updateLinkedRollTags.bind(this, rollTag.getAttribute('id'), rollTag.innerHTML)); // when one is updated, find its pair and match the contents
        }
        this.getElementsByClassName('descSwitch')[0].addEventListener('click', this.toggleDescContent.bind(this)); // desc expand/shrink button
    }
    toggleDescContent() {
        this.getElementsByClassName('descSwitch')[0].classList.toggle('descButtonClosed');
        this.getElementsByClassName('descSwitch')[0].classList.toggle('descButtonOpen');
        this.getElementsByClassName('shortDesc')[0].classList.toggle('hiddenPart');
        this.getElementsByClassName('fullDesc')[0].classList.toggle('hiddenPart');
    }
    randomUnique() {
        return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; 
        // should be sufficiently unique because timestamp inclusion, even if the randomizer creates the same output twice
        // sliced because the Math.random().toString(36) will always start with a "0.", so that's like, two characters less random, amirite?
        // this is where I hum The Eels "My Beloved Monster" (you're welcome, Jewel!)
    }
    linkRollButtons() {
        let sRollTags = this.getElementsByClassName('shortDesc')[0].getElementsByTagName('z-rb'); // collects z-rb tags in shortDesc
        let fRollTags = this.getElementsByClassName('fullDesc')[0].getElementsByTagName('z-rb'); // collects z-rb tags in fullDesc
        // assumptions:
        // 1 - there are the same number of rollTags in shortDesc as there are in fullDesc
        // 2 - the rollTags are in the same order in each
        for (let i = 0; i < sRollTags.length; i++) { // loop through the contents of sRollTags
            let sharedId = this.randomUnique() // for each entry pair, generate a uniqueId
            sRollTags[i].setAttribute('id', `sroll-${sharedId}`); // add sroll-[SharedId] to the tag in shortDesc
            fRollTags[i].setAttribute('id', `froll-${sharedId}`); // add froll-[SharedId] to the corresponding tag in fullDesc
        }
    }
    updateLinkedRollTags(triggerTagId, updatedContent) {
        // snag the triggering element Id - remember, getAttribute() returns lowercase
        // copy the updated content (should be the outcome of the roll) as innerHTML
        // figure out if the update came from sRoll or fRoll
        if (triggerTagId.substring(0, 1) === "s") { // if sRoll is triggered
            let fRollTags = this.getElementsByClassName('fullDesc')[0].getElementsByTagName('z-rb');// find the matching fRoll
            for (let fRollTag of fRollTags) {
                if (fRollTag.getAttribute('id') === `f${triggerTagId.slice(1)}`) {
                    fRollTag.innerHTML = updatedContent; // replace the fRoll.innerHTML with updated content (this wipes the button out and prevents a re-click)
                }
            }
        } else { // if fRoll is triggered
            let sRollTags = this.getElementsByClassName('shortDesc')[0].getElementsByTagName('z-rb');// find the matching sRoll
            for (let sRollTag of sRollTags) {
                if (sRollTag.getAttribute('id') === `s${triggerTagId.slice(1)}`) {
                    sRollTag.innerHTML = updatedContent; // replace the sRoll.innerHTML with updated content (this wipes the button out and prevents a re-click)
                }
            }
        }

        // potential complication: will this update trigger the EventListener again? if so, should i add a "rollFixed" class to check for and prevent an update loop?
    }
}

export const registerEffectComponent = () => {
    customElements.define('z-eff', EffectComponent);
}