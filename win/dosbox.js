const w = window;

console.log("Booting Windows 3.1...");
console.log("Starting download...");
document.title = "Windows 3.1";

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

console.log("CDRIVE.IMG extracted. Loading Windows.");

const dos = w.Dos(document.getElementById("dos"), {
    initFs: [
        {
            path: "CDRIVE.IMG",
            contents: image
        },
        {
            path: "AUTOEXEC.BAT",
            contents: new TextEncoder().encode(autoexec)
        }
    ]
});

await dos.ready;

await dos.shell("AUTOEXEC.BAT");
