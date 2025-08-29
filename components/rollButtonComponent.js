class RollButton extends HTMLElement {
    constructor() {
        super(); // apparently this is important?
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        this.render(); // When it shows up, render it!
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        const sourceText = this.textContent.trim(); // Get the text (should be die notation) : <z-rb>2d6</z-rb>
        this.innerHTML = `<button>&#127922; ${sourceText}</button>`; // Replace the innerHTML with a button displaying the text and (hopefully) the Game Die Unicode character "&#127922;" : [🎲 2d6]

        this.querySelector('button').addEventListener('click', () => { // what to do on a click?
            const result = this.handleClick(sourceText); // get a result by passing the text to the click handler...
            this.innerHTML = `&#127922; <b>${result}</b>`; // then replace the contents with the result!
        });
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
        return this.dieRoll(dieCount, dieSides).toString();
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
            let rollValue = this.dieRoll(dieCount, dieSides) + rollModifier; // Ohai, die roller + modifier
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
        // // but it would be easier to do it here than in a weird specialEffect handler (I'd like to limit those...)
        // EACH OF THESE CAN BE AN ARRAY! (like the vengeance randomizer)
        switch (word) {
            case 'direction':
                // left or right
                break;
            case 'color':
                // WUBRG
                break;
            case 'mana type':
                // WUBRG+generic (chaos Sleight 321, Terrestrial Upheaval 494) OOH! have this return a <z-is> tag!
                break;
            case 'color or colourless':
                // WUBRG+colorless
                break;
            case 'basicland':
                // plains, island, swamp, mountain, forest
                break;
            case 'basic+wastes':
                // plains, island, swamp, mountain, forest, wastes
                break;
            case 'land type':
                // plains, island, swamp, mountain, forest, nonbasic (Chaos Hack 322)
                break;
            case 'any basic land':
                // a plains, an island, a swamp, a mountain, a forest, any basic land (Flare 635)
                break;
            case 'landwalk':
                // plainswalk, islandwalk, swampwalk, mountainwalk, forestwalk, nonbasic landwalk (Dicewalk 636)
        } 
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