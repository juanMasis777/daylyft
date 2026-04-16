"use client";

import { useState } from "react";

const categories = [
  {
    id: "productivity",
    label: "Productivity",
    emoji: "✅",
    color: "#00CEC9",
    desc: "Tasks, Calendar, Pomodoro, Focus Shield, Goals",
    features: ["tasks", "calendar", "analytics", "pomodoro", "focus", "energy", "checklist", "goals"],
  },
  {
    id: "ai",
    label: "AI Copilot",
    emoji: "🤖",
    color: "#6C5CE7",
    desc: "Kai Chat, Autopilot, DNA, Wins, Night Report",
    features: ["chat", "autopilot", "dna", "wins", "nightreport", "wisdom", "decision", "emails"],
  },
  {
    id: "wellness",
    label: "Wellness",
    emoji: "🧘",
    color: "#74b9ff",
    desc: "Zen Mode, Water, Sleep, Stretching, Gratitude",
    features: ["zen", "water", "sleep", "stretching", "gratitude", "challenge"],
  },
  {
    id: "fitness",
    label: "Fitness",
    emoji: "🏋️",
    color: "#e17055",
    desc: "Workout Tracker, Energy Map, Daily Challenge",
    features: ["workout", "energy", "challenge", "stretching"],
  },
  {
    id: "finance",
    label: "Finance",
    emoji: "💰",
    color: "#00b894",
    desc: "Budget, Savings Goals, Bill Reminder",
    features: ["budget", "savings", "bills"],
  },
  {
    id: "life",
    label: "Life & Family",
    emoji: "👨‍👩‍👧",
    color: "#fd79a8",
    desc: "Journal, Habits, Family Mode, Balance Wheel",
    features: ["journal", "habits", "balance", "family", "gifts"],
  },
  {
    id: "learning",
    label: "Learning",
    emoji: "📚",
    color: "#fdcb6e",
    desc: "Flashcards, Reading List, Notes, Ideas, Links",
    features: ["notes", "ideas", "reading", "flashcards", "links", "countdown"],
  },
];

export default function Onboarding({ onComplete, userName }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(userName || "");
  const [selected, setSelected] = useState([]);

  const toggleCategory = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const finish = () => {
    const selectedFeatures = new Set(["dashboard", "settings"]);
    selected.forEach((catId) => {
      const cat = categories.find((c) => c.id === catId);
      if (cat) cat.features.forEach((f) => selectedFeatures.add(f));
    });

    const prefs = {
      name: name.trim(),
      categories: selected,
      features: Array.from(selectedFeatures),
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem("daylyft-onboarding", JSON.stringify(prefs));
    if (onComplete) onComplete(prefs);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "#0a0a12", zIndex: 99998,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Outfit', sans-serif", overflow: "auto",
    }}>
      <style>{`
        @keyframes obFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes obPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.3; } }
        @keyframes obGlow { 0%, 100% { box-shadow: 0 0 20px rgba(108,92,231,0.3); } 50% { box-shadow: 0 0 40px rgba(108,92,231,0.5); } }
        @keyframes obBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>

      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, #6C5CE7 0%, transparent 70%)",
        top: -100, left: -100, opacity: 0.1, filter: "blur(80px)",
        animation: "obPulse 5s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, #00CEC9 0%, transparent 70%)",
        bottom: -100, right: -100, opacity: 0.1, filter: "blur(80px)",
        animation: "obPulse 5s ease-in-out infinite 2s",
      }} />

      <div style={{
        position: "relative", zIndex: 10, width: "100%", maxWidth: 520,
        padding: "40px 24px", animation: "obFadeUp 0.6s ease",
      }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 40, justifyContent: "center" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{
              width: s === step ? 40 : 12, height: 6, borderRadius: 3,
              background: s <= step ? "#6C5CE7" : "rgba(255,255,255,0.1)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {step === 1 && (
          <div style={{ textAlign: "center", animation: "obFadeUp 0.5s ease" }}>
            <div style={{
              width: 80, height: 80, borderRadius: 22, margin: "0 auto 20px",
              background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "obGlow 3s ease-in-out infinite",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
              </svg>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Hey! I'm Kai</h1>
            <p style={{ fontSize: 16, color: "#6c6c80", margin: "0 0 32px", lineHeight: 1.6 }}>
              Your AI copilot. Let me personalize<br />DayLyft for you. Takes 30 seconds.
            </p>
            <div style={{ maxWidth: 360, margin: "0 auto", textAlign: "left" }}>
              <label style={{ fontSize: 13, color: "#6c6c80", marginBottom: 8, display: "block", fontWeight: 500 }}>What's your name?</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(2)}
                placeholder="e.g. Juan" autoFocus
                style={{
                  width: "100%", padding: "16px 18px", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
                  color: "#e8e8f0", fontSize: 18, fontWeight: 600,
                  fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <button onClick={() => name.trim() && setStep(2)} disabled={!name.trim()} style={{
              marginTop: 24, padding: "14px 40px", borderRadius: 14, border: "none",
              background: name.trim() ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "rgba(255,255,255,0.06)",
              color: name.trim() ? "#fff" : "#6c6c80",
              fontSize: 16, fontWeight: 700, cursor: name.trim() ? "pointer" : "not-allowed",
              fontFamily: "Outfit, sans-serif", display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: "obFadeUp 0.5s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>What matters to you, {name.split(" ")[0]}?</h2>
              <p style={{ fontSize: 14, color: "#6c6c80", margin: 0 }}>Pick the areas you care about. You can change this anytime.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 20 }}>
              {categories.map((cat) => {
                const isSelected = selected.includes(cat.id);
                return (
                  <div key={cat.id} onClick={() => toggleCategory(cat.id)} style={{
                    padding: "18px 16px", borderRadius: 16, cursor: "pointer",
                    background: isSelected ? `${cat.color}12` : "rgba(255,255,255,0.03)",
                    border: isSelected ? `2px solid ${cat.color}50` : "2px solid rgba(255,255,255,0.06)",
                    transition: "all 0.2s ease", display: "flex", alignItems: "flex-start", gap: 14,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: isSelected ? `${cat.color}25` : "rgba(255,255,255,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24, transform: isSelected ? "scale(1.1)" : "scale(1)",
                    }}>{cat.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: isSelected ? cat.color : "#e8e8f0", marginBottom: 2 }}>{cat.label}</div>
                      <div style={{ fontSize: 11, color: "#6c6c80", lineHeight: 1.5 }}>{cat.desc}</div>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                      border: isSelected ? `2px solid ${cat.color}` : "2px solid rgba(255,255,255,0.15)",
                      background: isSelected ? cat.color : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#6c6c80", marginBottom: 16 }}>
                {selected.length === 0 ? "Select at least 1 category" : `${selected.length} selected — you can always add more later`}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => setStep(1)} style={{
                  padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent", color: "#6c6c80", fontSize: 14, cursor: "pointer", fontFamily: "Outfit, sans-serif",
                }}>Back</button>
                <button onClick={() => selected.length > 0 && setStep(3)} disabled={selected.length === 0} style={{
                  padding: "12px 32px", borderRadius: 12, border: "none",
                  background: selected.length > 0 ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "rgba(255,255,255,0.06)",
                  color: selected.length > 0 ? "#fff" : "#6c6c80",
                  fontSize: 14, fontWeight: 700, cursor: selected.length > 0 ? "pointer" : "not-allowed",
                  fontFamily: "Outfit, sans-serif", display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", animation: "obFadeUp 0.5s ease" }}>
            <div style={{ fontSize: 64, marginBottom: 16, animation: "obBounce 1s ease-in-out infinite" }}>🚀</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>You're all set, {name.split(" ")[0]}!</h2>
            <p style={{ fontSize: 16, color: "#6c6c80", margin: "0 0 24px", lineHeight: 1.6 }}>
              Kai has personalized your DayLyft with<br />
              <span style={{ color: "#a29bfe", fontWeight: 600 }}>{selected.length} categories</span> and{" "}
              <span style={{ color: "#00CEC9", fontWeight: 600 }}>
                {new Set(selected.flatMap((id) => categories.find((c) => c.id === id)?.features || [])).size + 2} features
              </span>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 400, margin: "0 auto 32px" }}>
              {selected.map((id) => {
                const cat = categories.find((c) => c.id === id);
                return (
                  <span key={id} style={{
                    padding: "6px 14px", borderRadius: 10,
                    background: `${cat.color}15`, border: `1px solid ${cat.color}30`,
                    color: cat.color, fontSize: 13, fontWeight: 600,
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 16 }}>{cat.emoji}</span>{cat.label}
                  </span>
                );
              })}
            </div>
            <div style={{
              background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
              borderRadius: 16, padding: 20, maxWidth: 400, margin: "0 auto 32px", textAlign: "left",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#a29bfe" }}>Kai says</span>
              </div>
              <p style={{ fontSize: 14, color: "#e8e8f0", lineHeight: 1.7, margin: 0 }}>
                Hey {name.split(" ")[0]}! I've set up your DayLyft based on what matters to you. Your sidebar will show only the features you chose. You can always discover more in the sidebar. Let's get started!
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setStep(2)} style={{
                padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent", color: "#6c6c80", fontSize: 14, cursor: "pointer", fontFamily: "Outfit, sans-serif",
              }}>Back</button>
              <button onClick={finish} style={{
                padding: "14px 40px", borderRadius: 14, border: "none",
                background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
                fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
                display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: "0 8px 30px rgba(108,92,231,0.4)",
              }}>
                Launch my DayLyft
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}