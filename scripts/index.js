// import components here
import { registerRollButtonComponent } from '../components/rollButtonComponent.js';
import { registerInlineSymbolComponent } from '../components/inlineSymbolComponent.js';
import { registerHelpBoxComponent } from '../components/helpBoxComponent.js';

// import the settings module here
import * as set from './settingsModule.js';
// so, theoretically, the const's from this module will be available as "set.configSettingsButton"
// and the functions will be "set.doSomething()"

// add them to the app definition here
const app = () => {
    registerRollButtonComponent();
    registerInlineSymbolComponent();
    registerHelpBoxComponent();
    set.defineEvents(); // this adds all the click and input handlers for Settings
    set.initialState(); // this sets the Settings up for initial interactions
    // loadScript('./scripts/chaosSettings.js');


}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);

// Trying out a script load to stick all the scripts into the page after DOM has loaded
// 
// function loadScript(url)
// {    
//     var head = document.getElementsByTagName('head')[0];
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = url;
//     head.appendChild(script);
// }