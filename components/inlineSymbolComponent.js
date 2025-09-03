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
// Snow = s = s.png
// 0 = 0 = 0.png
// 1 = 1 = 1.png
// 2 = 2 = 2.png
// 3 = 3 = 3.png
// Energy = e = e.png

class InlineSymbol extends HTMLElement {
     constructor() {
        super(); // lookit me, i'm super! I'm important and needed!
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        const sourceText = this.textContent; // Get the text (should be symbol notation) : <z-is>UU</z-is>
        const baseURL = "./images/"; // tell it where to find the files (relative to the HTML!)
        const lowercaseInput = sourceText.toLowerCase(); // lowercase for consistency (they're typed in uppercase in every effect description)
        let html = ""; // initialize empty html
        for (let character of lowercaseInput) { // loop through characters
            html += `<img class="inlineSymbol" src="${baseURL}${character}.png" width="16px" alt="${character}"/>`; // append the image ref
        }
        this.innerHTML = html; // replace the element contents with the img(s)
    }
}

export const registerInlineSymbolComponent = () => {
    customElements.define('z-is', InlineSymbol);
}