setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").style.display = "block";
}, 2000);

function updateTime() {
    const now = new Date();

    document.getElementById("liveDateTime").innerHTML =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();
