// Help box is going to have two pieces:
// One is the icon that stays visible on the page. Clicking it expands and hides the helpcontent as well as switching its visual indication
// The other is the help content, which lives in a box.

const helpTemplate = document.createElement('template');
helpTemplate.innerHTML = `<div class="visibleBorder helpIconComp helpClosedComp"></div><div class="visibleBorder helpContentComp hiddenHelpComp"></div>`;

class HelpBox extends HTMLElement {
     constructor() {
        super(); // important!

    }
    connectedCallback() {
        this.render(); // When it shows up, render it!
    }
    render() {
        const sourceText = this.innerHTML; // Get the help text : <z-hb>Explanation</z-hb>
        this.innerHTML = '';

        this.append(helpTemplate.content.cloneNode(true))
        this.getElementsByClassName('helpContentComp')[0].innerHTML = `${sourceText}`;
        //FOR FUTURE REFERENCE: getElementsByClassName returns an HTMLCollection, and I need to reference the first [0] instance of that class!!!
        this.getElementsByClassName('helpIconComp')[0].addEventListener('click', this.toggleClick.bind(this));
    }

    toggleClick() {
       this.getElementsByClassName('helpIconComp')[0].classList.toggle('helpClosedComp'); // toggle Closed class
            this.getElementsByClassName('helpIconComp')[0].classList.toggle('helpOpenComp'); // toggle Open class
            this.getElementsByClassName('helpContentComp')[0].classList.toggle('hiddenHelpComp'); // toggle Help visibility
    }
}

export const registerHelpBoxComponent = () => {
    customElements.define('z-hb', HelpBox);
}