const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function saveNumbers() {

    const updates = [
        { slot: "12PM", value: document.getElementById("n12").value },
        { slot: "2PM", value: document.getElementById("n14").value },
        { slot: "4PM", value: document.getElementById("n16").value },
        { slot: "6PM", value: document.getElementById("n18").value },
        { slot: "8PM", value: document.getElementById("n20").value },
        { slot: "10PM", value: document.getElementById("n22").value }
    ];

    for (const item of updates) {
        const { error } = await supabaseClient
            .from("number")
            .update({ number: parseInt(item.value) })
            .eq("slot", item.slot);

        if (error) {
            alert("Error: " + error.message);
            return;
        }
    }

    alert("Numbers Saved Successfully!");
}
