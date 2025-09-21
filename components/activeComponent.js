

export class ActiveEffect extends HTMLElement {
    constructor(htmlContent, duration) {
        super();
        // create a template
        this.template = document.createElement('template');
        // set the html payload
        if (htmlContent) {
        this.setHTMLContent(htmlContent);
        }
        // set the duration
        if (duration) {
            this.duration = duration;
        }
        // binding the turn update handler to this instance
        this.handleTurnEvent = this.handleTurnEvent.bind(this);
        // and set up the event listener (why do i keep spelling it "listender"?!)
        document.addEventListener('nextTurn', this.handleTurnEvent);
    }
    setHTMLContent(htmlContent) {
        this.template.innerHTML = htmlContent.trim();
    }
    handleTurnEvent() {
        if (this.duration !== 'Ongoing') { // if the effect is ongoing, do nothing (skips all the below logic)
            if (this.duration > 0) { // if the duration is greater than 0...
                this.duration = this.duration - 1; // reduce the duration by one
                if (this.duration === 0) { // if the duration is 0, clean up the effect
                    if (this.getElementsByClassName('onEnd')[0]) { // if there's an "onEnd" div, pop that modal (ooh, going to need a modal)
                        let effectEndModal = document.createElement('template');
                        effectEndModal.innerHTML = `
                        <div class="effectEndModal">
                        <div class="effectEndContent">${this.getElementsByClassName('onEnd')[0].innerHTML}</div>
                        <button class="effectEndButton" type="button">Done</button>
                        </div>
                        `
                        this.append(effectEndModal.content); // Stick it in the DOM
                        // add "done" click handler
                        this.getElementsByClassName('effectEndButton')[0].addEventListener('click', this.clearEffect(true));
                    } else {
                        this.clearEffect();
                    }
                }
            }
        }
    }
    clearEffect(hasButton) {
        if (hasButton) { // if there's a button, clear the event handler
            this.destroyListener();
        }
        // remove this from the DOM (maybe? not sure how this works...)
        this.remove();

    }
    destroyListener() {
        document.removeEventListener('nextTurn', this.handleTurnEvent);
    }
}