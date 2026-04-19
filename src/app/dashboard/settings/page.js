<button onClick={async () => {
const confirmed = confirm("Are you sure you want to delete your account? This action is PERMANENT and cannot be undone. All your data will be lost.");
if (!confirmed) return;
const doubleConfirm = confirm("This is your last chance. Type OK to confirm you want to permanently delete your account and all data.");
if (!doubleConfirm) return;
try {
const { data: { session } } = await supabase.auth.getSession();
if (session) {
    await supabase.from("tasks").delete().eq("user_id", session.user.id);
    await supabase.from("events").delete().eq("user_id", session.user.id);
    await supabase.from("journal").delete().eq("user_id", session.user.id);
    await supabase.from("habits").delete().eq("user_id", session.user.id);
    await supabase.from("habit_logs").delete().eq("user_id", session.user.id);
    await supabase.from("goals").delete().eq("user_id", session.user.id);
    await supabase.from("budget").delete().eq("user_id", session.user.id);
    await supabase.from("notes").delete().eq("user_id", session.user.id);
    await supabase.from("family").delete().eq("user_id", session.user.id);
    localStorage.clear();
    await supabase.auth.signOut();
    alert("Your account data has been deleted.");
    window.location.href = "/login";
}
} catch (e) {
alert("Error deleting account. Please try again or contact juanmasis777@gmail.com");
}
}} style={{
padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.3)",
background: "rgba(255,107,107,0.1)", color: "#ff6b6b",
fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
}}>Delete my account</button>