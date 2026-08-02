const w = window;

const dos = await w.Dos(document.getElementById("dos")).ready;

console.log("Booting Windows 3.1...");
console.log("Starting download...");

const response = await fetch("win.zip");
const fetchauto = await fetch("AUTOEXEC.BAT");

const bytes = await response.arrayBuffer();
const autoexec = await fetchauto.text();

const files = w.fflate.unzipSync(new Uint8Array(bytes));
const image = files["CDRIVE.IMG"];

dos.fs.writeFile("CDRIVE.IMG", image);
dos.fs.writeFile("AUTOEXEC.BAT", autoexec);

dos.run("AUTOEXEC.BAT");

