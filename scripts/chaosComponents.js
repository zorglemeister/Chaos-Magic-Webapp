
// Define toggle

class ChaosToggle extends HTMLElement {
    connectedCallback() {

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

// writing as a function first...
function generateInlineSymbols(input) {
    // where are the files?
    const baseURL = "images/";
    // lowercase for consistency
    const lowercaseInput = input.toLowerCase();
    // empty html
    let html = "";
    // loop through characters
    for (let character of lowercaseInput) {
        // append the image ref
        html += '<img class="inlineSymbol" src="' += baseURL += character += '.png" alt="' += character =+ '">';
    }
    return html
}


// Would love an inline button that displays a die notation (like "2d6") and when you tap/click it, the button disappears and the roll amount is in its place, button has explainer text "Roll XdX", maybe with a die emoji
