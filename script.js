const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

@keyframes unlockGlow {
    0%{
        transform:scale(0.8);
        opacity:0;
    }

    50%{
        transform:scale(1.15);
        opacity:1;
    }

    100%{
        transform:scale(1);
        opacity:1;
    }
}

.unlocked{
    animation:unlockGlow 1s ease;
}

.glow{
    border:2px solid gold;
    box-shadow:
        0 0 20px gold,
        0 0 40px gold,
        0 0 60px rgba(255,215,0,0.7);
}

.new-badge{
    display:inline-block;
    margin-left:8px;
    padding:4px 8px;
    background:gold;
    color:black;
    border-radius:20px;
    font-size:12px;
    font-weight:bold;
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
    setInterval(loadNumbers, 3000);
    
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
