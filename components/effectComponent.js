
// import child components
import { registerRollButtonComponent } from './rollButtonComponent.js';
import { registerInlineSymbolComponent } from './inlineSymbolComponent.js';

// import specialEffects.js <- holds all the effect-specific scripts
// import * as special from '../scripts/specialEffects.js';
// define a template

// handling flow:
// receive effect data from randomizer
// check for and call any special effects
// put the effect data into the template

// generate a unique ID for the effectContainer div
// this will facilitate reparenting it between active and history

// Effect shortdesc should have a ... at the bottom that expands to the full description
// clicking that hides the short, displays the full, and changes to a ^^^

// so it'll be something like
`<div class="descBlock">
<div class="shortDesc"></div>
<div class="fullDesc hiddenPart"></div>
</div>
<button type="button" class="descSwitch">...</button>`
// this way, the specialEffect payload can be used for the whole "descBlock", and I don't have to write two functions (one for each return)