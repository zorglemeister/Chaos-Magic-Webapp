// import components here
import { registerRollButtonComponent } from '../components/rollButtonComponent.js';
import { registerInlineSymbolComponent } from '../components/inlineSymbolComponent.js';
import { registerHelpBoxComponent } from '../components/helpBoxComponent.js';
import { registerSettingsComponent } from '../components/settingsComponent.js';

// import the settings module here
import * as settings from './settingsModule.js';
// so, theoretically, the const's from this module will be available as "settings.configSettingsButton"
// and the functions will be "settings.doSomething()"

// add them to the app definition here
const app = () => {
    registerRollButtonComponent();
    registerInlineSymbolComponent();
    // registerHelpBoxComponent();
    registerSettingsComponent(); // this uses HelpBox, so I'm pretty sure it needs to load after that component
    // do i need to add the <z-settings> tag to the HTML _after_ this is registered?
    settings.defineEvents(); // this adds all the click and input handlers for Settings (which loaded before it)
    settings.initialState(); // this sets the Settings up for initial interactions
    // loadScript('./scripts/chaosSettings.js');


}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);

// NAH, GONNA MODULE THEM
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