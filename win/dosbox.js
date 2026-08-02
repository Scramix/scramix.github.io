const w = window;

console.log(dos);

const dos = await w.Dos(document.getElementById("dos")).ready;

console.log("Booting Windows 3.1...");
console.log("Starting download...");

const response = await fetch("win.zip");
const fetchauto = await fetch("AUTOEXEC.BAT");

if (!response.ok) {
    throw new Error("Could not download win.zip");
}

if (!fetchauto.ok) {
    throw new Error("Could not download AUTOEXEC.BAT");
}

const bytes = await response.arrayBuffer();
const autoexec = await fetchauto.text();

const files = w.fflate.unzipSync(new Uint8Array(bytes));
const image = files["CDRIVE.IMG"];


if (!image) {
    throw new Error("CDRIVE.IMG not found in win.zip");
}

console.log ("CDRIVE.IMG extracted. Loading Windows.")

await dos.fs.writeFile("CDRIVE.IMG", image);
await dos.fs.writeFile("AUTOEXEC.BAT", autoexec);

await dos.shell("AUTOEXEC.BAT");
