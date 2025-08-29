// this drawer will sit on the right, with a floating button in the upper right
// it will contain effects that haven't expired yet
// as effects with a Round or Ongoing duration are generated, they'll need to be passed here, in addition to the History
// the "Turns remaining" should be visible
// it will need to receive an "on turn" update from Game and decrement the duration for each effect depending on the player count
// once an effect's duration expires, it is removed from the component
// I can reuse the drawer code from Settings, and just adjust the width (this'll be nearly the full screen)

const ongoingEffectsTemplate = document.createElement('template');
ongoingEffectsTemplate.innerHTML = `
    <div class="ongoingContainer configBlock drawerOEContainer">
        <button type="button" class="ongoingButton drawerOEControl drawerOEClosed"></button>
        <div class="ongoingEffectList drawerOEContents">
        Put drawer contents here
        </div>
    </div>
`;

// do some lets here to declare parts
let ongoingButton = null;
let ongoingEffectList = null;

class OngoingComponent extends HTMLElement {
    constructor() {
        super();
        this._isRendered = false; // flag for only rendering once
    }
    connectedCallback() {
        if (!this._isRendered) { // if it hasn't already been rendered...
            this.render(); // render it...
            this._isRendered = true; // and set the flag
        }
    }
    render() {
        this.append(ongoingEffectsTemplate.content.cloneNode(true)); // put it in the HTML
        // declaredPart = this.getElementsByClassName("className")[0];
        ongoingButton = this.getElementsByClassName("ongoingButton")[0];
        ongoingEffectList = this.getElementsByClassName("ongoingEffectList")[0];
        // set the drawer click event
        ongoingButton.addEventListener('click', this.drawerToggleAction.bind(this));
        // set the "Ongoing" button height and width for fancy CSS
        document.documentElement.style.setProperty('--ongoing-button-width', `${ongoingButton.offsetWidth}px`);
        document.documentElement.style.setProperty('--ongoing-button-height', `${ongoingButton.offsetHeight}px`);
        // set a new roll event listener
        window.addEventListener('newRoll', this.newRollHandler.bind(this));
    }
    drawerToggleAction() {
        ongoingEffectList.classList.toggle('openOEDrawer'); // trigger the drawer slide in/out
        ongoingButton.classList.toggle('drawerOEClosed'); // change the Settings button state
        ongoingButton.classList.toggle('drawerOEOpen'); // flippity-flip-flop
    }
    newRollHandler() {
        // get the previousEffect (this'll include any inline rolled values)
        // pass it to
        this.addOngoingEffect();
        // then decrement timers with
        this.updateTimers();
        // this will automagically allow Round effects to expire as the original player rolls a new effect
        // will also need to trigger this if the player count decreases
    }
    addOngoingEffect() {
        // this should take the incoming effect
        // set the initial "turns remaining" to the (oh! i think i need an "active player count")
        // and turn it into the display format
        // add it as a child of the ongoingEffectList
        // ** Need handling for effects that last forever
        // ** there should be an "end effect" button on some (part of their special handling?)
    }
    updateTimers() {
        // for each child of the ongoingEffectList with a "round" duration
        // decrement the "turns remaining"
        // then, if the turns remaining is 0
        // removeOngoing()
    }
    removeOngoing() {
        // removes the child div from the container
        // Would be fun to have a "kaboom" or "fade" animation...
        // pull the drawer out, visually vanish the expiring effect, close the drawer...
    }
}

export const registerOngoingComponent = () => {
    customElements.define('z-oe', OngoingComponent);
}

