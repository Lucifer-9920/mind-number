async function saveNumbers() {

    const result = await supabaseClient
        .from("number")
        .update({ number: 99 })
        .eq("slot", "12PM")
        .select();

    alert(JSON.stringify(result));
}
