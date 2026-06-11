window.onload = function () {
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").style.display = "block";

    function updateTime() {
        const now = new Date();

        document.getElementById("liveDateTime").innerHTML =
            now.toLocaleDateString() +
            " | " +
            now.toLocaleTimeString();
    }

    updateTime();
    setInterval(updateTime, 1000);

    const hour = new Date().getHours();

    document.getElementById("slot12").innerHTML =
        hour >= 12 ? "47" : "🔒 Locked";

    document.getElementById("slot14").innerHTML =
        hour >= 14 ? "83" : "🔒 Locked";

    document.getElementById("slot16").innerHTML =
        hour >= 16 ? "15" : "🔒 Locked";

    document.getElementById("slot18").innerHTML =
        hour >= 18 ? "92" : "🔒 Locked";

    document.getElementById("slot20").innerHTML =
        hour >= 20 ? "34" : "🔒 Locked";

    document.getElementById("slot22").innerHTML =
        hour >= 22 ? "76" : "🔒 Locked";
};
