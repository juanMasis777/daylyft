"use client";

import { useState, useEffect } from "react";

const emailTypes = [
{ id: "professional", label: "Professional", emoji: "💼", color: "#10b981", examples: ["Follow up after meeting", "Request a raise", "Introduce yourself to a new team"] },
{ id: "sales", label: "Sales & Outreach", emoji: "📈", color: "#00CEC9", examples: ["Cold outreach email", "Follow up on proposal", "Partnership request"] },
{ id: "apology", label: "Apology", emoji: "🙏", color: "#fd79a8", examples: ["Apologize for missing deadline", "Apologize for a mistake", "Apologize for late response"] },
{ id: "thankyou", label: "Thank You", emoji: "❤️", color: "#ff6b6b", examples: ["Thank you after interview", "Thank a mentor", "Thank a client"] },
{ id: "request", label: "Request", emoji: "📋", color: "#fdcb6e", examples: ["Request time off", "Request feedback", "Request information"] },
{ id: "complaint", label: "Complaint", emoji: "😤", color: "#e17055", examples: ["Complaint about service", "Dispute a charge", "Report an issue"] },
{ id: "networking", label: "Networking", emoji: "🤝", color: "#00b894", examples: ["Connect on LinkedIn", "Ask for coffee chat", "Reconnect with old contact"] },
{ id: "resignation", label: "Resignation", emoji: "👋", color: "#636e72", examples: ["Two weeks notice", "Graceful resignation", "Leaving on good terms"] },
{ id: "invitation", label: "Invitation", emoji: "🎉", color: "#34d399", examples: ["Invite to event", "Invite to collaborate", "Invite for interview"] },
{ id: "custom", label: "Custom", emoji: "✉️", color: "#74b9ff", examples: ["Any email you need", "Describe the situation", "Kai writes it for you"] },
];

const tones = [
{ id: "professional", label: "Professional", emoji: "👔" },
{ id: "friendly", label: "Friendly", emoji: "😊" },
{ id: "formal", label: "Formal", emoji: "🎩" },
{ id: "casual", label: "Casual", emoji: "✌️" },
{ id: "assertive", label: "Assertive", emoji: "💪" },
{ id: "empathetic", label: "Empathetic", emoji: "💕" },
];

const lengths = [
{ id: "short", label: "Short (2-3 sentences)" },
{ id: "medium", label: "Medium (1 paragraph)" },
{ id: "long", label: "Long (2-3 paragraphs)" },
];

export default function EmailsPage() {
const [emailType, setEmailType] = useState("professional");
const [tone, setTone] = useState("professional");
const [length, setLength] = useState("medium");
const [context, setContext] = useState("");
const [recipient, setRecipient] = useState("");
const [senderName, setSenderName] = useState("");
const [generatedEmail, setGeneratedEmail] = useState("");
const [loading, setLoading] = useState(false);
const [savedEmails, setSavedEmails] = useState([]);
const [showSaved, setShowSaved] = useState(false);
const [copied, setCopied] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("daylyft-emails");
if (saved) setSavedEmails(JSON.parse(saved));

const name = localStorage.getItem("daylyft-email-name");
if (name) setSenderName(name);
}, []);

const generateEmail = async () => {
if (!context.trim()) { alert("Describe what you need to say"); return; }
setLoading(true);
setGeneratedEmail("");
setCopied(false);

const typeInfo = emailTypes.find((t) => t.id === emailType);

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Write a ${tone} ${typeInfo.label.toLowerCase()} email for me. 

Context: ${context.trim()}
${recipient.trim() ? `Recipient: ${recipient.trim()}` : ""}
${senderName.trim() ? `My name: ${senderName.trim()}` : ""}
Tone: ${tone}
Length: ${length}

Write the email with a subject line. Format it as:

Subject: [subject line]

[email body]

${senderName.trim() ? `Sign off with my name: ${senderName.trim()}` : "Use a professional sign-off"}

Make it natural, human-sounding, and ready to send. Don't include placeholders like [Name] — use the actual names I provided or skip them naturally.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setGeneratedEmail(data.reply);
} catch (e) {
    setGeneratedEmail("Couldn't connect to Kai right now. Try again!");
}
setLoading(false);
};

const copyEmail = () => {
navigator.clipboard.writeText(generatedEmail);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const saveEmail = () => {
const newSaved = {
    id: Date.now(),
    type: emailType,
    context: context.trim(),
    email: generatedEmail,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
};
const updated = [newSaved, ...savedEmails].slice(0, 30);
setSavedEmails(updated);
localStorage.setItem("daylyft-emails", JSON.stringify(updated));
alert("Email saved!");
};

const saveName = (name) => {
setSenderName(name);
localStorage.setItem("daylyft-email-name", name);
};

const loadSavedEmail = (saved) => {
setGeneratedEmail(saved.email);
setShowSaved(false);
};

const deleteSavedEmail = (id) => {
const updated = savedEmails.filter((e) => e.id !== id);
setSavedEmails(updated);
localStorage.setItem("daylyft-emails", JSON.stringify(updated));
};

const regenerate = () => {
generateEmail();
};

const selectedType = emailTypes.find((t) => t.id === emailType);

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Email Templates</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Tell Kai what you need to say — get a perfectly written email ready to send</p>
    </div>
    <button onClick={() => setShowSaved(!showSaved)} style={{
        padding: "8px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: showSaved ? "rgba(16,185,129,0.1)" : "var(--fm-surface)",
        color: showSaved ? "var(--fm-accent-light)" : "var(--fm-muted)",
        fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showSaved ? "Write new" : `Saved (${savedEmails.length})`}</button>
    </div>

    {showSaved ? (
    <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Saved emails</div>
        {savedEmails.length === 0 ? (
        <div style={{
            textAlign: "center", padding: 40,
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
        }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✉️</div>
            <div style={{ fontSize: 14, color: "var(--fm-muted)" }}>No saved emails yet</div>
        </div>
        ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {savedEmails.map((saved) => {
            const typeInfo = emailTypes.find((t) => t.id === saved.type) || emailTypes[9];
            return (
                <div key={saved.id} onClick={() => loadSavedEmail(saved)} style={{
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 12, padding: 14, cursor: "pointer",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <span style={{ fontSize: 16 }}>{typeInfo.emoji}</span>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 250 }}>{saved.context}</div>
                        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{typeInfo.label} · {saved.date}</div>
                    </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "var(--fm-accent-light)" }}>View</span>
                    <div onClick={(e) => { e.stopPropagation(); deleteSavedEmail(saved.id); }} style={{ color: "var(--fm-muted)", padding: 2 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        )}
    </div>
    ) : (
    <div>
        {/* Generated Email Result */}
        {generatedEmail && (
        <div style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,206,201,0.05))",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: 16, padding: 24, marginBottom: 20,
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Your email is ready</span>
            </div>
            </div>

            <div style={{
            background: "var(--fm-surface)", borderRadius: 12, padding: 18,
            border: "1px solid var(--fm-border)", fontSize: 14, color: "var(--fm-text)",
            lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: 14,
            }}>
            {generatedEmail}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={copyEmail} style={{
                padding: "10px 20px", borderRadius: 10, border: "none",
                background: copied ? "rgba(0,206,201,0.15)" : "linear-gradient(135deg, #10b981, #34d399)",
                color: copied ? "#00CEC9" : "#fff",
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>{copied ? "✓ Copied!" : "Copy email"}</button>
            <button onClick={saveEmail} style={{
                padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(0,206,201,0.3)",
                background: "rgba(0,206,201,0.1)", color: "#00CEC9",
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>Save</button>
            <button onClick={regenerate} style={{
                padding: "10px 20px", borderRadius: 10, border: "1px solid var(--fm-border)",
                background: "transparent", color: "var(--fm-muted)",
                fontSize: 13, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>Regenerate</button>
            <button onClick={() => setGeneratedEmail("")} style={{
                padding: "10px 20px", borderRadius: 10, border: "1px solid var(--fm-border)",
                background: "transparent", color: "var(--fm-muted)",
                fontSize: 13, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>Write another</button>
            </div>
        </div>
        )}

        {/* Email Type */}
        {!generatedEmail && (
        <div>
            <div style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 14, padding: 18, marginBottom: 16,
            }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>What kind of email?</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 6 }}>
                {emailTypes.map((type) => (
                <button key={type.id} onClick={() => setEmailType(type.id)} style={{
                    padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                    border: emailType === type.id ? `1px solid ${type.color}40` : "1px solid var(--fm-border)",
                    background: emailType === type.id ? `${type.color}15` : "var(--fm-card)",
                    fontFamily: "Outfit, sans-serif", textAlign: "center",
                }}>
                    <div style={{ fontSize: 20, marginBottom: 2 }}>{type.emoji}</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: emailType === type.id ? type.color : "var(--fm-muted)" }}>{type.label}</div>
                </button>
                ))}
            </div>
            </div>

            {/* Examples */}
            {selectedType && (
            <div style={{
                background: `${selectedType.color}08`, border: `1px solid ${selectedType.color}20`,
                borderRadius: 12, padding: 14, marginBottom: 16,
            }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: selectedType.color, marginBottom: 8 }}>
                {selectedType.emoji} {selectedType.label} examples:
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {selectedType.examples.map((ex, i) => (
                    <span key={i} onClick={() => setContext(ex)} style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 8, cursor: "pointer",
                    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                    color: "var(--fm-muted)",
                    }}>{ex}</span>
                ))}
                </div>
            </div>
            )}

            {/* Context */}
            <div style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 14, padding: 18, marginBottom: 16,
            }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Tell Kai what you need</div>

            <textarea value={context} onChange={(e) => setContext(e.target.value)}
                placeholder="Describe the situation... e.g. 'I need to follow up with my manager about the project deadline we discussed last week. I want to ask for a 2-day extension.'"
                rows={4} style={{
                width: "100%", padding: "14px", borderRadius: 10, border: "1px solid var(--fm-border)",
                background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
                fontFamily: "Outfit, sans-serif", outline: "none", resize: "vertical",
                marginBottom: 12, boxSizing: "border-box", lineHeight: 1.7,
            }} />

            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 150 }}>
                <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Recipient (optional)</div>
                <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. John, HR Department..." style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
                    background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
                    fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
                }} />
                </div>
                <div style={{ flex: 1, minWidth: 150 }}>
                <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Your name</div>
                <input value={senderName} onChange={(e) => saveName(e.target.value)} placeholder="Your name for sign-off" style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
                    background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
                    fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
                }} />
                </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                <div>
                <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Tone</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {tones.map((t) => (
                    <button key={t.id} onClick={() => setTone(t.id)} style={{
                        padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                        border: tone === t.id ? "1px solid rgba(16,185,129,0.4)" : "1px solid var(--fm-border)",
                        background: tone === t.id ? "rgba(16,185,129,0.1)" : "var(--fm-card)",
                        color: tone === t.id ? "#10b981" : "var(--fm-muted)",
                        fontFamily: "Outfit, sans-serif",
                    }}>{t.emoji} {t.label}</button>
                    ))}
                </div>
                </div>
                <div>
                <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Length</div>
                <div style={{ display: "flex", gap: 4 }}>
                    {lengths.map((l) => (
                    <button key={l.id} onClick={() => setLength(l.id)} style={{
                        padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                        border: length === l.id ? "1px solid rgba(16,185,129,0.4)" : "1px solid var(--fm-border)",
                        background: length === l.id ? "rgba(16,185,129,0.1)" : "var(--fm-card)",
                        color: length === l.id ? "#10b981" : "var(--fm-muted)",
                        fontFamily: "Outfit, sans-serif",
                    }}>{l.label}</button>
                    ))}
                </div>
                </div>
            </div>

            <button onClick={generateEmail} disabled={loading} style={{
                width: "100%", padding: "14px", borderRadius: 14, border: "none",
                background: loading ? "var(--fm-muted)" : "linear-gradient(135deg, #10b981, #34d399)",
                color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
                {loading ? (
                <>
                    <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    Kai is writing your email...
                </>
                ) : (
                <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                    Generate Email
                </>
                )}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
        )}
    </div>
    )}
</div>
);
}