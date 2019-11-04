// document selectors
var p1NameSelector = document.querySelector("#p1Name");
var p2NameSelector = document.querySelector("#p2Name");
var p1NameSpot = document.querySelector(".p1NameSpot");
var p2NameSpot = document.querySelector(".p2NameSpot");
var p1scoreView = document.querySelectorAll(".p1scores");
var p2scoreView = document.querySelectorAll(".p2scores");
var p1btn = document.querySelector("#p1btn");
var p2btn = document.querySelector("#p2btn");
var resetbtn = document.querySelector("#reset");

// required variables
var set = 0;
var p1Score = [0,0,0]; //score: 1st set, 2nd set, 3rd set
var p2Score = [0,0,0]; //score: 1st set, 2nd set, 3rd set
var p1setsWon = 0;
var p2setsWon = 0;
var gameover = false;

p1NameSelector.addEventListener("change" , function () {
    setTimeout(function() {
        p1NameSpot.textContent = p1NameSelector.value;
    }, 700);
});

p2NameSelector.addEventListener("change" , function () {
    setTimeout(function() {
        p2NameSpot.textContent = p2NameSelector.value;
    }, 700);
});

// PLAYER 1
p1btn.addEventListener("click", function() {
    if(!gameover) {
        p1Score[set]++;
        p1scoreView[set].textContent = p1Score[set];
        console.log(p1Score + " : " + p2Score + " " + set);
        if (switchSet()) {
            p1scoreView[set-1].classList.add("setWon");
            p1setsWon++;
            if (p1setsWon === 2) {
                p1NameSpot.classList.add("winner");
                gameover = true;
            }
        } 
    }
});

// PLAYER 2
p2btn.addEventListener("click", function() {
    if(!gameover) {
        p2Score[set]++;
        p2scoreView[set].textContent = p2Score[set];
        console.log(p1Score + " : " + p2Score + " " + set);
        if (switchSet()) {
            p2scoreView[set-1].classList.add("setWon");
            p2setsWon++;
            if (p2setsWon === 2) {
                p2NameSpot.classList.add("winner");
                gameover = true;
            }
        }
    }
});

resetbtn.addEventListener("click", function() {
    for (var i=0; i<p1scoreView.length; i++) {
        p1scoreView[i].classList.remove("setWon");
        p2scoreView[i].classList.remove("setWon");
        p1scoreView[i].textContent = 0;
        p2scoreView[i].textContent = 0;
    }
    p1NameSpot.classList.remove("winner");
    p2NameSpot.classList.remove("winner");
    p1NameSpot.textContent = "Undefined";
    p2NameSpot.textContent = "Undefined";
    set = 0;
    p1NameSelector.value = "";
    p2NameSelector.value = "";

    p1Score = [0,0,0];
    p2Score = [0,0,0];
    p1setsWon = 0;
    p2setsWon = 0;
    gameover = false;

});

function switchSet () {
    if (p1Score[set] === 31 || p2Score[set] === 31) {
        set++;
        return true;
    }

    if (p1Score[set] < 21 && p2Score[set] < 21) {
        return false;
    }

    if (p1Score[set] - p2Score[set] === 1 || 
        p1Score[set] - p2Score[set] === 0 ||
        p1Score[set] - p2Score[set] === -1) {
        return false;
    }

    console.log("set++")
    set++;
    return true;
}