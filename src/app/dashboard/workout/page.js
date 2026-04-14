"use client";

import { useState, useEffect } from "react";

const exerciseTypes = [
{ id: "strength", label: "Strength", emoji: "🏋️", color: "#6C5CE7" },
{ id: "cardio", label: "Cardio", emoji: "🏃", color: "#ff6b6b" },
{ id: "flexibility", label: "Flexibility", emoji: "🧘", color: "#00CEC9" },
{ id: "sports", label: "Sports", emoji: "⚽", color: "#fdcb6e" },
{ id: "hiit", label: "HIIT", emoji: "🔥", color: "#e17055" },
{ id: "swimming", label: "Swimming", emoji: "🏊", color: "#74b9ff" },
{ id: "cycling", label: "Cycling", emoji: "🚴", color: "#00b894" },
{ id: "walking", label: "Walking", emoji: "🚶", color: "#a29bfe" },
];

const quickWorkouts = [
{ title: "Push-ups", type: "strength", emoji: "💪" },
{ title: "Running", type: "cardio", emoji: "🏃" },
{ title: "Squats", type: "strength", emoji: "🦵" },
{ title: "Plank", type: "strength", emoji: "🧱" },
{ title: "Jumping Jacks", type: "cardio", emoji: "⭐" },
{ title: "Yoga", type: "flexibility", emoji: "🧘" },
{ title: "Burpees", type: "hiit", emoji: "🔥" },
{ title: "Cycling", type: "cycling", emoji: "🚴" },
];

export default function WorkoutPage() {
const [workouts, setWorkouts] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [type, setType] = useState("strength");
const [duration, setDuration] = useState("");
const [calories, setCalories] = useState("");
const [exercises, setExercises] = useState([]);
const [exName, setExName] = useState("");
const [exSets, setExSets] = useState("");
const [exReps, setExReps] = useState("");
const [exWeight, setExWeight] = useState("");
const [notes, setNotes] = useState("");
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

const today = new Date().toDateString();

useEffect(() => {
const saved = localStorage.getItem("daylyft-workouts");
if (saved) setWorkouts(JSON.parse(saved));
}, []);

const saveWorkouts = (updated) => {
setWorkouts(updated);
localStorage.setItem("daylyft-workouts", JSON.stringify(updated));
};

const addExercise = () => {
if (!exName.trim()) return;
setExercises([...exercises, {
    id: Date.now(),
    name: exName.trim(),
    sets: parseInt(exSets) || 0,
    reps: parseInt(exReps) || 0,
    weight: exWeight.trim(),
}]);
setExName("");
setExSets("");
setExReps("");
setExWeight("");
};

const removeExercise = (id) => {
setExercises(exercises.filter((e) => e.id !== id));
};

const saveWorkout = () => {
if (!title.trim()) { alert("Give your workout a name"); return; }

const newWorkout = {
    id: Date.now(),
    title: title.trim(),
    type,
    duration: parseInt(duration) || 0,
    calories: parseInt(calories) || 0,
    exercises,
    notes: notes.trim(),
    date: today,
    dayLabel: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
};

saveWorkouts([newWorkout, ...workouts]);
closeForm();
};

const quickAdd = (qw) => {
setTitle(qw.title);
setType(qw.type);
setShowAdd(true);
};

const closeForm = () => {
setShowAdd(false);
setTitle("");
setType("strength");
setDuration("");
setCalories("");
setExercises([]);
setNotes("");
setExName("");
setExSets("");
setExReps("");
setExWeight("");
};

const deleteWorkout = (id) => {
if (!confirm("Delete this workout?")) return;
saveWorkouts(workouts.filter((w) => w.id !== id));
};

const getTypeInfo = (id) => exerciseTypes.find((t) => t.id === id) || exerciseTypes[0];

const todayWorkouts = workouts.filter((w) => w.date === today);
const todayDuration = todayWorkouts.reduce((sum, w) => sum + w.duration, 0);
const todayCalories = todayWorkouts.reduce((sum, w) => sum + w.calories, 0);
const weekWorkouts = workouts.filter((w) => {
const d = new Date(w.date);
const now = new Date();
return (now - d) < 7 * 24 * 60 * 60 * 1000;
});
const streak = (() => {
let count = 0;
let checkDate = new Date();
while (true) {
    const dateStr = checkDate.toDateString();
    if (workouts.some((w) => w.date === dateStr)) {
    count++;
    checkDate.setDate(checkDate.getDate() - 1);
    } else {
    break;
    }
}
return count;
})();

// Last 7 days chart
const last7Days = Array.from({ length: 7 }, (_, i) => {
const d = new Date();
d.setDate(d.getDate() - (6 - i));
return d.toDateString();
});
const dayLabels = last7Days.map((d) => new Date(d).toLocaleDateString("en-US", { weekday: "short" }));

const getKaiSuggestion = async () => {
setGeneratingKai(true);
const recentTypes = weekWorkouts.map((w) => w.type).join(", ");
const recentTitles = weekWorkouts.slice(0, 5).map((w) => w.title).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Based on my recent workouts, suggest my next workout. This week I did: ${recentTitles || "nothing yet"}. Types: ${recentTypes || "none"}. Total workouts this week: ${weekWorkouts.length}. Streak: ${streak} days. Give me: 1) A specific workout I should do today and why, 2) 4-5 exercises with sets and reps, 3) How long it should take, 4) One tip to maximize results. Keep it practical and motivating.`,
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

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Workout Tracker</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Log your exercises, track progress, and let Kai suggest your next workout</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Log Workout"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Today</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: todayWorkouts.length > 0 ? "#00CEC9" : "var(--fm-muted)" }}>{todayWorkouts.length}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>workouts</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>This week</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#6C5CE7" }}>{weekWorkouts.length}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>workouts</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
        {streak >= 7 && <div style={{ fontSize: 10, color: "#00CEC9" }}>Beast mode!</div>}
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{workouts.length}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>all time</div>
    </div>
    </div>

    {/* Weekly Chart */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>This week</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, marginBottom: 8 }}>
        {last7Days.map((day, i) => {
        const count = workouts.filter((w) => w.date === day).length;
        const totalMin = workouts.filter((w) => w.date === day).reduce((s, w) => s + w.duration, 0);
        const barHeight = count > 0 ? Math.min((totalMin / 90) * 100, 100) : 4;
        const isToday = day === today;
        return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            {count > 0 && <div style={{ fontSize: 9, fontWeight: 600, color: "#6C5CE7" }}>{totalMin}m</div>}
            <div style={{
                width: "100%", borderRadius: 4,
                height: `${barHeight}%`,
                background: count > 0 ? "linear-gradient(to top, #6C5CE7, #a29bfe)" : "var(--fm-border)",
                opacity: count > 0 ? 1 : 0.3,
            }} />
            </div>
        );
        })}
    </div>
    <div style={{ display: "flex", gap: 6 }}>
        {dayLabels.map((d, i) => (
        <div key={i} style={{
            flex: 1, fontSize: 10, textAlign: "center",
            color: last7Days[i] === today ? "#6C5CE7" : "var(--fm-muted)",
            fontWeight: last7Days[i] === today ? 700 : 400,
        }}>{d}</div>
        ))}
    </div>
    </div>

    {/* Quick Add */}
    {!showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Quick add</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {quickWorkouts.map((qw, i) => (
            <button key={i} onClick={() => quickAdd(qw)} style={{
            padding: "10px 4px", borderRadius: 10, cursor: "pointer",
            background: "var(--fm-card)", border: "1px solid var(--fm-border)",
            fontFamily: "Outfit, sans-serif", textAlign: "center",
            }}>
            <div style={{ fontSize: 20, marginBottom: 2 }}>{qw.emoji}</div>
            <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{qw.title}</div>
            </button>
        ))}
        </div>
    </div>
    )}

    {/* Add Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Log workout</div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Chest Day, Morning Run, Full Body..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Type</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
        {exerciseTypes.map((t) => (
            <button key={t.id} onClick={() => setType(t.id)} style={{
            padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
            border: type === t.id ? `1px solid ${t.color}40` : "1px solid var(--fm-border)",
            background: type === t.id ? `${t.color}15` : "var(--fm-card)",
            color: type === t.id ? t.color : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif",
            }}>{t.emoji} {t.label}</button>
        ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Duration (min)</div>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Calories (est.)</div>
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="200" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        </div>

        {/* Exercises */}
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Exercises (optional)</div>
        {exercises.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
            {exercises.map((ex) => (
            <div key={ex.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "6px 10px", background: "var(--fm-card)", borderRadius: 8,
            }}>
                <span style={{ fontSize: 12, color: "var(--fm-text)" }}>
                {ex.name} {ex.sets > 0 && ex.reps > 0 ? `— ${ex.sets}×${ex.reps}` : ""} {ex.weight ? `@ ${ex.weight}` : ""}
                </span>
                <div onClick={() => removeExercise(ex.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 10 }}>✕</div>
            </div>
            ))}
        </div>
        )}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <input value={exName} onChange={(e) => setExName(e.target.value)} placeholder="Exercise" style={{
            flex: 2, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 12,
            fontFamily: "Outfit, sans-serif", outline: "none",
        }} />
        <input value={exSets} onChange={(e) => setExSets(e.target.value)} placeholder="Sets" type="number" style={{
            flex: 1, padding: "8px 6px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 12,
            fontFamily: "Outfit, sans-serif", outline: "none", textAlign: "center",
        }} />
        <input value={exReps} onChange={(e) => setExReps(e.target.value)} placeholder="Reps" type="number" style={{
            flex: 1, padding: "8px 6px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 12,
            fontFamily: "Outfit, sans-serif", outline: "none", textAlign: "center",
        }} />
        <input value={exWeight} onChange={(e) => setExWeight(e.target.value)} placeholder="lbs" style={{
            flex: 1, padding: "8px 6px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 12,
            fontFamily: "Outfit, sans-serif", outline: "none", textAlign: "center",
        }} />
        <button onClick={addExercise} style={{
            padding: "8px 12px", borderRadius: 8, border: "none",
            background: "rgba(108,92,231,0.15)", color: "#6C5CE7", fontSize: 12,
            fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>+</button>
        </div>

        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did it feel? Any PRs?" rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 14, boxSizing: "border-box", lineHeight: 1.6,
        }} />

        <button onClick={saveWorkout} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Save Workout</button>
    </div>
    )}

    {/* Kai Suggestion */}
    {kaiMessage ? (
    <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's workout suggestion</span>
        </div>
        <div onClick={() => setKaiMessage("")} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
    </div>
    ) : (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button onClick={getKaiSuggestion} disabled={generatingKai} style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", fontSize: 13, fontWeight: 600,
        cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 8,
        }}>
        {generatingKai ? (
            <>
            <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            Kai is planning...
            </>
        ) : (
            <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            Get Kai's workout suggestion
            </>
        )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
    )}

    {/* Workout History */}
    {workouts.length > 0 && (
    <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Workout history</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {workouts.slice(0, 15).map((workout) => {
            const typeInfo = getTypeInfo(workout.type);
            return (
            <div key={workout.id} style={{
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 14, padding: 16, borderLeft: `4px solid ${typeInfo.color}`,
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${typeInfo.color}15`, border: `1px solid ${typeInfo.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                    }}>{typeInfo.emoji}</div>
                    <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>{workout.title}</div>
                    <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>
                        {workout.dayLabel}
                        {workout.duration > 0 && ` · ${workout.duration} min`}
                        {workout.calories > 0 && ` · ${workout.calories} cal`}
                        {workout.date === today && <span style={{ color: "#00CEC9", marginLeft: 4 }}>Today</span>}
                    </div>
                    </div>
                </div>
                <div onClick={() => deleteWorkout(workout.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                </div>

                {workout.exercises && workout.exercises.length > 0 && (
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
                    {workout.exercises.map((ex) => (
                    <span key={ex.id} style={{
                        fontSize: 10, padding: "3px 8px", borderRadius: 6,
                        background: `${typeInfo.color}10`, color: typeInfo.color,
                    }}>
                        {ex.name} {ex.sets > 0 && ex.reps > 0 ? `${ex.sets}×${ex.reps}` : ""} {ex.weight ? `@ ${ex.weight}` : ""}
                    </span>
                    ))}
                </div>
                )}

                {workout.notes && (
                <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 4 }}>"{workout.notes}"</div>
                )}
            </div>
            );
        })}
        </div>
    </div>
    )}

    {workouts.length === 0 && !showAdd && (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🏋️</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No workouts logged</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Start tracking your fitness journey! Log your first workout or ask Kai for a suggestion.
        </p>
    </div>
    )}
</div>
);
}