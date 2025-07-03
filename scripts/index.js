// import components here
import { registerRollButtonComponent } from '../components/rollButtonComponent.js';
import { registerInlineSymbolComponent } from '../components/inlineSymbolComponent.js';
import { registerHelpBoxComponent } from '../components/helpBoxComponent.js';

// add them to the app definition here
const app = () => {
    registerRollButtonComponent();
    registerInlineSymbolComponent();
    registerHelpBoxComponent();
    // loadScript('./scripts/chaosSettings.js');


}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);

// Trying out a script load to stick all the scripts into the page after DOM has loaded

function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}