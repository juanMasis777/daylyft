"use client";

import { useState, useRef, useEffect } from "react";

const initialMessages = [
{
role: "kai",
text: "Hey! I'm Kai, your AI copilot. I can help you organize your day, manage tasks, boost your productivity, or just have a conversation. What do you need?",
time: "Just now",
},
];

const suggestions = [
"Plan my day for tomorrow",
"Give me 3 productivity tips",
"How can I avoid burnout?",
"Help me prioritize my tasks",
"What should I work on right now?",
"Create a morning routine for me",
];

export default function ChatPage() {
const [messages, setMessages] = useState(initialMessages);
const [input, setInput] = useState("");
const [typing, setTyping] = useState(false);
const bottomRef = useRef(null);

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, typing]);

const sendMessage = async (text) => {
if (!text.trim() || typing) return;
const userMsg = { role: "user", text: text.trim(), time: "Just now" };
setMessages((prev) => [...prev, userMsg]);
setInput("");
setTyping(true);

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: text.trim(),
        history: messages.filter((m) => m.role !== "system"),
    }),
    });

    const data = await response.json();

    if (data.error) {
    setMessages((prev) => [...prev, { role: "kai", text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.", time: "Just now" }]);
    } else {
    setMessages((prev) => [...prev, { role: "kai", text: data.reply, time: "Just now" }]);
    }
} catch (error) {
    setMessages((prev) => [...prev, { role: "kai", text: "Sorry, I couldn't connect. Please check your internet connection and try again.", time: "Just now" }]);
} finally {
    setTyping(false);
}
};

return (
<div style={{ animation: "fadeIn 0.5s ease", display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Ask Kai</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Your AI copilot — powered by real intelligence</p>
    </div>

    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 16 }}>
    {messages.map((msg, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: msg.role === "user" ? "flex-end" : "flex-start", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
        {msg.role === "kai" && (
            <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
        )}
        <div style={{
            maxWidth: "75%", padding: "12px 16px",
            borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            background: msg.role === "user" ? "var(--fm-accent)" : "var(--fm-surface)",
            border: msg.role === "user" ? "none" : "1px solid var(--fm-border)",
            color: msg.role === "user" ? "#fff" : "var(--fm-text)",
            fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line",
        }}>
            {msg.text}
        </div>
        </div>
    ))}
    {typing && (
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <div style={{ padding: "12px 20px", borderRadius: "16px 16px 16px 4px", background: "var(--fm-surface)", border: "1px solid var(--fm-border)", color: "var(--fm-accent-light)", fontSize: 14 }}>
            Kai is thinking...
        </div>
        </div>
    )}
    <div ref={bottomRef} />
    </div>

    {messages.length <= 1 && (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {suggestions.map((s, i) => (
        <button key={i} onClick={() => sendMessage(s)} style={{
            padding: "8px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            border: "1px solid var(--fm-border)", background: "var(--fm-card)",
            color: "var(--fm-text)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{s}</button>
        ))}
    </div>
    )}

    <div style={{ display: "flex", gap: 8 }}>
    <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        placeholder="Talk to Kai..."
        style={{
        flex: 1, padding: "14px 18px", borderRadius: 14,
        border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
        color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none",
        }}
    />
    <button
        onClick={() => sendMessage(input)}
        disabled={typing}
        style={{
        width: 48, height: 48, borderRadius: 14, border: "none",
        background: typing ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: typing ? "not-allowed" : "pointer", flexShrink: 0,
        }}
    >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    </button>
    </div>
</div>
);
}