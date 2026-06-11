const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
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
async function loadNumbers() {
    const { data, error } = await supabase
        .from("number")
        .select("*");

    if (error) {
        console.error("Supabase Error:", error);
        return;
    }

    data.forEach(item => {

        if (item.slot === "12PM")
            document.getElementById("slot12").innerHTML = item.number;

        if (item.slot === "2PM")
            document.getElementById("slot14").innerHTML = item.number;

        if (item.slot === "4PM")
            document.getElementById("slot16").innerHTML = item.number;

        if (item.slot === "6PM")
            document.getElementById("slot18").innerHTML = item.number;

        if (item.slot === "8PM")
            document.getElementById("slot20").innerHTML = item.number;

        if (item.slot === "10PM")
            document.getElementById("slot22").innerHTML = item.number;
    });
}
