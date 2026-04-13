"use client";

import { useState, useEffect } from "react";

const challenges = [
{ id: 1, title: "Talk to a stranger", desc: "Start a friendly conversation with someone you don't know — at a coffee shop, store, or park.", category: "Social", emoji: "👋", color: "#6C5CE7", difficulty: "Medium" },
{ id: 2, title: "No social media today", desc: "Delete social media apps from your home screen and don't check them for 24 hours.", category: "Digital Wellness", emoji: "📵", color: "#ff6b6b", difficulty: "Hard" },
{ id: 3, title: "Walk 10,000 steps", desc: "Track your steps today and hit 10,000. Take the stairs, walk during calls, explore a new route.", category: "Health", emoji: "🚶", color: "#00CEC9", difficulty: "Medium" },
{ id: 4, title: "Write a thank you message", desc: "Send a genuine thank you message to someone who has positively impacted your life.", category: "Social", emoji: "💌", color: "#fd79a8", difficulty: "Easy" },
{ id: 5, title: "Learn something new in 30 min", desc: "Watch a tutorial, read an article, or take a mini-course about something you've been curious about.", category: "Growth", emoji: "📚", color: "#a29bfe", difficulty: "Easy" },
{ id: 6, title: "Cook a meal from scratch", desc: "No takeout, no microwave meals. Cook a full meal using fresh ingredients.", category: "Health", emoji: "🍳", color: "#e17055", difficulty: "Medium" },
{ id: 7, title: "Meditate for 15 minutes", desc: "Find a quiet spot, close your eyes, and focus on your breathing for 15 uninterrupted minutes.", category: "Mindfulness", emoji: "🧘", color: "#00b894", difficulty: "Easy" },
{ id: 8, title: "Compliment 5 people", desc: "Give genuine, specific compliments to 5 different people today. Make their day.", category: "Social", emoji: "😊", color: "#fdcb6e", difficulty: "Easy" },
{ id: 9, title: "Cold shower", desc: "End your shower with 30 seconds of cold water. Builds mental toughness and boosts energy.", category: "Health", emoji: "🥶", color: "#74b9ff", difficulty: "Hard" },
{ id: 10, title: "Organize one space", desc: "Pick one area — desk, closet, drawer, phone — and organize it completely.", category: "Productivity", emoji: "🧹", color: "#55efc4", difficulty: "Easy" },
{ id: 11, title: "Read for 30 minutes", desc: "Put your phone away and read a physical book or e-reader for 30 minutes straight.", category: "Growth", emoji: "📖", color: "#a29bfe", difficulty: "Easy" },
{ id: 12, title: "Do 50 push-ups", desc: "Spread them throughout the day if needed. 10 in the morning, 10 at lunch, etc.", category: "Health", emoji: "💪", color: "#e17055", difficulty: "Medium" },
{ id: 13, title: "Write your goals for this month", desc: "Sit down and write 3-5 specific, measurable goals for this month. Put them where you'll see them.", category: "Productivity", emoji: "🎯", color: "#6C5CE7", difficulty: "Easy" },
{ id: 14, title: "No complaining for 24 hours", desc: "Every time you catch yourself about to complain, replace it with something positive or a solution.", category: "Mindfulness", emoji: "🤐", color: "#fdcb6e", difficulty: "Hard" },
{ id: 15, title: "Call someone you haven't talked to in months", desc: "Reconnect with an old friend or family member. A real phone call, not a text.", category: "Social", emoji: "📞", color: "#fd79a8", difficulty: "Medium" },
{ id: 16, title: "Try a new food", desc: "Order something you've never tried before at a restaurant or cook a recipe from a different culture.", category: "Growth", emoji: "🍜", color: "#00CEC9", difficulty: "Easy" },
{ id: 17, title: "Write a letter to your future self", desc: "Write a letter to yourself 1 year from now. What do you want to have accomplished?", category: "Growth", emoji: "✉️", color: "#a29bfe", difficulty: "Easy" },
{ id: 18, title: "No caffeine today", desc: "Skip the coffee, energy drinks, and tea. Drink water instead and notice how you feel.", category: "Health", emoji: "☕", color: "#e17055", difficulty: "Hard" },
{ id: 19, title: "Take a photo walk", desc: "Go for a 20-minute walk with your phone camera and take 10 interesting photos of things you normally overlook.", category: "Mindfulness", emoji: "📸", color: "#74b9ff", difficulty: "Easy" },
{ id: 20, title: "Do one thing that scares you", desc: "Identify something small that makes you uncomfortable and do it. Growth lives outside your comfort zone.", category: "Growth", emoji: "🦁", color: "#ff6b6b", difficulty: "Hard" },
{ id: 21, title: "Wake up 1 hour earlier", desc: "Set your alarm 1 hour earlier than usual and use that time for yourself — exercise, read, or plan your day.", category: "Productivity", emoji: "⏰", color: "#fdcb6e", difficulty: "Medium" },
{ id: 22, title: "Donate or give away 5 items", desc: "Find 5 things you no longer need and donate them or give them to someone who could use them.", category: "Mindfulness", emoji: "🎁", color: "#00b894", difficulty: "Easy" },
{ id: 23, title: "Spend 1 hour in nature", desc: "Go to a park, beach, trail, or garden and spend 1 hour without your phone.", category: "Mindfulness", emoji: "🌿", color: "#55efc4", difficulty: "Easy" },
{ id: 24, title: "Create something", desc: "Draw, write a poem, build something, compose music — create anything from scratch.", category: "Growth", emoji: "🎨", color: "#fd79a8", difficulty: "Medium" },
{ id: 25, title: "Drink 3 liters of water", desc: "Track every glass and hit 3 liters by the end of the day. Your body will thank you.", category: "Health", emoji: "💧", color: "#74b9ff", difficulty: "Medium" },
{ id: 26, title: "Teach someone something", desc: "Share a skill or knowledge with a friend, coworker, or family member.", category: "Social", emoji: "🎓", color: "#6C5CE7", difficulty: "Easy" },
{ id: 27, title: "No screens after 9 PM", desc: "Turn off all screens at 9 PM. Read, stretch, talk, or just rest.", category: "Digital Wellness", emoji: "🌙", color: "#a29bfe", difficulty: "Medium" },
{ id: 28, title: "Do a random act of kindness", desc: "Pay for someone's coffee, hold the door, leave a generous tip, or help someone carry their bags.", category: "Social", emoji: "❤️", color: "#ff6b6b", difficulty: "Easy" },
];

export default function ChallengePage() {
const [todayChallenge, setTodayChallenge] = useState(null);
const [completed, setCompleted] = useState(false);
const [streak, setStreak] = useState(0);
const [totalCompleted, setTotalCompleted] = useState(0);
const [history, setHistory] = useState([]);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);
const [showHistory, setShowHistory] = useState(false);

const today = new Date().toDateString();

useEffect(() => {
loadData();
}, []);

const loadData = () => {
const saved = localStorage.getItem("daylyft-challenge");
if (saved) {
    const parsed = JSON.parse(saved);
    setHistory(parsed.history || []);
    setTotalCompleted(parsed.totalCompleted || 0);

    if (parsed.todayDate === today) {
    setTodayChallenge(parsed.todayChallenge);
    setCompleted(parsed.completed || false);
    } else {
    generateTodayChallenge(parsed.history || []);
    }

    if (parsed.streak) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (parsed.lastCompletedDate === yesterday.toDateString() || parsed.lastCompletedDate === today) {
        setStreak(parsed.streak);
    }
    }
} else {
    generateTodayChallenge([]);
}
};

const generateTodayChallenge = (pastHistory) => {
const recentIds = pastHistory.slice(0, 7).map((h) => h.id);
const available = challenges.filter((c) => !recentIds.includes(c.id));
const pool = available.length > 0 ? available : challenges;
const dayIndex = new Date().getDate() + new Date().getMonth();
const challenge = pool[dayIndex % pool.length];
setTodayChallenge(challenge);

const current = localStorage.getItem("daylyft-challenge");
const parsed = current ? JSON.parse(current) : {};
localStorage.setItem("daylyft-challenge", JSON.stringify({
    ...parsed,
    todayDate: today,
    todayChallenge: challenge,
    completed: false,
}));
};

const completeChallenge = () => {
setCompleted(true);
const newTotal = totalCompleted + 1;
const newStreak = streak + 1;
const newHistory = [{ ...todayChallenge, date: today, dayLabel: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) }, ...history];

setTotalCompleted(newTotal);
setStreak(newStreak);
setHistory(newHistory);

localStorage.setItem("daylyft-challenge", JSON.stringify({
    todayDate: today,
    todayChallenge,
    completed: true,
    totalCompleted: newTotal,
    streak: newStreak,
    lastCompletedDate: today,
    history: newHistory,
}));
};

const skipChallenge = () => {
const recentIds = history.slice(0, 7).map((h) => h.id);
const available = challenges.filter((c) => !recentIds.includes(c.id) && c.id !== todayChallenge?.id);
const pool = available.length > 0 ? available : challenges;
const newChallenge = pool[Math.floor(Math.random() * pool.length)];
setTodayChallenge(newChallenge);
setKaiMessage("");

const current = JSON.parse(localStorage.getItem("daylyft-challenge") || "{}");
localStorage.setItem("daylyft-challenge", JSON.stringify({
    ...current,
    todayChallenge: newChallenge,
}));
};

const getKaiMotivation = async () => {
if (!todayChallenge) return;
setGeneratingKai(true);

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Today's challenge is: "${todayChallenge.title}" — ${todayChallenge.desc}. Category: ${todayChallenge.category}. Difficulty: ${todayChallenge.difficulty}. The user has completed ${totalCompleted} challenges total with a ${streak}-day streak. Give me: 1) A short motivating message for why this challenge matters, 2) One practical tip to make it easier, 3) What they'll gain from doing it. Keep it energetic, concise, and personal.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) {
    setKaiMessage("Couldn't connect to Kai right now.");
}
setGeneratingKai(false);
};

const getDifficultyColor = (d) => {
if (d === "Easy") return "#00CEC9";
if (d === "Medium") return "#fdcb6e";
return "#ff6b6b";
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Daily Challenge</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Push your limits with a new challenge every day — grow beyond your comfort zone</p>
    </div>
    <button onClick={() => setShowHistory(!showHistory)} style={{
        padding: "8px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: showHistory ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
        color: showHistory ? "var(--fm-accent-light)" : "var(--fm-muted)",
        fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showHistory ? "Today" : `History (${totalCompleted})`}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completed</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{totalCompleted}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>challenges</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
        {streak >= 7 && <div style={{ fontSize: 10, color: "#00CEC9" }}>On fire!</div>}
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Today</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: completed ? "#00CEC9" : "var(--fm-warning)" }}>{completed ? "✓" : "→"}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{completed ? "Done!" : "Active"}</div>
    </div>
    </div>

    {showHistory ? (
    <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Completed challenges</div>
        {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎲</div>
            <div style={{ fontSize: 14, color: "var(--fm-muted)" }}>No completed challenges yet. Start today!</div>
        </div>
        ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map((h, i) => (
            <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12,
            }}>
                <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${h.color}15`, border: `1px solid ${h.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>{h.emoji}</div>
                <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{h.title}</div>
                <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{h.dayLabel} · {h.category}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            ))}
        </div>
        )}
    </div>
    ) : todayChallenge && (
    <div>
        {/* Challenge Card */}
        <div style={{
        background: completed
            ? "linear-gradient(135deg, rgba(0,206,201,0.1), rgba(85,239,196,0.06))"
            : `linear-gradient(135deg, ${todayChallenge.color}12, ${todayChallenge.color}06)`,
        border: `1px solid ${completed ? "rgba(0,206,201,0.25)" : todayChallenge.color + "30"}`,
        borderRadius: 20, padding: 28, marginBottom: 20, textAlign: "center",
        }}>
        {completed && <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>}
        <div style={{ fontSize: 48, marginBottom: 12 }}>{todayChallenge.emoji}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
            <span style={{
            fontSize: 10, padding: "3px 10px", borderRadius: 10,
            background: `${todayChallenge.color}15`, color: todayChallenge.color,
            border: `1px solid ${todayChallenge.color}30`,
            }}>{todayChallenge.category}</span>
            <span style={{
            fontSize: 10, padding: "3px 10px", borderRadius: 10,
            background: `${getDifficultyColor(todayChallenge.difficulty)}15`,
            color: getDifficultyColor(todayChallenge.difficulty),
            border: `1px solid ${getDifficultyColor(todayChallenge.difficulty)}30`,
            }}>{todayChallenge.difficulty}</span>
        </div>
        <h3 style={{
            fontSize: 22, fontWeight: 700, marginBottom: 8,
            color: completed ? "#00CEC9" : "var(--fm-text)",
            textDecoration: completed ? "line-through" : "none",
        }}>{todayChallenge.title}</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 20px" }}>
            {todayChallenge.desc}
        </p>

        {completed ? (
            <div style={{ fontSize: 16, fontWeight: 600, color: "#00CEC9" }}>
            Challenge completed! You're amazing!
            </div>
        ) : (
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={completeChallenge} style={{
                padding: "14px 32px", borderRadius: 14, border: "none",
                background: `linear-gradient(135deg, ${todayChallenge.color}, ${todayChallenge.color}aa)`,
                color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "Outfit, sans-serif",
                display: "flex", alignItems: "center", gap: 8,
            }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                I did it!
            </button>
            <button onClick={skipChallenge} style={{
                padding: "14px 24px", borderRadius: 14,
                border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
                color: "var(--fm-muted)", fontSize: 14, fontWeight: 500,
                cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>Give me another one</button>
            </div>
        )}
        </div>

        {/* Kai Motivation */}
        {kaiMessage ? (
        <div style={{
            background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
            borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's motivation</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
        ) : (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button onClick={getKaiMotivation} disabled={generatingKai} style={{
            padding: "12px 24px", borderRadius: 12, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
            }}>
            {generatingKai ? (
                <>
                <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is motivating you...
                </>
            ) : (
                <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's motivation
                </>
            )}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        )}

        {/* How challenges help */}
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Why daily challenges matter</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🧠</span>
            <span style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6 }}>Builds mental toughness by pushing you outside your comfort zone</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>📈</span>
            <span style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6 }}>Creates momentum — small wins compound into big life changes</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🎯</span>
            <span style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6 }}>Covers all areas: health, social, growth, mindfulness, and productivity</span>
            </div>
        </div>
        </div>
    </div>
    )}
</div>
);
}