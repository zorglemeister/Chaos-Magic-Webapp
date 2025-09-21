
const coinTemplate = document.createElement('template');
coinTemplate.innerHTML = `
    <div class="coinContainer">
    <div class="coin hiddenPart">Call It!</div>
    </div>
    <button class="flipButton">Flip</button>
    `;

class FlipCoin extends HTMLElement {


    constructor() {
        super(); // apparently this is important?
        this._isRendered = false; // flag for only rendering once

        // binding the flipCoin update handler to this instance
        this.handleFlipEvent = this.handleFlipEvent.bind(this);
        // and set up the event listener
        document.addEventListener('flipCoinFlipped', this.handleFlipEvent);
        // binding the clearCoin update handler to this instance
        this.handleClearEvent = this.handleClearEvent.bind(this);
        // and set up the event listener
        document.addEventListener('flipCoinCleared', this.handleClearEvent);
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        this.append(coinTemplate.content.cloneNode(true));
        this.getElementsByClassName("flipButton")[0].addEventListener('click', this.flipIt.bind(this));
    }

    flipIt() {
        // first, we're going to remove the event handler from the paired flipCoin element
        const flipEventMessage = new CustomEvent('flipCoinFlipped', { // set up an event... 
            detail: {
                buttonId: this.getAttribute('id'), // containing this Id
             }
        });
        document.dispatchEvent(flipEventMessage); // and send it into the universe.
        
        // then we're going to have some animation fun...
        const coinContainer = this.getElementsByClassName("coinContainer")[0]; // get the container div
        const coin = this.getElementsByClassName("coin")[0]; // get the coin div
        const button = this.getElementsByClassName("flipButton")[0]; // get the button
        let countdown = 3; // set a 3 second timer
        button.disabled = true; // disable the button during the flip
        // First stage:
        // show the coin (displays "Call It!")
        coin.classList.remove('hiddenPart');
        // for 1.5 seconds

        coin.style.animation = 'flipShape 2s linear infinite, flipColor 2s steps(1, end) infinite'; // start the animation 
        coinContainer.style.animation = 'coinVert 4s ease-in-out 1'; // hopefully vertical animation
        const interval = setInterval(() => { // starts the timer
            if (countdown > 0) { // as long as there's time left...
                coin.textContent = countdown.toString(); // set the text to the countdown number
                countdown--; // decrement the countdown
            } else {
                clearInterval(interval); // stop the timer
                coin.textContent = Math.random() < 0.5 ? 'Ⓗ' : 'Ⓣ'; // generate a random number, compare to .5, if less Heads, if more Tails
                coin.style.backgroundColor = 'darkgoldenrod';
                setTimeout(() => {
                coin.style.animation = 'none'; // stop the animation
                // change the button to "Clear" and enable it
                button.textContent = 'Clear';
                button.disabled = false;
                // Add an event listener to remove the component and update the component text contents
                button.addEventListener('click', () => {
                    coinContainer.remove();
                    button.remove();
                    let coinResult = `<b>${coin.textContent === 'Ⓗ' ? 'Ⓗ Heads' : 'Ⓣ Tails'}</b>`;
                    this.innerHTML = coinResult;
                    const flipClearMessage = new CustomEvent('flipCoinCleared', { // set up an event... 
                        detail: {
                            buttonId: this.getAttribute('id'), // containing this Id...
                            flipResult: coinResult // and the result...
                        }
                    });
                    document.dispatchEvent(flipClearMessage); // and send it into the universe.
                }, { once: true }); // can only be triggered once
                }, 500)
            }
        }, 1000); // this sets the 1000ms interval
    }
    handleFlipEvent(payload) { // handle the "SOMEONE CLICKED A ROLL!" event
        const targetId = payload.detail.buttonId; // pull the details out of it...

        if (this.getAttribute('id').slice(1) === targetId.slice(1)) { // and if the sliced id matches this one...
            const button = this.getElementsByClassName("flipButton")[0]; // get the button
            button.disabled = true; // disable the button during the flip
            this.destroyFlipListener(); // and torch the event listener (keep things tidy in memory)
        }
    }
    handleClearEvent(payload) { // handle the "SOMEONE CLICKED A ROLL!" event
        const targetId = payload.detail.buttonId; // pull the details out of it...
        const content = payload.detail.flipResult;

        if (this.getAttribute('id').slice(1) === targetId.slice(1)) { // and if the sliced id matches this one...
            this.innerHTML = content; // update the contents
            this.destroyClearListener(); // and torch the event listener (keep things tidy in memory)
        }
    }
    destroyFlipListener() {
        document.removeEventListener('flipCoinFlipped', this.handleFlipEvent);
    }
    destroyClearListener() {
        document.removeEventListener('flipCoinCleared', this.handleClearEvent);
    }
}

export const registerFlipCoinComponent = () => {
    customElements.define('z-fc', FlipCoin);
}