let lvl = 0

console.log("So... You followed the instructions.");
console.log("Well, we should start off by asking a few questions.");
console.log("Try to decode this. Type HINT for a hint, and input your answer into the console if you think you have the answer.");
console.warn("Don't try to outsmart the system. It won't work.");
console.log(" ");
console.log("The computer feels cold. Like it was made of ice. You have to insert punch cards into the computer to boot it.")
console.warn("If you don't know what you are doing, type HELP for a list of commands.");

function PUNCH(HOLE) {
  console.log("PUNCHED HOLE", HOLE, ".");
}

function HINT {
  console.log("Type PICTURE into the console.");
}

function HELP {
  console.warn("Commands:");
  console.warn("HELP");
  console.warn("PUNCH", "The syntax for PUNCH is PUNCH and then (), then put your number inside of there. Has to be 1-80. (i.e: PUNCH(45)");
}
