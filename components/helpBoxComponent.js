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
            const newIcon = this.toggleClick();
            this.querySelector('summary').textContent = newIcon;
        });
    }

    toggleClick() {
       let icon = "";
       if (this.querySelector('summary').textContent === '📕') {
            icon = '📖';
       } else {
           icon = '📕';
       }
        return icon;
    }
}

export const registerHelpBoxComponent = () => {
    customElements.define('z-hb', HelpBox);
}