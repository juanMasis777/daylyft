"use client";

import { useEffect, useState } from "react";

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const features = [
    { icon: "✦", title: "AI Copilot — Kai", desc: "Learns how you work and optimizes your entire day automatically.", color: "#6C5CE7" },
    { icon: "◉", title: "Smart Calendar", desc: "Organize your week and never miss a single deadline.", color: "#00CEC9" },
    { icon: "◈", title: "Zen Mode", desc: "8 ambient sounds and breathing exercises to recharge.", color: "#fd79a8" },
    { icon: "◇", title: "7 Color Themes", desc: "Beautiful dark and light themes to match your mood.", color: "#fdcb6e" },
    { icon: "△", title: "Real Analytics", desc: "Track your productivity, completion rates, and growth.", color: "#a29bfe" },
    { icon: "○", title: "Life Journal", desc: "AI-generated daily summaries and printable Life Book.", color: "#00CEC9" },
  ];

  const steps = [
    { num: "1", title: "Sign up in 10 seconds", desc: "Email or Google. No credit card needed.", color: "#6C5CE7" },
    { num: "2", title: "Add your tasks", desc: "Kai organizes everything by priority and deadline.", color: "#00CEC9" },
    { num: "3", title: "Let Kai optimize your day", desc: "AI learns your patterns and builds your perfect schedule.", color: "#fd79a8" },
    { num: "4", title: "Track your progress", desc: "See analytics, insights, and improvement over time.", color: "#fdcb6e" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#08080d", fontFamily: "Outfit, sans-serif",
      color: "#eaeaef", overflow: "hidden", position: "relative",
    }}>
      {/* Animated background orbs */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "rgba(108,92,231,0.08)", filter: "blur(80px)",
          left: "-5%", top: "5%",
          animation: "float1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 250, height: 250, borderRadius: "50%",
          background: "rgba(0,206,201,0.06)", filter: "blur(80px)",
          right: "-5%", top: "30%",
          animation: "float2 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          background: "rgba(253,121,168,0.05)", filter: "blur(80px)",
          left: "30%", bottom: "10%",
          animation: "float3 9s ease-in-out infinite",
        }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: 3, height: 3, borderRadius: "50%",
            background: "rgba(108,92,231,0.4)",
            left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
            animation: `pulse ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.1); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,30px) scale(1.05); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }
        @keyframes pulse { 0%,100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.5); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes progressBar { from { width: 0; } to { width: 100%; } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px rgba(108,92,231,0.3); } 50% { box-shadow: 0 0 40px rgba(108,92,231,0.5); } }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Nav */}
        <nav style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 24px", maxWidth: 1000, margin: "0 auto",
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="3" fill="white" />
                <circle cx="16" cy="14" r="3" fill="white" />
                <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#eaeaef" }}>FlowMind</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => window.location.href = "/login"} style={{
              padding: "8px 18px", borderRadius: 18, border: "1px solid #1c1c2a",
              background: "transparent", color: "#6b6b80", fontSize: 13,
              fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>Sign in</button>
            <button onClick={() => window.location.href = "/login"} style={{
              padding: "8px 18px", borderRadius: 18, border: "none",
              background: "#6C5CE7", color: "#fff", fontSize: 13,
              fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>Get started</button>
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          textAlign: "center", padding: "50px 20px 40px", maxWidth: 700, margin: "0 auto",
        }}>
          <div style={{
            display: "inline-block", padding: "5px 16px", borderRadius: 20,
            background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.2)",
            fontSize: 12, color: "#a29bfe", fontWeight: 500, marginBottom: 20,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            ✦ Meet Kai — your AI productivity copilot
          </div>

          <h1 style={{
            fontSize: "clamp(34px, 7vw, 54px)", fontWeight: 800,
            lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.03em",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.4s",
          }}>
            Think less.<br />
            <span style={{
              background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Do more.</span><br />
            Live fully.
          </h1>

          <p style={{
            fontSize: "clamp(14px, 2vw, 17px)", color: "#6b6b80", lineHeight: 1.7,
            maxWidth: 480, margin: "0 auto 24px",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.6s",
          }}>
            The AI copilot that organizes your work, protects your rest, and manages your life — for less than a coffee per month.
          </p>

          <div style={{
            display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.8s",
          }}>
            <button onClick={() => window.location.href = "/login"} style={{
              padding: "13px 28px", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
              animation: visible ? "glowPulse 3s ease-in-out infinite 2s" : "none",
            }}>Start free — no card needed</button>
            <button onClick={() => window.location.href = "/pricing"} style={{
              padding: "13px 28px", borderRadius: 14,
              border: "1px solid #1c1c2a", background: "rgba(255,255,255,0.03)",
              color: "#eaeaef", fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>See pricing</button>
          </div>

          <p style={{
            fontSize: 12, color: "#6b6b80", marginTop: 14,
            opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 1s",
          }}>Free forever plan available. No credit card required.</p>
        </section>

        {/* Animated divider */}
        <div style={{ padding: "0 20%", marginBottom: 40 }}>
          <div style={{
            height: 2, borderRadius: 2, overflow: "hidden", background: "#1c1c2a",
          }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #6C5CE7, #00CEC9, #fd79a8)",
              animation: visible ? "progressBar 2s ease 1.2s both" : "none",
            }} />
          </div>
        </div>

        {/* Stats */}
        <section style={{
          display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 50px)", padding: "0 20px 40px",
          flexWrap: "wrap",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 1.4s",
        }}>
          {[
            { num: "$6.99", label: "/month for Pro", color: "#6C5CE7" },
            { num: "46+", label: "features", color: "#00CEC9" },
            { num: "24/7", label: "AI copilot", color: "#fd79a8" },
            { num: "100%", label: "data privacy", color: "#fdcb6e" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 700, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "#6b6b80" }}>{s.label}</div>
            </div>
          ))}
        </section>

        {/* Features */}
        <section style={{ padding: "20px 20px 50px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 12, color: "#6C5CE7", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>FEATURES</div>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, color: "#eaeaef" }}>Everything you need. Nothing you don't.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "#111118", border: "1px solid #1c1c2a",
                borderRadius: 14, padding: 20, cursor: "pointer",
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.85)",
                transition: `all 0.6s ease ${1.6 + i * 0.15}s`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = f.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#1c1c2a"; }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${f.color}15`, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: f.color, marginBottom: 10,
                }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#eaeaef", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#6b6b80", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "20px 20px 50px", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 12, color: "#00CEC9", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, color: "#eaeaef" }}>Four steps to flow state</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, alignItems: "center",
                background: "#111118", border: "1px solid #1c1c2a",
                borderRadius: 12, padding: "14px 18px",
                opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
                transition: `all 0.6s ease ${2.5 + i * 0.15}s`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 600, color: s.color,
                }}>{s.num}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#eaeaef" }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "#6b6b80" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: "40px 20px", textAlign: "center",
          background: "linear-gradient(180deg, transparent, rgba(108,92,231,0.05))",
          borderTop: "1px solid #1c1c2a",
        }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#eaeaef", marginBottom: 6 }}>
            Ready to meet Kai?
          </h2>
          <p style={{ fontSize: 14, color: "#6b6b80", marginBottom: 20 }}>
            Join FlowMind today. Free forever, upgrade when you're ready.
          </p>
          <button onClick={() => window.location.href = "/login"} style={{
            padding: "14px 32px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            animation: "glowPulse 3s ease-in-out infinite",
          }}>Get started free</button>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "20px", textAlign: "center",
          borderTop: "1px solid #1c1c2a",
        }}>
          <p style={{ fontSize: 11, color: "#6b6b80" }}>
            © 2026 FlowMind. Your data is yours. We never sell it. Privacy Policy · Terms of Service
          </p>
        </footer>
      </div>
    </div>
  );
}