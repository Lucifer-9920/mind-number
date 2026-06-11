const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
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
