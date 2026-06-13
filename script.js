const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadNumbers() {

    const hour = new Date().getHours();

    const { data, error } = await supabaseClient
        .from("number")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    data.forEach(row => {

        if (row.slot === "12PM")
            document.getElementById("slot12").innerHTML =
                hour >= 12 ? row.number : "🔒 Locked";

        if (row.slot === "2PM")
            document.getElementById("slot14").innerHTML =
                hour >= 14 ? row.number : "🔒 Locked";

        if (row.slot === "4PM")
            document.getElementById("slot16").innerHTML =
                hour >= 16 ? row.number : "🔒 Locked";

        if (row.slot === "6PM")
            document.getElementById("slot18").innerHTML =
                hour >= 18 ? row.number : "🔒 Locked";

        if (row.slot === "8PM")
            document.getElementById("slot20").innerHTML =
                hour >= 20 ? row.number : "🔒 Locked";

        if (row.slot === "10PM")
            document.getElementById("slot22").innerHTML =
                hour >= 22 ? row.number : "🔒 Locked";
    });

    document.getElementById("loading").style.display = "none";
    document.getElementById("app").style.display = "block";
}

window.onload = async function () {

    function updateTime() {
        const now = new Date();

        document.getElementById("liveDateTime").innerHTML =
            now.toLocaleDateString() +
            " | " +
            now.toLocaleTimeString();
    }

    updateTime();
    setInterval(updateTime, 1000);

    await loadNumbers();

    supabaseClient
        .channel("number-changes")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "number"
            },
            async () => {
                await loadNumbers();
            }
        )
        .subscribe();
};
