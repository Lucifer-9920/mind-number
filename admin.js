const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdGZtYnN6eHFwbmVseWljY2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDgzMTksImV4cCI6MjA5NjY4NDMxOX0.AMyQ1LlyS58qwqCmAiqFv7xlhL9R_wJP5G48wuR5AHQ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function saveNumbers() {

    await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n12").value) })
        .eq("slot", "12PM");

    await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n14").value) })
        .eq("slot", "2PM");

    await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n16").value) })
        .eq("slot", "4PM");

    await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n18").value) })
        .eq("slot", "6PM");

    await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n20").value) })
        .eq("slot", "8PM");

    await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n22").value) })
        .eq("slot", "10PM");

    alert("Numbers Saved!");
}
