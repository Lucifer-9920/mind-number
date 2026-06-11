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
};
