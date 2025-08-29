// This'll handle any of the weird and complicated effects
// like the "roll more times" or the intricately-worded-yet-dynamic ones
// It'll be set up much like the "word" handling of the rollButton
// where I pass the name/id of the effect in the contents of the component tag
// and then parse that through a switch/case to the method for that effect
// returning the content for the effectComponent that it was included in

class SpecialEffect extends HTMLElement {
    constructor() {
        super(); // apparently this is important?
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        const sourceText = this.textContent.trim(); // Get the text
        this.innerHTML = handleEffect(sourceText); // make it happen!
    }
        handleEffect(index) {
        let returnBody = null;
        // let option = null; // if i need another block scope, i can set it up here
        // some of these will involve tripping the randomizer, how do i target that method from gameComponent?
        switch (word) {
            case '':
                // 

                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
                break;
            case '':
                // 
                
                returnBody = 'something';
        } 
        return returnBody; // should return as something that works in innerHTML
    }
}

export const registerSpecialEffectComponent = () => {
    customElements.define('special-effect', SpecialEffect);
}