var h1 = "";
var h3 = "";
var action = "";
var disable = false; // when pressed =, disables BSP, /, *, -, + buttons

// On number click, add it to h1
$(".number").on("click", function(){
    if (h1.length > 15) {
        return;
    }

    // If equals was pressed, make following adjustments not to break code
    if (disable) {
        h1 = "";
        $("h1").text("0");
        disable = false;
    }
    //If h1 is empty & number pressed is 0, terminate function with return.
    if (h1 === "" && $(this).text() === "0"){
        return;
    } else {
        h1 += $(this).text();
        $("h1").text(h1);
    }
});

// CE clears h1 variable and rolls html h1 tad text to "0"
$("#ce").on("click", function(){
    $("h1").text("0");
    h1 = "";
});

// +- button adds or removes - symbol
$("#plus-minus").on("click", function() {
    // If h1 is empty, terminate method with return, because 0 can not be negative.
    if (h1 === "") {
        return;
    }

    // If number is > 0, make it negative
    if (h1 > 0) {
        h1 = "-" + h1;
        $("h1").text(h1);
        return;
    }

    // If number is < 0, make it positive
    if (h1.charAt(0) === "-") {
        h1 = h1.replace("-", "");
        $("h1").text(h1);
        return;
    }
});

// Add decimal delimeter
$("#decimal").on("click", function(){
    if (disable) {
        clear();
        disable = false;
    }
    if (h1.includes(".")) {
        return;
    } else if (h1 === "") {
        h1 = h1 + "0.";
        $("h1").text(h1);
    } else {
        h1 = h1 + ".";
        $("h1").text(h1);
    }
});

// C button resets calculator
$("#clear").on("click", clear);
function clear() {
    h1 = "";
    h3 = "";
    $("h1").text("0");
    $("h3").text("");
}



// BSP deletes one symbol back
$("#back").on("click", function(){
    // If h1 is empty, do nothing
    if (h1 === "" || disable) {
        return;
    }

    if (h1 === "0.") {
        h1 = ""
    }

    h1 = h1.slice(0, h1.length-1);
    $("h1").text(h1);

    // If h1 turns into empty string, add 0 to h1 html text
    if (h1 === "" || (h1.length === 1 && h1.charAt(0) === "-")) {
        $("h1").text("0");
    }
});

// Assign action
$(".action").on("click", function(){
    action = $(this).attr("id");
    if (action === "divide" && (h1 === "" || h1 === "0")) {
        console.log("return")
        return;
    }
    
    if (h3 !== "") {
        equals();
    }

    beforeCalculate();
});

function equals () {
    // If h3 is empty, there is only one number entered
    if (h3 === "") {
        return;
    }

    if (calculate().length > 17) {
        $("h1").text(calculate().toExponential(10));
    } else {
        $("h1").text(calculate());
    }
    
    $("h3").text("");
    h1 = $("h1").text();
    h3 = "";

    disable = true;
}

// equals
$("#equals").on("click", equals);

// Action sign is presed. h1 goes to h3, sign is added
function beforeCalculate () {
    if(h1 === "") {
        h1 = "0";
    }

    switch(action){
        case "divide":
            h3 = h1 + " / "
            break;
        case "multiply":
            h3 = h1 + " X "
            break;
        case "minus":
            h3 = h1 + " - "
            break;
        case "plus":
            h3 = h1 + " + "
            break;
    }

    $("h3").text(h3);
    $("h1").text("0");
    h1 = "";
}

function calculate () {
    var one = Number(h3.slice(0, h3.length - 3));
    var two = Number(h1);

    switch(action){
        case "divide":
            return one / two;
        case "multiply":
            return one * two;
        case "minus":
            return one - two;
        case "plus":
            return one + two;
    }
}