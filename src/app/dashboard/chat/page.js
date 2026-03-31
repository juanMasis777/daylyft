"use client";

import { useState, useRef, useEffect } from "react";

const initialMessages = [
{
role: "kai",
text: "Hey Juan! I'm Kai, your AI copilot. Ask me anything — I can organize your day, add tasks, analyze your productivity, or just have a conversation. What do you need?",
time: "Just now",
},
];

const suggestions = [
"Optimize my Wednesday",
"Add a task for tomorrow",
"How productive was I this week?",
"Schedule a focus block",
"What should I work on right now?",
"Plan my week",
];

export default function ChatPage() {
const [messages, setMessages] = useState(initialMessages);
const [input, setInput] = useState("");
const [typing, setTyping] = useState(false);
const bottomRef = useRef(null);

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, typing]);

const kaiResponses = {
optimize: "I've analyzed your Wednesday. Here's what I'd change:\n\n• Move 'Design review' to 10am — that's your creative peak\n• Add a 15-min buffer before your 2pm client call\n• Block 3-4pm for deep work (your second energy peak)\n• Move 'Reply to emails' to 4:30pm when energy dips\n\nWant me to apply these changes?",
task: "Done! I've added a new task for tomorrow. Here's what I set:\n\n• Title: New task\n• Priority: Medium\n• Time: 9:00 AM (your first available slot)\n\nWant me to change anything about it?",
productive: "Here's your week so far:\n\n• Tasks completed: 23 of 28 (82%)\n• Focus hours: 18.4h (up 12% from last week)\n• Best day: Tuesday (94% productivity)\n• Worst day: Monday (68% — you had 4 meetings)\n\nMy suggestion: Try to keep Mondays lighter on meetings. Your data shows you're 31% more productive on meeting-free mornings.",
focus: "I found the perfect slot for a focus block:\n\n• Tomorrow, 9:30 AM - 11:30 AM\n• No meetings conflict\n• That's your peak creative window\n• I'll activate Focus Shield to auto-reply to messages\n\nShould I block it?",
work: "Based on your priorities and deadlines, here's what I recommend right now:\n\n1. Finish the Q2 proposal (due tomorrow, 70% done)\n2. Review the design mockups (quick win, 15 min)\n3. Respond to Sarah's email (she's waiting since yesterday)\n\nThe proposal is the most impactful. Want me to block the next 2 hours for it?",
plan: "Here's my suggested plan for your week:\n\nMonday: Admin + team standup + light tasks\nTuesday: Deep creative work (your peak day)\nWednesday: Client meetings + follow-ups\nThursday: Project work + 1:1s\nFriday: Review + planning + early wrap-up\n\nI've left Friday afternoon free because your data shows you're 40% less productive after 3pm on Fridays. Want me to schedule this?",
default: "That's a great question! Right now I'm running on demo mode, but once I'm connected to the real AI engine, I'll be able to handle anything you throw at me — from reorganizing your entire week to having a deep conversation about your productivity patterns. Stay tuned!",
};

const getResponse = (text) => {
const lower = text.toLowerCase();
if (lower.includes("optimize") || lower.includes("reorganize")) return kaiResponses.optimize;
if (lower.includes("add") && lower.includes("task")) return kaiResponses.task;
if (lower.includes("productive") || (lower.includes("week") && lower.includes("how"))) return kaiResponses.productive;
if (lower.includes("focus") || lower.includes("block")) return kaiResponses.focus;
if (lower.includes("work on") || lower.includes("should i") || lower.includes("right now")) return kaiResponses.work;
if (lower.includes("plan") && lower.includes("week")) return kaiResponses.plan;
return kaiResponses.default;
};

const sendMessage = (text) => {
if (!text.trim()) return;
const userMsg = { role: "user", text: text.trim(), time: "Just now" };
setMessages((prev) => [...prev, userMsg]);
setInput("");
setTyping(true);

setTimeout(() => {
    const response = getResponse(text);
    setMessages((prev) => [...prev, { role: "kai", text: response, time: "Just now" }]);
    setTyping(false);
}, 1200 + Math.random() * 800);
};

return (
<div style={{ animation: "fadeIn 0.5s ease", display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Ask Kai</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Your AI copilot — talk naturally, get things done</p>
    </div>

    {/* Chat messages */}
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 16 }}>
    {messages.map((msg, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: msg.role === "user" ? "flex-end" : "flex-start", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
        {msg.role === "kai" && (
            <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
            </div>
        )}
        <div style={{
            maxWidth: "75%",
            padding: "12px 16px",
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
        <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
        </div>
        <div style={{
            padding: "12px 20px", borderRadius: "16px 16px 16px 4px",
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            color: "var(--fm-accent-light)", fontSize: 14,
        }}>
            Kai is thinking...
        </div>
        </div>
    )}
    <div ref={bottomRef} />
    </div>

    {/* Suggestions */}
    {messages.length <= 1 && (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {suggestions.map((s, i) => (
        <button
            key={i}
            onClick={() => sendMessage(s)}
            style={{
            padding: "8px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            border: "1px solid var(--fm-border)", background: "var(--fm-card)",
            color: "var(--fm-text)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}
        >{s}</button>
        ))}
    </div>
    )}

    {/* Input */}
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
        style={{
        width: 48, height: 48, borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
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