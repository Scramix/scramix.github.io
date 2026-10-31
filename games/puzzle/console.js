// Metadata for the puzzle, such as levels.
let LEVEL = 0
let SHOEBOX = [41, 9, 67]
let startpnch = 0
// Commands that just output text, but are very inconvient to use with functions
let HINT = "Type SHOEBOX and type LIST. LIST will show you an old maintenience paper found in a closet. SHOEBOX will tell you the order you need to punch it in.";
let HELP = "Commands: HINT, HELP, PUNCH, LEVEL";

// Introduction
console.log("So... You followed the instructions.");
console.log("Try to decode this. Type HINT for a hint, and input your answer into the console if you think you have the answer.");
console.warn("Don't try to outsmart the system. It won't work.");
console.log(" ");
console.log("The computer feels cold. Like it was made of ice. You have to insert punch cards into the computer to boot it.")
console.warn("If you don't know what you are doing, type HELP for a list of commands.");
console.warn("Don't click on the console.js file. That's cheating. Plus, you can't rely on it forever...")

// Punch card mechanism, held up by two rats and a cat
function PUNCH(HOLE) {
    if (HOLE !== SHOEBOX[startpnch]) {
        console.warn("PUNCH CARD NOT ACCEPTED.");
        return;
    }

    console.log("PUNCHED HOLE", HOLE, ".");
    startpnch++;

    if (startpnch === SHOEBOX.length) {
        console.log("INSERTING INTO COMPUTER...");
        let LEVEL = 1
        let HINT = "Don't check here. Maybe the HTML has something to offer."
        let HELP = "Commands: HINT"
        location.href = "./LEVEL2.html"
    }
}

// The two rats' workstation

function GOTODECODE() {
  location.href = "./DECODE.txt"
}

// Commands that call the rats to help them
globalThis.__defineGetter__("LIST", GOTODECODE);
