const favicon = document.querySelector("link[rel~='icon']");

if (favicon) {
    favicon.href = "/favicon.ico";
}

Dos(document.getElementById("dos"), {
    url: "win.jsdos",
    backend: "dosboxX",
    backendLocked: true,
    countDownStart: 2,
    autoStart: true,
    fullscreen: true
});
