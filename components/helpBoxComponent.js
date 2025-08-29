// Help box is going to have two pieces:
// One is the icon that stays visible on the page. Clicking it expands and hides the help content as well as switching its visual indication
// The other is the help content, which lives in a box.

const helpTemplate = document.createElement('template');
helpTemplate.innerHTML = `<div class="helpParent"><div class="helpIcon helpClosed"></div><div class="helpContent helpHidden"></div></div>`;


class HelpBox extends HTMLElement {
     constructor() {
        super(); // important!
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        const sourceText = this.innerHTML; // Get the help text : <z-hb>Explanation</z-hb>
        this.innerHTML = ''; // wipe the help text from the tag

        this.append(helpTemplate.content.cloneNode(true)); // add the HTML to the DOM

        this.getElementsByClassName('helpContent')[0].innerHTML = `${sourceText}`; // replace the help text in the template
        //FOR FUTURE REFERENCE: getElementsByClassName returns an HTMLCollection, and I need to reference the first [0] instance of that class!!!
        this.getElementsByClassName('helpIcon')[0].addEventListener('click', this.toggleClick.bind(this)); // toggle viz when helpIcon is clicked
    }

    toggleClick() {
        this.getElementsByClassName('helpIcon')[0].classList.toggle('helpClosed'); // toggle Closed class
        this.getElementsByClassName('helpIcon')[0].classList.toggle('helpOpen'); // toggle Open class
        this.getElementsByClassName('helpContent')[0].classList.toggle('helpHidden'); // toggle Help visibility
    }
}

export const registerHelpBoxComponent = () => {
    customElements.define('z-hb', HelpBox);
}