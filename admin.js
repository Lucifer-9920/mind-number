const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdGZtYnN6eHFwbmVseWljY2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDgzMTksImV4cCI6MjA5NjY4NDMxOX0.AMyQ1LlyS58qwqCmAiqFv7xlhL9R_wJP5G48wuR5AHQ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function saveNumbers() {
    alert("Button Clicked");
    const updates = [
        { slot: "12PM", value: document.getElementById("n12").value },
        { slot: "2PM", value: document.getElementById("n14").value },
        { slot: "4PM", value: document.getElementById("n16").value },
        { slot: "6PM", value: document.getElementById("n18").value },
        { slot: "8PM", value: document.getElementById("n20").value },
        { slot: "10PM", value: document.getElementById("n22").value }
    ];

    for (const item of updates) {
const { data, error } = await supabaseClient
    .from("number")
    .update({ number: parseInt(item.value) })
    .eq("slot", item.slot)
    .select();

alert("DATA = " + JSON.stringify(data));
alert("ERROR = " + JSON.stringify(error));
        if (error) {
            alert("Error: " + error.message);
            return;
        }
    }

    alert("Numbers Saved Successfully!");
}
