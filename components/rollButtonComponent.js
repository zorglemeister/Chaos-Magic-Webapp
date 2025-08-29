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

    handleClick(diceNotation) { // dice should be in die notation so... (how to handle bigger values, like 11d312? split?)
        const dieArray = diceNotation.split('d'); // split the string at 'd'
        let dieCount = parseInt(dieArray[0], 10); // use the first number as "count"
        let dieSides = parseInt(dieArray[1], 10); // use the second number as "sides"
        // hand it to the die roller and return the result as a string
        return this.dieRoll(dieCount, dieSides).toString();
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