"use client";

export default function DeleteAccountPage() {
return (
<div style={{
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#0a0a12", fontFamily: "'Outfit', sans-serif", padding: 24,
}}>
    <div style={{ maxWidth: 500, textAlign: "center" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Delete Your Account</h1>
    <p style={{ fontSize: 15, color: "#8a8a9a", lineHeight: 1.7, marginBottom: 24 }}>
        We're sorry to see you go. To request the deletion of your DayLyft account and all associated data, please send an email to the address below with the subject line "Delete My Account".
    </p>
    <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.2)",
        borderRadius: 14, padding: 20, marginBottom: 24,
    }}>
        <p style={{ fontSize: 13, color: "#8a8a9a", marginBottom: 8 }}>Send your request to:</p>
        <a href="mailto:juanmasis777@gmail.com?subject=Delete My Account" style={{
        fontSize: 18, fontWeight: 700, color: "#6C5CE7", textDecoration: "none",
        }}>juanmasis777@gmail.com</a>
    </div>
    <p style={{ fontSize: 13, color: "#636e72", lineHeight: 1.6 }}>
        Your account and all data will be permanently deleted within 30 days of receiving your request. This action cannot be undone.
    </p>
    <a href="/" style={{
        display: "inline-block", marginTop: 24, padding: "12px 28px", borderRadius: 12,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, textDecoration: "none",
    }}>Back to DayLyft</a>
    </div>
</div>
);
}