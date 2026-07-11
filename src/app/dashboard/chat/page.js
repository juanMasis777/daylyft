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
    setMessages((prev) => [...prev, { role: "kai", text: "Sorry, I couldn't connect. Please check your internet connection.", time: "Just now" }]);
} finally {
    setTyping(false);
}
};

const handleSend = () => {
if (input.trim()) {
    sendMessage(input);
}
};

return (
<div style={{ display: "flex", flexDirection: "column", height: "calc(100dvh - 220px)" }}>
    <div style={{ marginBottom: 10 }}>
    <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Ask Kai</h2>
    <p style={{ fontSize: 12, color: "var(--fm-muted)", margin: "2px 0 0" }}>Ask Kai anything — your AI copilot for productivity, wellness, and life advice</p>
    </div>

    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8, minHeight: 0 }}>
    {messages.map((msg, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: msg.role === "user" ? "flex-end" : "flex-start", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
        {msg.role === "kai" && (
            <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
        )}
        <div style={{
            maxWidth: "80%", padding: "10px 14px",
            borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            background: msg.role === "user" ? "var(--fm-accent)" : "var(--fm-surface)",
            border: msg.role === "user" ? "none" : "1px solid var(--fm-border)",
            color: msg.role === "user" ? "#fff" : "var(--fm-text)",
            fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line",
        }}>
            {msg.text}
        </div>
        </div>
    ))}
    {typing && (
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <div style={{ padding: "10px 16px", borderRadius: "14px 14px 14px 4px", background: "var(--fm-surface)", border: "1px solid var(--fm-border)", color: "var(--fm-accent-light)", fontSize: 13 }}>
            Kai is thinking...
        </div>
        </div>
    )}
    <div ref={bottomRef} />
    </div>

    {messages.length <= 1 && (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        {suggestions.map((s, i) => (
        <button key={i} onPointerDown={(e) => { e.preventDefault(); sendMessage(s); }} style={{
            padding: "6px 12px", borderRadius: 16, fontSize: 11, fontWeight: 500,
            border: "1px solid var(--fm-border)", background: "var(--fm-card)",
            color: "var(--fm-text)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{s}</button>
        ))}
    </div>
    )}

    <div style={{ display: "flex", gap: 8, paddingTop: 8, flexShrink: 0 }}>
    <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        style={{ display: "flex", gap: 8, flex: 1 }}
    >
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Talk to Kai..."
        enterKeyHint="send"
        style={{
            flex: 1, padding: "12px 14px", borderRadius: 12,
            border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
            color: "var(--fm-text)", fontSize: 16, fontFamily: "Outfit, sans-serif", outline: "none",
        }}
        />
        <button
        type="submit"
        disabled={typing}
        style={{
            width: 44, height: 44, borderRadius: 12, border: "none",
            background: typing ? "var(--fm-muted)" : "linear-gradient(135deg, #10b981, #34d399)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: typing ? "not-allowed" : "pointer", flexShrink: 0,
            WebkitTapHighlightColor: "transparent",
        }}
        >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        </button>
    </form>
    </div>
</div>
);
}