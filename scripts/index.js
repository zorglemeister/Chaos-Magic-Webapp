// import stuff
import { registerSettingsComponent } from '../components/settingsComponent.js';
import { registerGameComponent } from '../components/gameComponent.js';
import * as shared from './sharedAssets.js';

// add them to the app definition here
const app = () => {

    registerSettingsComponent(); 
    registerGameComponent();
    shared.updateSourceList('lists/chaosList.json');
    shared.updateVengList('lists/chaosVengeance.json');
    
}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);
