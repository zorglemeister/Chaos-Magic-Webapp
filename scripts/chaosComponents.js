// THIS FILE HOLDS COMPONENTS

// Custom Toggle?

class ChaosToggle extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

    }
}




// Would love an inline button that displays a die notation (like "2d6") and when you tap/click it, the button disappears and the roll amount is in its place, button has explainer text "Roll XdX", maybe with a die emoji

class RollButton extends HTMLElement {
    constructor() {
        super(); // apparently this is important?
    }
    connectedCallback() {
        this.render(); // When it shows up, render it!
    }
    render() {
        const sourceText = this.textContent; // Get the text (should be die notation) : <z-rb>2d6</z-rb>
        this.innerHTML = '<button>&#127922; ${sourceText}</button>'; // Replace the innerHTML with a button displaying the text and (hopefully) the Game Die unicode character "&#127922;" : [🎲 2d6]

        this.querySelector('button').addEventListener('click', () => { // what to do on a click?
            const result = this.handleClick(sourceText); // get a result by passing the text to the click handler...
            this.innerHTML = result; // then replace the contents with the result!
        });
    }

    handleClick(diceNotation) { // dice should be in die notation so... (how to handle bigger values, like 11d312? split?)
        const dieArray = diceNotation.split('d'); // split the string at 'd'
        let dieCount = parseInt(dieArray[0], 10); // use the first number as "count"
        let dieSides = parseInt(dieArray[1], 10); // use the second number as "sides"
        return dieRoll(dieCount, dieSides).toString(); // hand it to the die roller and return the result as a string
    }
}

// INLINE SYMBOLS!
// Red = r = r.png
// Black = b = b.png
// Green = g = g.png
// Blue = u = u.png
// White = w = w.png
// Tap = t = t.png
// X = x = x.png
// Infinite = i = i.png
// Colourless = c = c.png
// 0 = 0 = 0.png
// 1 = 1 = 1.png
// 2 = 2 = 2.png
// 3 = 3 = 3.png
// Energy = e = e.png

class InlineSymbol extends HTMLElement {
     constructor() {
        super(); // 
    }
    connectedCallback() {
        this.render(); // When it shows up, render it!
    }
    render() {
        const sourceText = this.textContent; // Get the text (should be symbol notation) : <z-is>UU</z-is>
        const baseURL = "images/"; // tell it where to find the files
        const lowercaseInput = input.toLowerCase(); // lowercase for consistency (they're typed in uppercase in every effect description)
        let html = ""; // initialize empty html
        for (let character of lowercaseInput) { // loop through characters
            html += '<img class="inlineSymbol" src="' + baseURL + character + '.png" alt="' + character + '"/>'; // append the image ref
        }
        this.innerHTML = html; // replace the element contents with the img(s)
    }
}
   


// define the new elements

customElements.define('z-rb', RollButton);
customElements.define('z-is', InlineSymbol);
