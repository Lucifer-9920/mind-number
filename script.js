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

        let slotId = "";
        let unlockHour = 0;

        if (row.slot === "12PM") {
            slotId = "slot12";
            unlockHour = 12;
        }

        if (row.slot === "2PM") {
            slotId = "slot14";
            unlockHour = 14;
        }

        if (row.slot === "4PM") {
            slotId = "slot16";
            unlockHour = 16;
        }

        if (row.slot === "6PM") {
            slotId = "slot18";
            unlockHour = 18;
        }

        if (row.slot === "8PM") {
            slotId = "slot20";
            unlockHour = 20;
        }

        if (row.slot === "10PM") {
            slotId = "slot22";
            unlockHour = 22;
        }

        const element = document.getElementById(slotId);
        const card = element.parentElement;

        if (hour >= unlockHour) {
          element.innerHTML =
    row.number +
    '<br><span class="live-badge">🔴 LIVE</span>';
            element.classList.add("unlocked");
            card.classList.add("glow");
        } else {
            element.innerHTML = "🔒 Locked";
            element.classList.remove("unlocked");
            card.classList.remove("glow");
        }
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

    const slots = [
        { hour: 12, id: "time12" },
        { hour: 14, id: "time14" },
        { hour: 16, id: "time16" },
        { hour: 18, id: "time18" },
        { hour: 20, id: "time20" },
        { hour: 22, id: "time22" }
    ];

    slots.forEach(slot => {

        const target = new Date();
        target.setHours(slot.hour, 0, 0, 0);

        if (now < target) {

            const diff = target - now;

            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);

            document.getElementById(slot.id).innerHTML =
                `⏳ Opens in ${h}h ${m}m ${s}s`;

        } else {

            document.getElementById(slot.id).innerHTML =
                "✅ Open";

        }

    });
}
updateTime();
setInterval(updateTime, 1000);

await loadNumbers();
loadMonthlyChart();
document.getElementById("monthSelect").addEventListener("change", loadMonthlyChart);
setInterval(loadNumbers, 1000);

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
async function loadMonthlyChart() {

    const month = document.getElementById("monthSelect").value;

const startDate = month + "-01";
const endDate = month + "-31";
    const { data, error } = await supabaseClient
        .from("results")
        .select("*")
        .gte("result_date", startDate)
        .lte("result_date", endDate)
        .order("result_date", { ascending: false });

    if (error) {
        console.log(error);
        document.getElementById("monthlyTable").innerHTML =
            "<tr><td colspan='7'>Error Loading</td></tr>";
        return;
    }

    let grouped = {};

    data.forEach(row => {

        if (!grouped[row.result_date]) {
            grouped[row.result_date] = {
                DB:"-", SG:"-", FB:"-", GB:"-", GL:"-", DS:"-"
            };
        }

        if (row.slot=="12PM") grouped[row.result_date].DB=row.number;
        if (row.slot=="2PM") grouped[row.result_date].SG=row.number;
        if (row.slot=="4PM") grouped[row.result_date].FB=row.number;
        if (row.slot=="6PM") grouped[row.result_date].GB=row.number;
        if (row.slot=="8PM") grouped[row.result_date].GL=row.number;
        if (row.slot=="10PM") grouped[row.result_date].DS=row.number;
    });

    let html="";

    Object.keys(grouped).forEach(date=>{
        html += `
        <tr>
            <td>${date.split("-").reverse().join("/")}</td>
            <td>${grouped[date].DB}</td>
            <td>${grouped[date].SG}</td>
            <td>${grouped[date].FB}</td>
            <td>${grouped[date].GB}</td>
            <td>${grouped[date].GL}</td>
            <td>${grouped[date].DS}</td>
        </tr>`;
    });

    document.getElementById("monthlyTable").innerHTML =
        html || "<tr><td colspan='7'>No Data</td></tr>";
}
