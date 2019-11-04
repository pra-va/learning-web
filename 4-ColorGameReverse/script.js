// ###### VARIEBLES ######
// This is THE COLOR to guess.
var theColor = "rgb(0, 0, 179)";
var variants = [];
var isGameOver = false;
var gameMode = "rgb";
var difficulty = 6;
var headerColor = "black";

// ###### SELECTORS ######
var colorWindow = document.querySelector("#collorWindow"); // Color window to showcase the color to guess.
var variantsTable = document.querySelectorAll("td");
var colorWindowText = document.querySelector("#collorWindow h1");
var topNav = document.querySelector("#topNav");
var resetBtn = document.querySelector("#reset");
var rgbMode = document.querySelector("#rgbMode");
var hexMode = document.querySelector("#hexMode");
var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");
var allButtons = document.querySelectorAll("button");


initiate();


// Event listener for pressed color
function tableEventsInitiation() {
    for (var i=0; i<variants.length; i++) {
        variantsTable[i].addEventListener("click", function (){
            if (theColor === this.textContent) {
                // This code will run if the game was won
                reveal();
                colorWindowText.textContent = "Correct!"
                topNav.style.backgroundColor = theColor;
                headerColor = theColor;
                navSetup();
                resetBtn.textContent = "replay";
                for (var i=0; i<variantsTable.length; i++) {
                    variantsTable[i].textContent = variants[i];
                }
                isGameOver = true;
            } else {
                // This code will be run if the game was lost
                if  (!isGameOver) {
                    colorWindowText.textContent = "Wrong!!!"
                    this.style.backgroundColor = "rgb(200, 206, 205)";
                    this.textContent = "";
                }
                
            }
        });
    }
}


// This function will initiate the game when page is loaded. Also, when pressing reset,
// this function will be called to reset all game related options.
function initiate() {
    variants = [];
    isGameOver = false;
    colorWindowText.textContent = "Which color is this?"
    navSetup();
    generateAndAssignColors(gameMode, difficulty);
    tableEventsInitiation();
}

// Event listener for reseting the game
resetBtn.addEventListener("click", function(){
    reset.textContent = "reset";
    initiate();
});

// Two event listeners for selecting rgb or hex modes.
rgbMode.addEventListener("click", function(){
    if (gameMode === "hex"){
        gameMode = "rgb";
        rgbMode.style.backgroundColor = headerColor;
        hexMode.style.backgroundColor = "white";
        rgbMode.style.color = "white";
        hexMode.style.color = "black";
        initiate();
    }
});
hexMode.addEventListener("click", function(){
    if (gameMode === "rgb"){
        gameMode = "hex";
        rgbMode.style.backgroundColor = "white";
        hexMode.style.backgroundColor = headerColor;
        rgbMode.style.color = "black";
        hexMode.style.color = "white";
        initiate();
    }
});

// Easy, medium and hard modes. This function will set-up ammount of td's with
// color codes regarding the difficulty that player choses.
easy.addEventListener("click", function(){
    if (difficulty !== 2){
        difficulty = 2;
        initiate();
    }
});
medium.addEventListener("click", function(){
    if (difficulty !== 4){
        difficulty = 4;
        initiate();
    }
});
hard.addEventListener("click", function(){
    if (difficulty !== 6){
        difficulty = 6;
        initiate();
    }
});

// This function sets up lower naviation colors at the start of the game (refresh page)
function navSetup () {
    if (gameMode === "rgb") {
        rgbMode.style.backgroundColor = headerColor;
        rgbMode.style.color = "white";
    } else {
        hexMode.style.backgroundColor = headerColor;
        hexMode.style.color = "white";
    }

    if (difficulty === 2) {
        easy.style.backgroundColor = headerColor;
        easy.style.color = "white";
        medium.style.backgroundColor = "white";
        medium.style.color = "black";
        hard.style.backgroundColor = "white";
        hard.style.color = "black";
    } else if (difficulty === 4) {
        medium.style.backgroundColor = headerColor;
        medium.style.color = "white";
        easy.style.backgroundColor = "white";
        easy.style.color = "black";
        hard.style.backgroundColor = "white";
        hard.style.color = "black";
    } else if (difficulty === 6) {
        hard.style.backgroundColor = headerColor;
        hard.style.color = "white";
        medium.style.backgroundColor = "white";
        medium.style.color = "black";
        easy.style.backgroundColor = "white";
        easy.style.color = "black";
    }

}

// This function will reveal the real colors of codes, provided in variants table
function reveal () {
    for (var i=0; i<variantsTable.length; i++) {
        variantsTable[i].style.backgroundColor = variants[i];
    }
}

// Generates random colors and puts them to DOM. Function takes
// three types of parameters and switches to generate required type
// of color code ("rgb", "hex").
function generateAndAssignColors (typeOfColorCode, num) {
    switch (typeOfColorCode) {
        // This will generate random colors depending on typeOfColorCode provided
        case "rgb":
            for (var i=0; i<num; i++) {
                variants.push(generateRgb());
            }
            break;
        case "hex":
            for (var i=0; i<num; i++) {
                variants.push(generateHex());
            }
            break;
    }

    // This will pick random color from variants array
    theColor = pickRandom(variants);

    // This will update color codes in the table
    for (var i=0; i<num; i++) {
        variantsTable[i].textContent = variants[i];
        variantsTable[i].style.backgroundColor = theColor;
    }

    if (difficulty < 6) {
        for (var i=num; i<6; i++) {
            variantsTable[i].textContent = "";
            variantsTable[i].style.backgroundColor = "rgb(200, 206, 205)";
        }
    }
    colorWindow.style.backgroundColor = (theColor);
}

//  rgb color generator. Floor - rounds number to lesser side. 
// Random - generates number betwean 0 and 1. Since floor method 
// rounds number to lesser side, we need to add + 1 to get whole 
// range of desired numbers. Function returns rgb color code in a String format.
function generateRgb () {
    // Red color generator
    var red = Math.floor(Math.random() * 256); 

    // Green color generator
    var green = Math.floor(Math.random() * 256); 

    // Blue color generator
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// hex color generator
function generateHex () {
    var hexArray = ["0", "1", "2", "3", 
                    "4", "5", "6", "7", 
                    "8", "9", "a", "b", 
                    "c", "d", "e", "f"];
    var hexCode = "#";
    for (var i=1; i < 7; i++) {
        var randomNumber = Math.floor(Math.random() * 16);
        hexCode = hexCode + hexArray[randomNumber];
    }
    return hexCode;
}

// Takes colors array and returns random color.
function pickRandom (colors) {
    var pickedColor = Math.floor(Math.random() * colors.length);
    return colors[pickedColor];
}


