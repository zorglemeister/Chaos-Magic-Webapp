// import specialEffects.js <- holds all the effect-specific scripts
import * as special from '../scripts/specialEffects.js';

import * as shared from '../scripts/sharedAssets.js'; // includes randomUnique()


// define a template
/* const effectTemplate = document.createElement('template'); */

// effect parameters the display cares about:
// effectName
// shortDesc
// fullDesc
// displayNum
// component
// inspiration
// specFunc (just for the call)
/* effectTemplate.innerHTML = `
<div class="effectContainer">
    <div class="effectTitle">
        <div class="effectName"></div>
        <div class="displayNum"></div>
    </div>
    <div class="descDetails">
        <div class="descBlock"> <!-- this gets replaced by special effects -->
            <div class="shortDesc"></div>
            <div class="fullDesc hiddenPart"></div>
        </div>
        <div class="effectComponents hiddenPart"></div>
        <div class="inspiration hiddenPart"></div>
        <button type="button" class="descSwitch descButtonClosed"></button>
    </div>
</div>
`; */

// handling flow:
// receive effect data from randomizer (HOW?)
// check for and call any special effects
// put the effect data into the template

// can the randomizer add <z-eff>[CanonicalId]</z-eff> to the activeContainer and then this use that to go pull the effect from the list?
// that might work pretty well, the randomizer can maintain its own array of active effects and pop(norepeats) from that list as needed?
// *** update: don't need to do this, the new effect is written into shared.newEffect, can pull and interpret


// generate a unique ID for the effectContainer div
// this will facilitate reparenting it between active and history
// *** update: don't need to do this, reparenting is handled with container.firstElementChild

// Effect shortdesc should have a "⮟ ⮟" at the bottom that expands to the full description
// clicking that hides the short, displays the full, and changes to a "⮝ ⮝"
// this'll use the same CSS class structure and JS toggle as the helpBox

// this way, the specialEffect payload can be used for the whole "descBlock", and I don't have to write two functions (one for each return)

// replacement syntax for specialEffect   ****** REVISITING THIS
// insertSpecial(specFunc) {
// this.getElementsByClassName("descBlock")[0].innerHTML = special.specFunc();
// }
// *** CHECK THIS VVV
// I think it needs to check specFunc (boolean) and if true, it replaces descBlock with the shortDesc content
// This'll let the specialEffectComponent re-render the descBlock with its work

// scope challenge for effects that reference other effects (like "roll twice" or "repeat last"):
// how do I allow the specialEffect function to reference the effect generator and the effect history?
// I only want one instance of the randomizer, so it'll be loaded in index.js and then can be called from special effect. I won't need the FULL effect body (right?), so maybe I write a new interpreter there? or should I compartmentalize the effect composer as well?
// what happens if "roll twice" happens to generate "roll thrice"?


// REWORKING FLOW (October '25 Edition)
/* Okay, so the effect component needs a few attributes that can be used in other places:
1. The Effect
The primary effect details. Displays in the gameComponent.currentContainer.
Contains name, num, shortDesc, fullDesc, components, inspiration
Has interactions with the "expand details" button
May contain rollButton, flipCoin, and inlineSymbol components
2. The Active (Optional)
The effect details tuned for the "activeEffects" pane.
Contains name, activeDesc, duration, controllingPlayer
Has interactions with the "clear effect" button and turn tracker
May contain rollButton, flipCoin, and inlineSymbol components

How do we make these?
effect data is stored in shared.newEffect
it is structured like this:
{
    "effectName": "string", <-- every effect will have an effectName
    "shortDesc": "string", <-- every effect will have a shortDesc
    "fullDesc": "string", <-- many effects will have a fullDesc
    "activeDesc": "string", <-- some effect will have an activeDesc
    "indexNum": numeric,
    "displayNum": "string",
    "player": "string",
    "accessible": boolean,
    "inclusion": [
        "array",
        "of",
        "strings"
    ],
    "exemplarTheme": "string",
    "school": [
        "array",
        "of",
        "strings"
    ],
    "duration": "string",
    "rarity": "string",
    "component": "string",
    "inspiration": "string",
    "specFunc": boolean,
}
This component needs to shared.getNewEffect() into a local-scope entity and parse it to build the external attributes

I think the easiest way to do this will be to declare the bits in constructor and build them piece by piece

May need two render statements: one for currentEffect container, one for activeEffect

An effect has up to four potential text strings:
shortDesc: Every effect has a shortDesc. This appears in the currentEffect component.
fullDesc: Many effects have a fullDesc. This is mostly the same as the shortDesc, but has additional detail or explanation. This appears in the currentEffect component when the "moreDetails" button is clicked.
activeDesc: Some effects have an activeDesc. This appears in the ongoingEffect component.
cleanupDesc: Some effects with an activeDesc also have a cleanupDesc. This contains information for when the effect expires. This appears in the expiringEffect dialog.
These strings may contain inline components, like "rollButton", that a user can interact with to generate a value. The same rollButton may appear in more than one of the strings. Interacting with a rollButton should update all the other instances of that rollButton simultaneously.
For example:
let effect = {
"shortDesc": "Roll <r-b>1d6</r-b>.",
"fullDesc": "",
"activeDesc": "",
"cleanupDesc": ""
}
This should only render a single rollButton, with 1d6 as the contents.

An example of multiple rollButtons:
let effect = {
"shortDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>.",
"fullDesc": "",
"activeDesc": "",
"cleanupDesc": ""
}
This should render two separate rollButtons, with 1d6 and 2d4 as the contents. Interacting with 1d6 should trigger that update, but should not update 2d4.

An example of the same rollButton across multiple strings:
let effect = {
"shortDesc": "Roll <r-b>1d6</r-b>.",
"fullDesc": "Roll <r-b>1d6</r-b>.",
"activeDesc": "",
"cleanupDesc": ""
}
The rollButton should be rendered in both strings. Whether it is interacted with in the shortDesc or fullDesc context, the update should apply to both instances.

A more complicated example is multiple rollButtons across multiple strings:
let effect = {
"shortDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>..",
"fullDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>..",
"activeDesc": "Ongoing <r-b>1d6</r-b> and <r-b>2d4</r-b>.",
"cleanupDesc": ""
}
Both rollButtons should render in each string. Interacting with 1d6 in any string context will update the 1d6 rollButton in the other strings, but should not interact with the 2d4 rollButton.

Even more complex is rollButtons that may not be in the same order:
let effect = {
"shortDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>..",
"fullDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>..",
"activeDesc": "Ongoing <r-b>2d4</r-b> and <r-b>1d6</r-b>.",
"cleanupDesc": ""
}
A method of tagging or otherwise linking rollButtons in the string so the correct instance can be used is needed.

Finally, some rollButtons may not have multiple instances:
let effect = {
"shortDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>..",
"fullDesc": "Roll <r-b>1d6</r-b> and <r-b>2d4</r-b>..",
"activeDesc": "Ongoing <r-b>2d4</r-b> and <r-b>1d6</r-b>.",
"cleanupDesc": "Unrelatedly, roll <r-b>1d20</r-b>."
}




*/
class EffectComponent extends HTMLElement {
    constructor() {
        super();
        this._isRendered = false; // flag for only rendering once
        // create a template
        this.effectTemplate = document.createElement('template');
        // set the initial payload
        this.effectTemplate.innerHTML = `
            <div class="effectContainer">
                <div class="effectTitle">
                    <div class="effectName"></div>
                    <div class="displayNum"></div>
                </div>
                <div class="descDetails">
                    <div class="descBlock"> <!-- this gets replaced by special effects -->
                        <div class="shortDesc"></div>
                        <div class="fullDesc hiddenPart"></div>
                        <div class="activeDesc hiddenPart"></div> <!-- Added for testing, REMOVE ME LATER! -->
                    </div>
                    <div class="effectComponents hiddenPart"></div>
                    <div class="inspiration hiddenPart"></div>
                    <button type="button" class="descSwitch descButtonClosed"></button>
                </div>
            </div>
            `;
        // let's see if we can get the text to resize to fit the descBlock
        this.descBlock = this.getElementsByClassName('descBlock')[0]; // define the descBlock
        window.addEventListener('resize', () => this.fitText()); // set up a handler for window resize
    }

    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }

    render() {
        /* Working up the handling logic for current v active
        const containerClass = this.parentElement.classList;
        if (containerClass.includes('current))
        
        
        
        */
        this.append(this.effectTemplate.content.cloneNode(true)); // Stick it in the DOM

        // sets the ID for the copy in the DOM
        this.getElementsByClassName('effectContainer')[0].setAttribute('id', `effect-${shared.randomUnique()}`);

        // get the generatedEffect
        let localEffect = shared.getNewEffect();

        // special effects just replace the descBlock, so the shell can all be handled the same
        this.getElementsByClassName('effectName')[0].innerHTML = localEffect.effectName;
        this.getElementsByClassName('displayNum')[0].innerHTML = localEffect.displayNum;
        // LOGIC for descBlock based on localEffect.specFunc
        if (localEffect.specFunc) { // if there's a special function...
            // call the special effect handler by putting the special effect tag into descBlock (it'll be updated with the short and full desc divs)
            this.getElementsByClassName('descBlock')[0].innerHTML = this.specialEffect(localEffect.indexNum);
        } else { // if not...
            // put the short and full desc of the effect into the template contents
            this.getElementsByClassName('shortDesc')[0].innerHTML = localEffect.shortDesc;
            if (localEffect.fullDesc) { // if there's a fullDesc...
                this.getElementsByClassName('fullDesc')[0].innerHTML = localEffect.fullDesc; // display it
            } else { // if not...
                this.getElementsByClassName('fullDesc')[0].remove();
            }
            if (localEffect.activeDesc) { // if there's an activeDesc...  THIS IS TO BE REWORKED!
                this.getElementsByClassName('activeDesc')[0].innerHTML = localEffect.activeDesc; // display it
            } else { // if not...
                this.getElementsByClassName('activeDesc')[0].remove();
            }
        }
        if (localEffect.component) { // if there's a component...
            this.getElementsByClassName('effectComponents')[0].innerHTML = localEffect.component;
        } else { // if not...
            this.getElementsByClassName('effectComponents')[0].remove();
        }
        if (localEffect.inspiration) { // if there's an inspiration...
            this.getElementsByClassName('inspiration')[0].innerHTML = `Inspired by: ${localEffect.inspiration}`;
        } else { // if not...
            this.getElementsByClassName('inspiration')[0].remove();
        }
        if (!localEffect.fullDesc && !localEffect.component && !localEffect.inspiration) { // if there's no fullDesc, component, and inspiration, remove the details button
            this.getElementsByClassName('descSwitch')[0].remove();
        } else { // if there is any of those things, set up the details eventhandler
            this.getElementsByClassName('descSwitch')[0].addEventListener('click', this.toggleDescContent.bind(this)); // desc expand/shrink button
            // set the "details" button height and width for fancy CSS
            document.documentElement.style.setProperty('--details-button-width', `${this.getElementsByClassName('descSwitch')[0].offsetWidth}px`);
            document.documentElement.style.setProperty('--details-button-height', `${this.getElementsByClassName('descSwitch')[0].offsetHeight}px`);
        }

        // add IDs to rolltags and flipcoins
        this.linkRollButtons(localEffect);
        this.linkFlipCoins(localEffect);
        // I HAD FORGOTTEN TO ACTUALLY ID TAG THE ROLLBUTTONS (gosh, I wonder why they don't work right?)

        // I'm going to write the activeEffect payload as a template and then pass it into a new activeEffect


        // THIS IS THE PART I'M WORKING ON
        //
        //
        // test the duration and add an Active Effect if it is anything other than "instant"

        // Jo Raises Their Hand... "I HAS QUESTION!"
        // Will this handle the output of a specialEffectComponent smoothly?
        // because we're putting the effect content into the DOM during connectedCallback...
        // I think that means any included rollButtons will get flagged correctly
        // WE'LL SURE FIND OUT

        // THIS NEEDS TO BE REWORKED
        // rollbutton needs an event to fire on click that includes the triggering button ID and the update string
        /*         let rollTags = this.getElementsByTagName('z-rb'); // find all the rollTags
                for (let rollTag of rollTags) { // loop through them and add an event handler on update
                    rollTag.addEventListener('update', this.updateLinkedRollTags.bind(this, rollTag.getAttribute('id'), rollTag.innerHTML)); // when one is updated, find its pair and match the contents
                } */
        // I think I need to move this to a custom event, because I'll need it to update in "Active Effects" too, which isn't just a reparent, it's a separate instance of the same effect
        // the version of the effect that shows up there should just be the part that persists (can I break it down by persistence timeframe?)
        if (localEffect.activeDesc) { // if the effect needs to go in Active effect, set it up and make a new activeEffect

        }

        // once rendered, check the text sizing
        this.fitText();

    }

    toggleDescContent() {
        this.getElementsByClassName('descSwitch')[0].classList.toggle('descButtonClosed');
        this.getElementsByClassName('descSwitch')[0].classList.toggle('descButtonOpen');
        if (this.getElementsByClassName('fullDesc')[0]) { // if there's a fullDesc, toggle s/f
            this.getElementsByClassName('shortDesc')[0].classList.toggle('hiddenPart');
            this.getElementsByClassName('fullDesc')[0].classList.toggle('hiddenPart');
        }
        // resize the text
        this.fitText();
        if (this.getElementsByClassName('effectComponents')[0]) { // if there's an effectComponents, toggle it
            this.getElementsByClassName('effectComponents')[0].classList.toggle('hiddenPart');
        }
        if (this.getElementsByClassName('inspiration')[0]) { // if there's an inspiration, toggle it
            this.getElementsByClassName('inspiration')[0].classList.toggle('hiddenPart');
        }
    }

    linkRollButtons(localEffect) {
        let sRollTags = this.getElementsByClassName('shortDesc')[0].getElementsByTagName('z-rb'); // collects z-rb tags in shortDesc
        let fRollTags = [];
        let aRollTags = [];
        if (localEffect.fullDesc) { // if there's a fullDesc...
            fRollTags = this.getElementsByClassName('fullDesc')[0].getElementsByTagName('z-rb'); // collects z-rb tags in fullDesc
        }
        if (localEffect.activeDesc) { // if there's an activeDesc...
            aRollTags = this.getElementsByClassName('activeDesc')[0].getElementsByTagName('z-rb'); // collects z-rb tags in activeDesc
        }
        // assumptions:
        // 1 - there are the same number of rollTags in shortDesc as there are in fullDesc/activeDesc
        // 2 - the rollTags are in the same order in each
        for (let i = 0; i < sRollTags.length; i++) { // loop through the contents of sRollTags
            let sharedId = shared.randomUnique(); // for each entry pair, generate a uniqueId
            sRollTags[i].setAttribute('id', `sroll-${sharedId}`); // add sroll-[SharedId] to the tag in shortDesc
            if (localEffect.fullDesc) { // if there's a fullDesc...
                fRollTags[i].setAttribute('id', `froll-${sharedId}`); // add froll-[SharedId] to the corresponding tag in fullDesc
            }
            if (localEffect.activeDesc) { // if there's an activeDesc...
                aRollTags[i].setAttribute('id', `aroll-${sharedId}`); // add aroll-[SharedId] to the corresponding tag in activeDesc
            }
        }
    }

    linkFlipCoins(localEffect) {
        let sFlipCoins = this.getElementsByClassName('shortDesc')[0].getElementsByTagName('z-fc'); // collects z-fc tags in shortDesc
        let fFlipCoins = [];
        let aFlipCoins = [];
        if (localEffect.fullDesc) { // if there's a fullDesc...
            fFlipCoins = this.getElementsByClassName('fullDesc')[0].getElementsByTagName('z-fc'); // collects z-fc tags in fullDesc
        }
        if (localEffect.activeDesc) { // if there's an activeDesc...
            aFlipCoins = this.getElementsByClassName('activeDesc')[0].getElementsByTagName('z-fc'); // collects z-fc tags in activeDesc
        }
        // assumptions:
        // 1 - there are the same number of flipCoins in shortDesc as there are in fullDesc/activeDesc
        // 2 - the flipCoins are in the same order in each
        for (let i = 0; i < sFlipCoins.length; i++) { // loop through the contents of sFlipCoins
            let sharedId = shared.randomUnique(); // for each entry pair, generate a uniqueId
            sFlipCoins[i].setAttribute('id', `sflip-${sharedId}`); // add sflip-[SharedId] to the tag in shortDesc
            if (localEffect.fullDesc) { // if there's a fullDesc...
                fFlipCoins[i].setAttribute('id', `fflip-${sharedId}`); // add fflip-[SharedId] to the corresponding tag in fullDesc
            }
            if (localEffect.activeDesc) { // if there's an activeDesc...
                aFlipCoins[i].setAttribute('id', `aflip-${sharedId}`); // add aflip-[SharedId] to the corresponding tag in activeDesc
            }
        }
    }

    // this is all obsoleted by the component-level event handler
    /*     updateLinkedRollTags(triggerTagId, updatedContent) {
            // snag the triggering element ID - remember, getAttribute() returns lowercase
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

            // Potential complication: Will this update trigger the EventListener again? If so, should I add a "rollFixed" class to check for and prevent an update loop?
        } */
    specialEffect(index) {
        const methodName = `effect${index}`; // build the methodName
        if (typeof special[methodName] === 'function') { // if the methodName is actually a function...
            return special[methodName](); // run it
        } else { // otherwise...
            return 'Custom function not defined'; // let me know it didn't work
        }
    }
    fitText() {
        let fontSize = 48; // start big
        this.descBlock.style.setProperty('--effect-text-size',`${fontSize}px`); // set the style
        // check the scroll size and reduce the font size until it fits (meaning the scroll height
        // and width are less than or equal to the container height and width)
        while (this.descBlock.scrollWidth > this.descBlock.clientWidth || this.descBlock.scrollHeight > this.descBlock.clientHeight) {
            fontSize -= 1; // reduce the font size
            this.descBlock.style.setProperty('--effect-text-size',`${fontSize}px`); // set it
        }
    }
}

/* export { EffectComponent }; */
export const registerEffectComponent = () => {
    customElements.define('z-eff', EffectComponent);
}