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

    document.getElementById("slot12").innerHTML = "47";
    document.getElementById("slot14").innerHTML = "83";
    document.getElementById("slot16").innerHTML = "15";
    document.getElementById("slot18").innerHTML = "92";
    document.getElementById("slot20").innerHTML = "34";
    document.getElementById("slot22").innerHTML = "76";
};
