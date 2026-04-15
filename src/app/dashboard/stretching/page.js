"use client";

import { useState, useEffect } from "react";

const routines = [
{
id: "morning",
name: "Morning Wake-Up",
emoji: "🌅",
color: "#fdcb6e",
duration: "5 min",
description: "Gentle stretches to start your day with energy",
stretches: [
    { name: "Neck Rolls", duration: 30, instruction: "Slowly roll your head in a circle, 5 times each direction. Keep your shoulders relaxed.", muscle: "Neck" },
    { name: "Shoulder Shrugs", duration: 20, instruction: "Raise both shoulders to your ears, hold 2 seconds, release. Repeat 10 times.", muscle: "Shoulders" },
    { name: "Standing Side Stretch", duration: 30, instruction: "Raise your right arm overhead and lean left. Hold 15 seconds, then switch sides.", muscle: "Obliques" },
    { name: "Forward Fold", duration: 30, instruction: "Stand with feet hip-width apart, bend forward and let your arms hang. Relax your neck.", muscle: "Hamstrings" },
    { name: "Cat-Cow Stretch", duration: 40, instruction: "On hands and knees, arch your back up (cat), then dip it down (cow). Repeat 8 times slowly.", muscle: "Spine" },
    { name: "Child's Pose", duration: 30, instruction: "Kneel and sit back on your heels, arms extended forward on the floor. Breathe deeply.", muscle: "Back" },
    { name: "Standing Quad Stretch", duration: 30, instruction: "Stand on one leg, pull your other foot to your glutes. Hold 15 seconds each side.", muscle: "Quads" },
    { name: "Deep Breathing", duration: 30, instruction: "Stand tall, inhale deeply for 4 counts, hold 4 counts, exhale 4 counts. Repeat 3 times.", muscle: "Full Body" },
],
},
{
id: "desk",
name: "Desk Break",
emoji: "💻",
color: "#6C5CE7",
duration: "5 min",
description: "Quick stretches you can do at your desk without standing up",
stretches: [
    { name: "Neck Side Tilt", duration: 30, instruction: "Tilt your head to the right, bringing your ear toward your shoulder. Hold 15 seconds each side.", muscle: "Neck" },
    { name: "Chest Opener", duration: 30, instruction: "Clasp your hands behind your back, squeeze your shoulder blades together and lift your chest.", muscle: "Chest" },
    { name: "Seated Spinal Twist", duration: 30, instruction: "Sit tall, place your right hand on your left knee and twist gently. Hold 15 seconds each side.", muscle: "Spine" },
    { name: "Wrist Circles", duration: 20, instruction: "Extend your arms and rotate your wrists in circles. 10 times each direction.", muscle: "Wrists" },
    { name: "Seated Figure Four", duration: 30, instruction: "Cross your right ankle over your left knee, press the right knee gently down. Switch sides.", muscle: "Hips" },
    { name: "Shoulder Rolls", duration: 20, instruction: "Roll your shoulders forward 10 times, then backward 10 times. Keep movements slow.", muscle: "Shoulders" },
    { name: "Eye Rest", duration: 20, instruction: "Close your eyes, look up, down, left, right with eyes closed. Then rub palms together and place over eyes.", muscle: "Eyes" },
    { name: "Deep Breath Reset", duration: 20, instruction: "Sit tall, breathe in for 4 counts through your nose, out for 6 counts through your mouth. Repeat 3 times.", muscle: "Full Body" },
],
},
{
id: "postworkout",
name: "Post-Workout Cool Down",
emoji: "🏋️",
color: "#ff6b6b",
duration: "7 min",
description: "Essential stretches after exercise to prevent soreness",
stretches: [
    { name: "Standing Hamstring Stretch", duration: 40, instruction: "Place one heel on a low surface, lean forward with a straight back. Hold 20 seconds each leg.", muscle: "Hamstrings" },
    { name: "Hip Flexor Lunge", duration: 40, instruction: "Step into a deep lunge, push your hips forward. Hold 20 seconds each side.", muscle: "Hip Flexors" },
    { name: "Quad Stretch", duration: 40, instruction: "Standing, pull your heel to your glutes. Keep knees together. Hold 20 seconds each leg.", muscle: "Quads" },
    { name: "Calf Stretch", duration: 30, instruction: "Place hands on a wall, step one foot back, press heel into the floor. Hold 15 seconds each side.", muscle: "Calves" },
    { name: "Cross-Body Shoulder Stretch", duration: 30, instruction: "Bring your right arm across your chest, use your left hand to press it closer. Hold 15 seconds each arm.", muscle: "Shoulders" },
    { name: "Tricep Stretch", duration: 30, instruction: "Raise your right arm, bend the elbow, use your left hand to press the elbow back. Hold 15 seconds each arm.", muscle: "Triceps" },
    { name: "Pigeon Pose", duration: 40, instruction: "From a lunge, lower your front shin to the floor, extend back leg. Hold 20 seconds each side.", muscle: "Glutes" },
    { name: "Lying Spinal Twist", duration: 40, instruction: "Lie on your back, bring one knee across your body. Look the opposite direction. Hold 20 seconds each side.", muscle: "Spine" },
    { name: "Child's Pose", duration: 30, instruction: "Kneel and sit back on your heels, reach arms forward. Breathe deeply for 30 seconds.", muscle: "Full Body" },
],
},
{
id: "evening",
name: "Evening Wind-Down",
emoji: "🌙",
color: "#a29bfe",
duration: "5 min",
description: "Relaxing stretches to release tension before bed",
stretches: [
    { name: "Standing Forward Fold", duration: 30, instruction: "Let your upper body hang heavy. Grab opposite elbows and sway gently side to side.", muscle: "Back" },
    { name: "Seated Butterfly", duration: 30, instruction: "Sit with soles of feet together, gently press knees toward the floor with your elbows.", muscle: "Inner Thighs" },
    { name: "Supine Knee Hug", duration: 30, instruction: "Lie on your back, hug both knees to your chest. Rock gently side to side.", muscle: "Lower Back" },
    { name: "Happy Baby", duration: 30, instruction: "Lie on your back, grab the outsides of your feet, pull knees toward armpits.", muscle: "Hips" },
    { name: "Legs Up the Wall", duration: 40, instruction: "Lie on your back with legs straight up against a wall. Close your eyes and breathe.", muscle: "Legs" },
    { name: "Gentle Neck Stretch", duration: 30, instruction: "Sitting or lying down, tilt your head side to side very slowly. Let gravity do the work.", muscle: "Neck" },
    { name: "Body Scan Relaxation", duration: 40, instruction: "Lie flat on your back. Starting from your toes, tense and release each muscle group up to your head.", muscle: "Full Body" },
],
},
{
id: "back",
name: "Back Pain Relief",
emoji: "🩹",
color: "#00CEC9",
duration: "6 min",
description: "Targeted stretches to relieve back tension and pain",
stretches: [
    { name: "Cat-Cow", duration: 40, instruction: "On hands and knees, alternate between arching and rounding your back. Move slowly with your breath.", muscle: "Spine" },
    { name: "Child's Pose", duration: 30, instruction: "Kneel and reach your arms forward on the floor. Sink your hips back to your heels.", muscle: "Lower Back" },
    { name: "Pelvic Tilts", duration: 30, instruction: "Lie on your back with knees bent. Flatten your lower back against the floor, then release. Repeat 10 times.", muscle: "Lower Back" },
    { name: "Knee-to-Chest", duration: 30, instruction: "Lying down, pull one knee to your chest and hold. Then switch. Then both knees together.", muscle: "Lower Back" },
    { name: "Supine Twist", duration: 40, instruction: "Lie on your back, drop both knees to one side while looking the other way. Hold 20 seconds each side.", muscle: "Spine" },
    { name: "Cobra Stretch", duration: 30, instruction: "Lie face down, place hands under shoulders, gently press up while keeping hips on the floor.", muscle: "Core" },
    { name: "Thread the Needle", duration: 40, instruction: "On hands and knees, slide one arm under your body, rotating your chest. Hold 20 seconds each side.", muscle: "Upper Back" },
    { name: "Sphinx Pose", duration: 30, instruction: "Lie face down on forearms, lift your chest gently. Relax your lower body completely.", muscle: "Lower Back" },
],
},
];

export default function StretchingPage() {
const [activeRoutine, setActiveRoutine] = useState(null);
const [exerciseMode, setExerciseMode] = useState(false);
const [currentExercise, setCurrentExercise] = useState(0);
const [timeLeft, setTimeLeft] = useState(0);
const [isPaused, setIsPaused] = useState(false);
const [sessionComplete, setSessionComplete] = useState(false);
const [totalSessions, setTotalSessions] = useState(0);
const [streak, setStreak] = useState(0);

const today = new Date().toDateString();

useEffect(() => {
const saved = localStorage.getItem("daylyft-stretching");
if (saved) {
    const parsed = JSON.parse(saved);
    setTotalSessions(parsed.totalSessions || 0);
    if (parsed.lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (parsed.lastDate === yesterday.toDateString() || parsed.lastDate === today) {
        setStreak(parsed.streak || 0);
    }
    }
}
}, []);

useEffect(() => {
if (exerciseMode && !isPaused && timeLeft > 0) {
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
} else if (exerciseMode && timeLeft === 0 && activeRoutine) {
    if (currentExercise + 1 < activeRoutine.stretches.length) {
    playDing();
    setCurrentExercise(currentExercise + 1);
    setTimeLeft(activeRoutine.stretches[currentExercise + 1].duration);
    } else {
    completeSession();
    }
}
}, [exerciseMode, timeLeft, isPaused]);

const playDing = () => {
try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.value = 0.15;
    osc.start();
    setTimeout(() => { osc.frequency.value = 1000; }, 100);
    setTimeout(() => { osc.stop(); ctx.close(); }, 200);
} catch (e) {}
};

const startRoutine = (routine) => {
setActiveRoutine(routine);
setCurrentExercise(0);
setTimeLeft(routine.stretches[0].duration);
setExerciseMode(true);
setIsPaused(false);
setSessionComplete(false);
};

const completeSession = () => {
playDing();
setExerciseMode(false);
setSessionComplete(true);
const newTotal = totalSessions + 1;
const saved = localStorage.getItem("daylyft-stretching");
const parsed = saved ? JSON.parse(saved) : {};
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const wasYesterday = parsed.lastDate === yesterday.toDateString();
const isToday = parsed.lastDate === today;
const newStreak = isToday ? (parsed.streak || 1) : wasYesterday ? (parsed.streak || 0) + 1 : 1;

setTotalSessions(newTotal);
setStreak(newStreak);
localStorage.setItem("daylyft-stretching", JSON.stringify({
    totalSessions: newTotal,
    streak: newStreak,
    lastDate: today,
}));
};

const skipExercise = () => {
if (currentExercise + 1 < activeRoutine.stretches.length) {
    setCurrentExercise(currentExercise + 1);
    setTimeLeft(activeRoutine.stretches[currentExercise + 1].duration);
} else {
    completeSession();
}
};

const exitRoutine = () => {
setExerciseMode(false);
setActiveRoutine(null);
setSessionComplete(false);
};

const formatTime = (s) => {
const mins = Math.floor(s / 60);
const secs = s % 60;
return mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `${secs}s`;
};

const hour = new Date().getHours();
const suggestedRoutine = hour < 10 ? "morning" : hour < 17 ? "desk" : "evening";

// Session Complete
if (sessionComplete && activeRoutine) {
const totalDuration = activeRoutine.stretches.reduce((sum, s) => sum + s.duration, 0);
return (
    <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center", paddingTop: 40 }}>
    <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
    <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)", marginBottom: 8 }}>Stretch complete!</h2>
    <p style={{ fontSize: 15, color: "var(--fm-muted)", marginBottom: 24 }}>
        {activeRoutine.name} — {activeRoutine.stretches.length} stretches in {Math.round(totalDuration / 60)} minutes
    </p>

    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, minWidth: 100, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "var(--fm-accent-light)" }}>{totalSessions}</div>
        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>Total sessions</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, minWidth: 100, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: streak >= 7 ? "#00CEC9" : "#6C5CE7" }}>{streak}d</div>
        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>Streak</div>
        </div>
    </div>

    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => startRoutine(activeRoutine)} style={{
        padding: "12px 28px", borderRadius: 12, border: "none",
        background: `linear-gradient(135deg, ${activeRoutine.color}, ${activeRoutine.color}aa)`,
        color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Do it again</button>
        <button onClick={exitRoutine} style={{
        padding: "12px 28px", borderRadius: 12, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)", fontSize: 14,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Back to routines</button>
    </div>
    </div>
);
}

// Exercise Mode
if (exerciseMode && activeRoutine) {
const stretch = activeRoutine.stretches[currentExercise];
const progress = ((currentExercise + 1) / activeRoutine.stretches.length) * 100;
const timeProgress = stretch.duration > 0 ? ((stretch.duration - timeLeft) / stretch.duration) * 100 : 0;
const circumference = 2 * Math.PI * 80;
const strokeDashoffset = circumference - (timeProgress / 100) * circumference;

return (
    <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>
        {activeRoutine.emoji} {currentExercise + 1}/{activeRoutine.stretches.length}
        </div>
        <button onClick={exitRoutine} style={{
        padding: "6px 14px", borderRadius: 8, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)", fontSize: 12,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Exit</button>
    </div>

    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 6, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 8, width: `${progress}%`, background: `linear-gradient(135deg, ${activeRoutine.color}, ${activeRoutine.color}aa)`, transition: "width 0.3s ease" }} />
    </div>

    <div style={{
        background: `linear-gradient(135deg, ${activeRoutine.color}12, ${activeRoutine.color}06)`,
        border: `1px solid ${activeRoutine.color}30`,
        borderRadius: 20, padding: 32, marginBottom: 20,
    }}>
        <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 20px" }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--fm-border)" strokeWidth="6" />
            <circle cx="90" cy="90" r="80" fill="none" stroke={activeRoutine.color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: activeRoutine.color, lineHeight: 1 }}>{formatTime(timeLeft)}</div>
        </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-text)", marginBottom: 4 }}>{stretch.name}</div>
        <div style={{ fontSize: 12, color: activeRoutine.color, fontWeight: 500, marginBottom: 12 }}>{stretch.muscle}</div>
        <div style={{
        fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto",
        padding: "12px 16px", background: "var(--fm-surface)", borderRadius: 12, border: "1px solid var(--fm-border)",
        }}>{stretch.instruction}</div>
    </div>

    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => setIsPaused(!isPaused)} style={{
        padding: "12px 28px", borderRadius: 12, border: `1px solid ${activeRoutine.color}30`,
        background: `${activeRoutine.color}15`, color: activeRoutine.color,
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{isPaused ? "▶ Resume" : "⏸ Pause"}</button>
        <button onClick={skipExercise} style={{
        padding: "12px 24px", borderRadius: 12, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)", fontSize: 14,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Skip →</button>
    </div>

    {/* Next up */}
    {currentExercise + 1 < activeRoutine.stretches.length && (
        <div style={{ marginTop: 20, fontSize: 12, color: "var(--fm-muted)" }}>
        Next: {activeRoutine.stretches[currentExercise + 1].name} ({activeRoutine.stretches[currentExercise + 1].duration}s)
        </div>
    )}
    </div>
);
}

// Routines List
return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Stretching Guide</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Quick guided stretching routines for every moment of your day — your body will thank you</p>
    </div>

    {/* Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Sessions</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{totalSessions}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Minutes</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{totalSessions * 5}</div>
    </div>
    </div>

    {/* Suggested */}
    {(() => {
    const suggested = routines.find((r) => r.id === suggestedRoutine);
    if (!suggested) return null;
    return (
        <div style={{
        background: `linear-gradient(135deg, ${suggested.color}12, ${suggested.color}06)`,
        border: `1px solid ${suggested.color}30`,
        borderRadius: 16, padding: 20, marginBottom: 20, textAlign: "center",
        }}>
        <div style={{ fontSize: 11, color: suggested.color, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>SUGGESTED FOR YOU</div>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{suggested.emoji}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--fm-text)", marginBottom: 4 }}>{suggested.name}</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>{suggested.description} · {suggested.duration}</div>
        <button onClick={() => startRoutine(suggested)} style={{
            padding: "12px 32px", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${suggested.color}, ${suggested.color}aa)`,
            color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Start Stretching</button>
        </div>
    );
    })()}

    {/* All Routines */}
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>All routines</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {routines.map((routine) => (
        <div key={routine.id} style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, borderLeft: `4px solid ${routine.color}`,
        }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${routine.color}15`, border: `1px solid ${routine.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>{routine.emoji}</div>
            <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>{routine.name}</div>
                <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>{routine.description}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: `${routine.color}15`, color: routine.color }}>{routine.duration}</span>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "var(--fm-card)", color: "var(--fm-muted)" }}>{routine.stretches.length} stretches</span>
                </div>
            </div>
            </div>
            <button onClick={() => startRoutine(routine)} style={{
            padding: "10px 20px", borderRadius: 10, border: "none",
            background: `${routine.color}15`, color: routine.color,
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            flexShrink: 0,
            }}>Start</button>
        </div>
        </div>
    ))}
    </div>

    {/* Benefits */}
    <div style={{
    background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)",
    borderRadius: 14, padding: 18, marginTop: 16,
    }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "#00CEC9", marginBottom: 10 }}>Why stretch daily?</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
        { emoji: "💪", text: "Reduces muscle tension and prevents injury" },
        { emoji: "🧠", text: "Improves focus and mental clarity" },
        { emoji: "😴", text: "Helps you sleep better at night" },
        { emoji: "⚡", text: "Boosts energy and blood circulation" },
        { emoji: "🪑", text: "Counteracts sitting all day at a desk" },
        ].map((b, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{b.emoji}</span>
            <span style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.5 }}>{b.text}</span>
        </div>
        ))}
    </div>
    </div>
</div>
);
}