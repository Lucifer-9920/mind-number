const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";

const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabaseClient = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

async function saveNumbers() {

```
const password = prompt("ENTER ADMIN PASSWORD");

if (password !== "Lucifer@2026") {
    alert("Wrong Password!");
    return;
}

const updates = [
    { slot: "12PM", value: document.getElementById("n12").value },
    { slot: "2PM", value: document.getElementById("n14").value },
    { slot: "4PM", value: document.getElementById("n16").value },
    { slot: "6PM", value: document.getElementById("n18").value },
    { slot: "8PM", value: document.getElementById("n20").value },
    { slot: "10PM", value: document.getElementById("n22").value }
];

for (const item of updates) {

    if (item.value === "") {
        continue;
    }

    const { error } = await supabaseClient
        .from("number")
        .update({
            number: parseInt(item.value)
        })
        .eq("slot", item.slot);

    if (error) {
        alert("Update Error: " + error.message);
        return;
    }

    const { error: historyError } = await supabaseClient
        .from("history")
        .insert({
            history_date: new Date().toISOString().split("T")[0],
            slot: item.slot,
            number: parseInt(item.value)
        });

    if (historyError) {
        alert("History Error: " + historyError.message);
    }
}

alert("Numbers Saved Successfully!");
```

}
