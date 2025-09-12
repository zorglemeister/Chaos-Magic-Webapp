import * as shared from '../scripts/sharedAssets.js'; // import shared stuff (dice roller, in this case!)

class RollButton extends HTMLElement {
    constructor() {
        super(); // apparently this is important?
        this._isRendered = false; // flag for only rendering once

        // binding the button update handler to this instance
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
        // and set up the event listener (why do i keep spelling it "listender"?!)
        document.addEventListener('rollButtonClicked', this.handleUpdateEvent);
        // we do this up here to avoid creating multiple event listeners
        // best practice for memory management, not necessarily vital for this project, but good to know
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        const sourceText = this.textContent.trim(); // Get the text
        this.innerHTML = `<button>&#127922; ${sourceText}</button>`; // Replace the innerHTML with a button displaying the text and (hopefully) the Game Die Unicode character "&#127922;" : [🎲 2d6]

        this.querySelector('button').addEventListener('click', () => { // what to do on a click?
            const result = this.handleClick(sourceText); // get a result by passing the text to the click handler...
            // this.innerHTML = `&#127922; <b>${result}</b>`; // then replace the contents with the result!
            const clickEventMessage = new CustomEvent('rollButtonClicked', { // set up an event... 
                detail: {
                    buttonId: this.getAttribute('id'), // containing the rollButton Id...
                    rollResult: result // and the result...
                }
            });
            document.dispatchEvent(clickEventMessage); // and send it into the universe.
        });
/*         this.addEventListener('rollButtonClicked', function(context) { // listen to the universe for this event...  
            const targetId = context.detail.buttonId; // pull the details out of it...
            const content = context.detail.rollResult;

            if (this.getAttribute('id').slice(1) === targetId.slice(1)) { // and if the sliced id matches this one...
                this.innerHTML = `&#127922; <b>${content}</b>`; // update the text with the result
            }
        });  */
    }
    handleUpdateEvent(payload) { // handle the "SOMEONE CLICKED A ROLL!" event
        const targetId = payload.detail.buttonId; // pull the details out of it...
        const content = payload.detail.rollResult;

        if (this.getAttribute('id').slice(1) === targetId.slice(1)) { // and if the sliced id matches this one...
            this.innerHTML = `&#127922; <b>${content}</b>`; // update the text with the result...
            this.destroyListener(); // and torch the event listener (keep things tidy in memory)
        }
    }
    destroyListener() {
        document.removeEventListener('rollButtonClicked', this.handleUpdateEvent);
    }
// This needs to be expanded to handle dice, dice with +/- #, dice +/- dice, direction, colour, land
// REGEX, MFs! (oh gods, i'm rusty)
    handleClick(input) {
        if (/^\d+d\d+$/.test(input)) { // ^ is the start of the string, \d+ is numbers, d is d, \d+ is more numbers, $ is the end of the string, this matches #d#
            return this.handleSingleDice(input);
        } else if (/^\d+d\d+[+-]\d+$/.test(input)) { // [] is a character set, +- are the potential matches, so this matches #d#±#
            return this.handleDiceWithNumber(input);
        } else if (/^\d+d\d+[+-]\d+d\d+$/.test(input)) { // extending from above, this matches #d#±#d#
            return this.handleDiceWithDice(input);
        } else { // if it isn't a dice notation, it's probably a word...
            return this.handleWord(input);
        }
    }
    handleSingleDice(diceNotation) { // going to keep this one basic (thanks past Jo!), but use regex for the rest
        const dieArray = diceNotation.split('d'); // split the string at 'd'
        let dieCount = parseInt(dieArray[0], 10); // use the first number as "count"
        let dieSides = parseInt(dieArray[1], 10); // use the second number as "sides"
        // hand it to the die roller and return the result as a string
        return shared.dieRoll(dieCount, dieSides).toString();
    }
    handleDiceWithNumber(diceNotation) {
        // okay, process...
        // three pieces: the die count and the die sides (handled by roller) and the modifier (added after roll)
        // I can use ( and ) in the regex to identify parts of the input string
        // match should give me an array of the identified parts, so I can feed the roller and do the math
        const parsedDice = diceNotation.match(/(\d+)d(\d+)([+-]\d+)/);
        // first part: (\d+) is the count
        // d isn't a part
        // second part: (\d+) is the sides
        // third part: ([+-]\d+) is the modifier
        if (parsedDice) { // this'll resolve false if the structure didn't match, mostly a failsafe if i effed up the handleClick parsing...
            // the [0] entry is the whole string, so we'll start at [1] (the first of the parts identified in the expression)
            let dieCount = parseInt(parsedDice[1], 10); // sets count to the first part, resolved as a base10 integer
            let dieSides = parseInt(parsedDice[2], 10); // sets sides to the second part
            let rollModifier = parseInt(parsedDice[3], 10); // sets modifier to the third part (should handle positive/negative so I can just add it later)
            let rollValue = shared.dieRoll(dieCount, dieSides) + rollModifier; // Ohai, die roller + modifier
            return rollValue.toString();// send it back as a string
        }
        return 'D+N Failed'; // if the structure didn't match, let me know! (whaaaaaat?! error handling?!)
    }
    handleDiceWithDice(diceNotation) {
        // I think I can reuse the single dice handler for each die and then do logic on the operator to add or subtract them... (do I want to bother rewriting D+N to do it this way? naaaah...)
        const parsedDice = diceNotation.match(/(\d+d\d+)([+-])(\d+d\d+)/);
        // first part: (\d+d\d+) is the first die (conveniently in handleSingleDice-friendly notation)
        // second part is the operator
        // third part: (\d+d\d+) is the second die
        if (parsedDice) {
            let firstDice = this.handleSingleDice(parsedDice[1]); // code reuse! first dice to handler
            let secondDice = this.handleSingleDice(parsedDice[3]); // second dice to handler
            // now for the operator logic
            let rollValue = parsedDice[2] === '+' ? // if the operator is '+'...
            parseInt(firstDice, 10) + parseInt(secondDice, 10) : // add the two values (as base10 integers)...
            parseInt(firstDice, 10) - parseInt(secondDice, 10); // otherwise subtract them!
            return rollValue.toString(); // hand it back as a string
        }
        return 'D+D Failed'; // if the structure didn't match, BOOP!
    }
    handleWord(word) {
        // I'll get to the words later, but i think it'll be a switch+cases and handoff to other methods...
        // woof, just realized this could get nearly effect specific
        // but it would be easier to do it here than in a weird specialEffect handler (I'd like to limit those...)
        // EACH OF THESE CAN BE AN ARRAY! (like the vengeance randomizer)
        // GOOD IDEA YESTERDAY JO, I can build a component just to handle those weird specialEffects
        // it'll work like this, passing the effect title (or id?) so I can have one thing where that lives
        // and I don't have to worry about reading a parameter in the JSON
        let rollValue = 'preroll';
        let option = null;
        switch (word) {
            case 'direction':
                // left or right
                rollValue = this.dieRoll(1,2) === 1 ? 'right' : 'left'; // 1 (right) or 2 (left)
                break;
            case 'color':
                // WUBRG
                option = ['white','blue','black','red','green'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'mana type':
                // WUBRG+colorless (chaos Sleight 321, Terrestrial Upheaval 494) OOH! have this return a <z-is> tag!
                option = ['<z-is>w</z-is>','<z-is>u</z-is>','<z-is>b</z-is>','<z-is>r</z-is>','<z-is>g</z-is>','<z-is>c</z-is>'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'color or colorless':
                // WUBRG+colorless (Bouncy House 187)
                option = ['white','blue','black','red','green','colorless'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'basic land':
                // plains, island, swamp, mountain, forest
                option = ['plains','island','swamp','mountain','forest'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'basic and wastes':
                // plains, island, swamp, mountain, forest, wastes
                option = ['plains','island','swamp','mountain','forest','wastes'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'land type':
                // plains, island, swamp, mountain, forest, nonbasic (Chaos Hack 322)
                option = ['plains','island','swamp','mountain','forest','nonbasic land'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'any basic land':
                // a plains, an island, a swamp, a mountain, a forest, any basic land (Flare 635)
                option = ['a plains','an island','a swamp','a mountain','a forest','any basic land'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'landwalk':
                // plainswalk, islandwalk, swampwalk, mountainwalk, forestwalk, nonbasic landwalk (Dicewalk 636)
                option = ['plainswalk','islandwalk','swampwalk','mountainwalk','forestwalk','nonbasic landwalk'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'permanent':
                // creatures, artifacts, lands, enchantments, planeswalkers (Tariff Sheriff 910)
                option = ['creatures','artifacts','lands','enchantments','planeswalkers'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
                break;
            case 'walk':
                // big list... (Boots, Made for Walking 928)
                option = ['plainswalk','islandwalk','swampwalk','mountainwalk','forestwalk','wasteswalk','nonbasic landwalk','denimwalk','snackwalk','facewalk','no cards in handwalk','snow landwalk','legendary landwalk','artifact landwalk','sagawalk','desertwalk','commanderwalk','eldraziwalk','proxywalk','energywalk','+1/+1 walk','full art landwalk','tokenwalk','shinywalk','untapped landwalk'];
                rollValue = option[shared.dieRoll(1,option.length) - 1];
        } 
        return rollValue.toString();
    }






    dieRoll(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++){
        let roll = Math.ceil(Math.random() * sides);
        total = total + roll;
        }
    return total;
    }
}

export const registerRollButtonComponent = () => {
    customElements.define('z-rb', RollButton);
}