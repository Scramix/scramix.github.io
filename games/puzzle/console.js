// Metadata for the puzzle, such as levels.
let lvl = 0
// Commands that just output text, but are very inconvient to use with functions
let HINT = "Type LIST into the console.";
let HELP = "Commands: HINT, HELP, PUNCH";
// Commands that call the rats to help them

// Introduction
console.log("So... You followed the instructions.");
console.log("Well, we should start off by asking a few questions.");
console.log("Try to decode this. Type HINT for a hint, and input your answer into the console if you think you have the answer.");
console.warn("Don't try to outsmart the system. It won't work.");
console.log(" ");
console.log("The computer feels cold. Like it was made of ice. You have to insert punch cards into the computer to boot it.")
console.warn("If you don't know what you are doing, type HELP for a list of commands.");

// Punch card mechanism, held up by two rats and a cat
function PUNCH(HOLE) {
   if (HOLE === shoebox[lvl]) {
          console.log("PUNCHED HOLE", HOLE, ".");
        lvl++;

        if (lvl === shoebox.length) {
            console.log("INSERTING INTO COMPUTER...");
        }
    } else {
        console.warn("MECHANICAL PUNCHER JAMMED.");
    }
}

function GOTODECODE() {
  location.href = "./DECODE.txt"
}

globalThis.__defineGetter__("LIST", GOTODECODE);
