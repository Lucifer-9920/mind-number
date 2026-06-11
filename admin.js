async function saveNumbers() {

    const result = await supabaseClient
        .from("number")
        .update({ number: parseInt(document.getElementById("n12").value) })
        .eq("slot", "12PM")
        .select();

    alert(JSON.stringify(result));

}
