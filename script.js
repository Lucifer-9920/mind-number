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
            element.innerHTML = row.number + ' <span class="new-badge">LIVE</span>';
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
}
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
