const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
window.onload = async function () {
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
    const { data, error } = await supabaseClient
    .from("number")
    .select("*");

console.log(data);
    if (data) {
    data.forEach(row => {
        if (row.slot === "12PM")
            document.getElementById("slot12").innerHTML = row.number;

        if (row.slot === "2PM")
            document.getElementById("slot14").innerHTML = row.number;

        if (row.slot === "4PM")
            document.getElementById("slot16").innerHTML = row.number;

        if (row.slot === "6PM")
            document.getElementById("slot18").innerHTML = row.number;

        if (row.slot === "8PM")
            document.getElementById("slot20").innerHTML = row.number;

        if (row.slot === "10PM")
            document.getElementById("slot22").innerHTML = row.number;
    });
}
alert(JSON.stringify(error));
console.log(error);
};
