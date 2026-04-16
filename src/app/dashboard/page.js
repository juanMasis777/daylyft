"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SkeletonStat, SkeletonList, SkeletonHeader, Skeleton } from "@/app/components/Skeleton";

export default function DashboardHome() {
const [user, setUser] = useState(null);
const [tasks, setTasks] = useState([]);
const [events, setEvents] = useState([]);
const [kaiBriefing, setKaiBriefing] = useState("");
const [loadingKai, setLoadingKai] = useState(false);
const [mounted, setMounted] = useState(false);
const [waterGlasses, setWaterGlasses] = useState(0);
const [habitsToday, setHabitsToday] = useState(0);
const [totalHabits, setTotalHabits] = useState(0);
const [isLoading, setIsLoading] = useState(true);

const today = new Date();
const hour = today.getHours();
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
const todayStr = today.toDateString();

useEffect(() => {
setMounted(true);
loadData();
}, []);

const loadData = async () => {
setIsLoading(true);
const { data: { session } } = await supabase.auth.getSession();
if (!session) { setIsLoading(false); return; }
setUser(session.user);

const { data: taskData } = await supabase
    .from("tasks").select("*").eq("user_id", session.user.id)
    .eq("completed", false).order("created_at", { ascending: false }).limit(5);
if (taskData) setTasks(taskData);

const todayDate = today.toISOString().split("T")[0];
const { data: eventData } = await supabase
    .from("events").select("*").eq("user_id", session.user.id)
    .eq("event_date", todayDate).order("start_time", { ascending: true });
if (eventData) setEvents(eventData);

const { data: habitData } = await supabase
    .from("habits").select("*").eq("user_id", session.user.id);
if (habitData) {
    setTotalHabits(habitData.length);
    const { data: logData } = await supabase
    .from("habit_logs").select("*").eq("user_id", session.user.id)
    .eq("completed_date", todayDate);
    if (logData) setHabitsToday(logData.length);
}

const savedWater = localStorage.getItem("daylyft-water");
if (savedWater) {
    const parsed = JSON.parse(savedWater);
    if (parsed.date === todayStr) setWaterGlasses(parsed.glasses || 0);
}

setTimeout(() => setIsLoading(false), 400);
};

const generateBriefing = async () => {
if (!user) return;
setLoadingKai(true);

const taskList = tasks.map((t) => t.title).join(", ");
const eventList = events.map((e) => `${e.title} at ${e.start_time}`).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Give me a short, energetic morning briefing. Today is ${today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}. My pending tasks: ${taskList || "none"}. Today's events: ${eventList || "none"}. Water: ${waterGlasses}/8 glasses. Habits completed: ${habitsToday}/${totalHabits}. Give me: 1) A motivating one-liner for today, 2) My top priority task and why, 3) One quick tip for the day. Keep it under 100 words, energetic and personal.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiBriefing(data.reply);
} catch (e) {
    setKaiBriefing("Ready to crush today! Check your tasks and let's get started.");
}
setLoadingKai(false);
};

const navigate = (path) => { window.location.href = path; };

const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";
const pendingTasks = tasks.length;

const getPriorityColor = (p) => {
if (p === "high") return "#ff6b6b";
if (p === "low") return "#00CEC9";
return "#fdcb6e";
};

const quickActions = [
{ label: "Add Task", emoji: "✅", color: "#00CEC9", path: "/dashboard/tasks" },
{ label: "Kai Chat", emoji: "🤖", color: "#6C5CE7", path: "/dashboard/chat" },
{ label: "Pomodoro", emoji: "🍅", color: "#ff6348", path: "/dashboard/pomodoro" },
{ label: "Zen Mode", emoji: "🧘", color: "#74b9ff", path: "/dashboard/zen" },
{ label: "Journal", emoji: "📓", color: "#00b894", path: "/dashboard/journal" },
{ label: "Workout", emoji: "🏋️", color: "#e17055", path: "/dashboard/workout" },
];

const discoverFeatures = [
{ emoji: "🧬", title: "Productivity DNA", desc: "Discover your unique work personality", path: "/dashboard/dna", color: "#e17055" },
{ emoji: "⚡", title: "Energy Map", desc: "Find your peak performance hours", path: "/dashboard/energy", color: "#f9ca24" },
{ emoji: "🎲", title: "Daily Challenge", desc: "Push yourself with a new challenge", path: "/dashboard/challenge", color: "#e17055" },
{ emoji: "💡", title: "Idea Vault", desc: "Capture your best ideas before they disappear", path: "/dashboard/ideas", color: "#fdcb6e" },
];

return (
<div style={{ animation: mounted ? "fadeIn 0.5s ease" : "none" }}>
    {isLoading ? (
    <>
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 20, padding: 24, marginBottom: 20,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Skeleton width={38} height={38} borderRadius={12} />
            <div style={{ flex: 1 }}>
            <Skeleton width="40%" height={16} style={{ marginBottom: 4 }} />
            <Skeleton width="30%" height={11} />
            </div>
        </div>
        <Skeleton width="100%" height={60} borderRadius={12} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
        </div>

        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 18, marginBottom: 20,
        }}>
        <Skeleton width="25%" height={14} style={{ marginBottom: 14 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 8 }}>
            {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height={72} borderRadius={12} />
            ))}
        </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 20 }}>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 18 }}>
            <SkeletonHeader />
            <SkeletonList items={3} />
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 18 }}>
            <SkeletonHeader />
            <SkeletonList items={3} />
        </div>
        </div>
    </>
    ) : (
    <>
        <div style={{
        background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,206,201,0.06))",
        border: "1px solid rgba(108,92,231,0.2)",
        borderRadius: 20, padding: 24, marginBottom: 20, position: "relative", overflow: "hidden",
        }}>
        <div style={{
            position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 15px rgba(108,92,231,0.3)",
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)" }}>Kai's Daily Briefing</div>
                <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
            </div>
            </div>

            {kaiBriefing ? (
            <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiBriefing}</div>
            ) : (
            <button onClick={generateBriefing} disabled={loadingKai} style={{
                padding: "12px 24px", borderRadius: 12, border: "none",
                background: loadingKai ? "rgba(108,92,231,0.3)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
                color: "#fff", fontSize: 14, fontWeight: 600,
                cursor: loadingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
                display: "flex", alignItems: "center", gap: 8,
            }}>
                {loadingKai ? (
                <>
                    <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
                    Kai is preparing your briefing...
                </>
                ) : (
                <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                    Get today's briefing from Kai
                </>
                )}
            </button>
            )}
        </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
        <div onClick={() => navigate("/dashboard/tasks")} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 18, cursor: "pointer", transition: "all 0.2s",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 60, height: 60, borderRadius: "50%", background: "rgba(0,206,201,0.08)" }} />
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 8, fontWeight: 500 }}>Pending tasks</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: pendingTasks > 0 ? "#00CEC9" : "var(--fm-muted)", lineHeight: 1 }}>{pendingTasks}</div>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 4 }}>{pendingTasks === 0 ? "All clear!" : "to complete"}</div>
        </div>

        <div onClick={() => navigate("/dashboard/water")} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 18, cursor: "pointer", transition: "all 0.2s",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 60, height: 60, borderRadius: "50%", background: "rgba(116,185,255,0.08)" }} />
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 8, fontWeight: 500 }}>Water today</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: waterGlasses >= 8 ? "#00CEC9" : "#74b9ff", lineHeight: 1 }}>{waterGlasses}<span style={{ fontSize: 16, fontWeight: 500, color: "var(--fm-muted)" }}>/8</span></div>
            <div style={{ background: "var(--fm-card)", borderRadius: 4, height: 4, marginTop: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min((waterGlasses / 8) * 100, 100)}%`, background: "#74b9ff", borderRadius: 4, transition: "width 0.5s" }} />
            </div>
        </div>

        <div onClick={() => navigate("/dashboard/habits")} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 18, cursor: "pointer", transition: "all 0.2s",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 60, height: 60, borderRadius: "50%", background: "rgba(232,67,147,0.08)" }} />
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 8, fontWeight: 500 }}>Habits today</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: habitsToday === totalHabits && totalHabits > 0 ? "#00CEC9" : "#e84393", lineHeight: 1 }}>{habitsToday}<span style={{ fontSize: 16, fontWeight: 500, color: "var(--fm-muted)" }}>/{totalHabits}</span></div>
            <div style={{ background: "var(--fm-card)", borderRadius: 4, height: 4, marginTop: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${totalHabits > 0 ? (habitsToday / totalHabits) * 100 : 0}%`, background: "#e84393", borderRadius: 4, transition: "width 0.5s" }} />
            </div>
        </div>

        <div onClick={() => navigate("/dashboard/calendar")} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 18, cursor: "pointer", transition: "all 0.2s",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 60, height: 60, borderRadius: "50%", background: "rgba(253,121,168,0.08)" }} />
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 8, fontWeight: 500 }}>Events today</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: events.length > 0 ? "#fd79a8" : "var(--fm-muted)", lineHeight: 1 }}>{events.length}</div>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 4 }}>{events.length === 0 ? "Free day" : events[0]?.title}</div>
        </div>
        </div>

        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 18, marginBottom: 20,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Quick actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 8 }}>
            {quickActions.map((action, i) => (
            <div key={i} onClick={() => navigate(action.path)} style={{
                padding: "14px 8px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                background: "var(--fm-card)", border: "1px solid var(--fm-border)",
                transition: "all 0.2s",
            }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{action.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: "var(--fm-muted)" }}>{action.label}</div>
            </div>
            ))}
        </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 20 }}>
        <div style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 18,
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>Upcoming tasks</div>
            <div onClick={() => navigate("/dashboard/tasks")} style={{
                fontSize: 11, color: "var(--fm-accent-light)", cursor: "pointer", fontWeight: 500,
            }}>View all →</div>
            </div>

            {tasks.length === 0 ? (
            <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
                <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>All tasks complete! Add more?</div>
            </div>
            ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {tasks.slice(0, 4).map((task) => (
                <div key={task.id} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                    background: "var(--fm-card)", borderRadius: 10,
                    borderLeft: `3px solid ${getPriorityColor(task.priority)}`,
                }}>
                    <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    border: `2px solid ${getPriorityColor(task.priority)}40`,
                    }} />
                    <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{task.title}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: `${getPriorityColor(task.priority)}15`, color: getPriorityColor(task.priority) }}>{task.priority}</span>
                        {task.category && <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{task.category}</span>}
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>

        <div style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 18,
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>Today's schedule</div>
            <div onClick={() => navigate("/dashboard/calendar")} style={{
                fontSize: 11, color: "var(--fm-accent-light)", cursor: "pointer", fontWeight: 500,
            }}>Calendar →</div>
            </div>

            {events.length === 0 ? (
            <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📅</div>
                <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>No events today. Enjoy your free day!</div>
            </div>
            ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {events.slice(0, 4).map((event) => (
                <div key={event.id} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                    background: "var(--fm-card)", borderRadius: 10,
                    borderLeft: `3px solid ${event.color || "#6C5CE7"}`,
                }}>
                    <div style={{
                    fontSize: 13, fontWeight: 700, color: event.color || "#6C5CE7",
                    minWidth: 50,
                    }}>{event.start_time?.slice(0, 5)}</div>
                    <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)" }}>{event.title}</div>
                    {event.end_time && <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>until {event.end_time?.slice(0, 5)}</div>}
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>

        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 18,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Discover more</div>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 14 }}>Features you haven't tried yet</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {discoverFeatures.map((feat, i) => (
            <div key={i} onClick={() => navigate(feat.path)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px",
                background: "var(--fm-card)", border: "1px solid var(--fm-border)",
                borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
            }}>
                <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: `${feat.color}15`, border: `1px solid ${feat.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>{feat.emoji}</div>
                <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{feat.title}</div>
                <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{feat.desc}</div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </>
    )}
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
</div>
);
}