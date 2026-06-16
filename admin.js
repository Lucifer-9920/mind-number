const SUPABASE_URL = "https://botfmbszxqpnelyiccdi.supabase.co";

const SUPABASE_KEY = "sb_publishable_62Ut3sGstDGcPB0Io3k-dQ_iJaovqHd";

const supabaseClient = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

async function saveNumbers() {

    alert("Button Working");

    const { data, error } = await supabaseClient
        .from("number")
        .select("*");

    if (error) {
        alert("Supabase Error: " + error.message);
    } else {
        alert("Supabase Connected");
        console.log(data);
    }
}
