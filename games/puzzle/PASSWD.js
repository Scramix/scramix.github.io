function PASSWD() {
PASSWD.user = prompt("Enter in your username.");
PASSWD.pass = prompt("Enter in your password.");
}

function CHKUSER() {
  if (PASSWD.user === "SANDY" && PASSWD.pass === "CLAWS") {
    location.href = "./LEVEL2.html"
  } else {
    alert("WRONG PASSWORD.");
    PASSWD();
  }
