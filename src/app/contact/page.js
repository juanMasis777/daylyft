"use client";

export default function ContactPage() {
return (
<div style={{ minHeight: "100vh", background: "#080d0b", fontFamily: "'Outfit', sans-serif", padding: "60px 24px" }}>
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#10b981", textDecoration: "none", fontSize: 14, marginBottom: 32 }}>← Back to DayLyft</a>

    <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Contact Us</h1>
        <p style={{ fontSize: 15, color: "#8a8a9a", lineHeight: 1.7 }}>We'd love to hear from you. Reach out for support, feedback, partnerships, or just to say hi.</p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <a href="mailto:juanmasis777@gmail.com" style={{
        display: "flex", alignItems: "center", gap: 14, padding: 20,
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 16, textDecoration: "none",
        }}>
        <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, #10b981, #34d399)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></svg>
        </div>
        <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Email</div>
            <div style={{ fontSize: 13, color: "#34d399" }}>juanmasis777@gmail.com</div>
        </div>
        </a>

        <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: 20,
        background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)",
        borderRadius: 16,
        }}>
        <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, #00CEC9, #55efc4)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
        </div>
        <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Location</div>
            <div style={{ fontSize: 13, color: "#00CEC9" }}>Miami Beach, FL</div>
        </div>
        </div>

        <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: 20,
        background: "rgba(253,203,110,0.08)", border: "1px solid rgba(253,203,110,0.15)",
        borderRadius: 16,
        }}>
        <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, #fdcb6e, #ffeaa7)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14100a" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        </div>
        <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Response time</div>
            <div style={{ fontSize: 13, color: "#fdcb6e" }}>Usually within 24 hours</div>
        </div>
        </div>
    </div>

    <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#636e72" }}>© 2026 DayLyft. All rights reserved. Made with ❤️ in Miami</p>
    </div>
    </div>
</div>
);
}