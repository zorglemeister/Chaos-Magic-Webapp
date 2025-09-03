
const coinTemplate = document.createElement('template');
coinTemplate.innerHTML = `
    <div class="coinContainer">
    <div class="coin hiddenPart">Call It!</div>
    </div>
    <button class="flipButton">Flip</button>
    `

class FlipCoin extends HTMLElement {


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
        this.append(coinTemplate.content.cloneNode(true));
        this.getElementsByClassName("flipButton")[0].addEventListener('click', this.flipIt.bind(this));
    }

    flipIt() {
        const coinContainer = this.getElementsByClassName("coinContainer")[0]; // get the container div
        const coin = this.getElementsByClassName("coin")[0]; // get the coin div
        const button = this.getElementsByClassName("flipButton")[0]; // get the button
        let countdown = 3; // set a 3 second timer
        button.disabled = true; // disable the button during the flip
        coin.classList.remove('hiddenPart'); // show the coin
        coin.style.animation = 'flipShape 2s linear infinite, flipColor 2s steps(1, end) infinite'; // start the animation 
        coinContainer.style.animation = 'coinVert 4s ease-in-out 1'; // hopefully vertical animation
        const interval = setInterval(() => { // starts the timer
            if (countdown > 0) { // as long as there's time left...
                coin.textContent = countdown; // set the text to the countdown number
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
                    this.innerHTML = `<b>${coin.textContent === 'Ⓗ' ? 'Ⓗ Heads' : 'Ⓣ Tails'}</b>`
                }, { once: true }); // can only be triggered once
                }, 500)
            }
        }, 1000); // this sets the 1000ms interval
    }
}

export const registerFlipCoinComponent = () => {
    customElements.define('z-fc', FlipCoin);
}