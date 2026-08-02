window.onload = function() {
    const link = document.getElementById("url");

    if (link) {
        link.href = window.location.href;
        link.textContent = window.location.host + window.location.pathname;
    }
};
