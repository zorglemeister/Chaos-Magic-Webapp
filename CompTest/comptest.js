// Help box is going to have two pieces:
// One is the icon that stays visible on the page. Clicking it expands and hides the helpcontent as well as switching its visual indication
// The other is the help content, which lives in a box.

class HelpBox extends HTMLElement {
     constructor() {
        super(); // important!
    }
    connectedCallback() {
        this.render(); // When it shows up, render it!
    }
    render() {
        const sourceText = this.innerHTML; // Get the help text : <z-hb>Explanation</z-hb> [changed to innerHTML to facilitate formatting!]
        console.log('Source Text=' + sourceText);
        // this.textContent = ''; // wipes the tag content to prep for the html [I don't think I need to do this]
        // this.icon = document.createElement('span');
        // this.innerHTML = ; // this makes the Icon span?
        // augh, eff it, I'm just writing the HTML
        // OOH! I can use the <details><summary> structure!
        this.innerHTML = `<details class="helpText"><summary class="helpIcon">📕</summary>${sourceText}</details>`;
        this.querySelector('summary').addEventListener('click', () => { // handler for clicking on the Summary
            this.querySelector('summary').textContent = this.toggleClick();
        });
    }

    toggleClick() {
       let icon;
       if (this.querySelector('summary').textContent === '📕') {
           icon = '📖';
       } else {
           icon = '📕';
       }
        return icon;
    }

}

customElements.define('z-hb', HelpBox);

// Component plan:
// inline symbols - DONE inlineSymbolComponent.js/.css
// inline die roll - DONE rollButtonComponent.js/.css
// help boxes - DONE helpBoxComponent.js/.css
// toggle switch
// "power on" effect (replacing selection/highlight)
// Effect (title, number, body[short+full], special)
// Current (be able to move the Effect from here to History)
// Game History
// - Indicators:
// Rarity?
// School?
// Duration?