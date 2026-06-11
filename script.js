setTimeout(() => {
    const loading = document.getElementById("loading");
    const app = document.getElementById("app");

    if (loading) loading.style.display = "none";
    if (app) app.style.display = "block";
}, 2000);

function updateTime() {
    const now = new Date();

    const liveDateTime = document.getElementById("liveDateTime");

    if (liveDateTime) {
        liveDateTime.innerHTML =
            now.toLocaleDateString() +
            " | " +
            now.toLocaleTimeString();
    }
}

setInterval(updateTime, 1000);
updateTime();
