// THIS FILE STARTS ALL THE STUFF

// MMM, global variables...

//     window.effectLibrary = {}
//     window.gameConfig = {}
//     window.filterCriteria = {}
//     window.gameList = {}

// onLoad behaviours
// window.onload = setSettingsVisibility(), setGameControlVisibility()


    
// plain vanilla says this is a good way to ensure stuff doesn't load broken if JavaScript isn't enabled
// const app = () => {
//     const template = document.querySelector('template#page');
//     if (template) document.body.appendChild(template.content, true);
// }

// document.addEventListener('DOMContentLoaded', app);

// define all my "getElement" shenanigans here for quicker reuse
// reference stuff like els.gameConfigBlock.property

// const els = {
//     gameConfigBlock: document.getElementById("gameSettings"), // div that holds all the config stuff
//     gameConfigButton: document.getElementById("gameSettingsButton"), // button that shows/hides config stuff
// 
//     playerCountText: document.getElementById("playerCountText"), // player count display text
//     playerCountButton: document.getElementById("playerCountButton"), // player count button (turn into a toggle at some point?)
// 
//     listList: document.getElementById("listBase"), // base list selection
// 
//     vengBlock: document.getElementById("vengeanceSelector"), // vengeance section
//     vengCheck: document.getElementById("vengeanceToggle"), // vengeance checkbox
// 
//     physBlock: document.getElementById("physicalSelector"), // physical section
//     physCheck: document.getElementById("physicalToggle"), // physical checkbox
// 
//     mgBlock: document.getElementById("minigameSelector"), // minigame section
//     mgDelayBlock: document.getElementById("minigameDelaySetting"), // minigame delay section
//     mgCheck: document.getElementById("minigameToggle"), // minigame checkbox
//     mgDelaySlide: document.getElementById("minigameDelay"), // minigame delay slider
//     mgDelayText: document.getElementById("delayNum"), // minigame delay display text
// 
//     exemplarBlock: document.getElementById("exemplarThemeSelector"), // exemplar section
//     exemplarList: document.getElementById("exemplarTheme"), // theme list
//     exemplarAllCheck: document.getElementById("allThemes"), // all themes checkbox
// 
//     schoolBlock: document.getElementById("customSchoolSelector"), // school section
//     schoolList: document.getElementById("customSchool"), // school list
//     schoolAllCheck: document.getElementById("allSchools"), // all schools checkbox
// 
//     durationBlock: document.getElementById("customDurationSelector"), // duration section
//     durationList: document.getElementById("customDuration"), // duration list
//     durationAllCheck: document.getElementById("allDurations"), // all durations checkbox
// 
//     rarityBlock: document.getElementById("customRaritySelector"), // rarity section
//     rarityList: document.getElementById("customRarity"), // rarity list
//     rarityAllCheck: document.getElementById("allRarities"), // all raritys checkbox
// 
//     mattersBlock: document.getElementById("customRarityMattersSelector"), // rarity matters section
//     mattersCheck: document.getElementById("customRarityMattersToggle"), // rarity matters checkbox
// 
//     repeatBlock: document.getElementById("repetitionSelector"), // repetition section
//     repeatCheck: document.getElementById("repetitionToggle") // repetition checkbox
// 
// 
// }
