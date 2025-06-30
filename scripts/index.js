// import components here
import { registerRollButtonComponent } from '../components/rollButtonComponent.js';
import { registerInlineSymbolComponent } from '../components/inlineSymbolComponent.js';

// add them to the app definition here
const app = () => {
    registerRollButtonComponent();
    registerInlineSymbolComponent();
}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);