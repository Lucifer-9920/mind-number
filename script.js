const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
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
