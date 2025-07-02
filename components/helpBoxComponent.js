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
        const sourceText = this.innerHTML; // Get the help text : <z-hb>Explanation</z-hb>
        this.innerHTML = `<div class="helpIconComp helpClosedComp"></div><div class="helpContentComp hiddenHelpComp">${sourceText}</div>`;
        this.getElementByClassName('helpIconComp').addEventListener('click', this.toggleClick());
    }

    toggleClick() {
       this.getElementsByClassName('helpIconComp').classList.toggle('helpClosedComp'); // toggle Closed class
            this.getElementsByClassName('helpIconComp').classList.toggle('helpOpenComp'); // toggle Open class
            this.getElementsByClassName('helpContentComp').classList.toggle('hiddenHelpComp'); // toggle Help visibility
    }
}

export const registerHelpBoxComponent = () => {
    customElements.define('z-hb', HelpBox);
}