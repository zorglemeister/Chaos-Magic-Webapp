// Component mapping:
// - settings
// - - helpBox
// - game
// - - effect
// - - - rollButton
// - - - inlineSymbol





import { registerSettingsComponent } from '../components/settingsComponent.js';
import { registerGameComponent } from '../components/gameComponent.js';
import * as shared from './sharedAssets.js';

// add them to the app definition here
const app = () => {

    registerSettingsComponent(); 
    registerGameComponent();
    
}

// waits for the DOM to fully load before tripping the app components
document.addEventListener('DOMContentLoaded', app);

// ***** Make the list(s)
// go get a file
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// set the sourceJSON location
const sourcePath = 'lists/chaosList.json';
// populate the list from the file

// running into challenges updating the imported object.
// i don't think I can assign a value directly like this
// shared.sourceList = await loadJSON(sourcePath);
// so i need to use .assign to overwrite the object structure
// do i need to clear the current contents? not sure. I'll do it to be safe...

async function updateSourceList() {
    const newSourceList = await loadJSON(sourcePath); // get the file and put it into a new object

    // how to clear an object?
    // loop through properties and delete them?
    for (let key in shared.sourceList) { // for each key in sourceList...
        if (shared.sourceList.hasOwnProperty(key)) { // if sourceList has a property with that name (it should!)
            delete shared.sourceList[key]; // delete that property
        }
    }

    Object.assign(shared.sourceList, newSourceList); // target sourceList and assign the new object definition to it
}
// Now do it:
updateSourceList();


// do it again for Vengeance
const vengPath = 'lists/chaosVengeance.json';
// populate the list from the file
// (this actually should use filtering on the source list to create this so it's all one original JSON)
// shared.vengList = await loadJSON(vengPath);

async function updateVengList() {
    const newVengList = await loadJSON(vengPath); // get the file and put it into a new object
    for (let key in shared.vengList) { // for each key in vengList...
        if (shared.vengList.hasOwnProperty(key)) { // if vengList has a property with that name (it should!)
            delete shared.vengList[key]; // delete that property
        }
    }
    Object.assign(shared.vengList, newVengList); // target vengList and assign the new object definition to it
}
// Now do it:
updateVengList();

