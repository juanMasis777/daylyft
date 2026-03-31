"use client";

export default function LandingPage() {
  const features = [
    { icon: "✦", title: "AI Copilot — Kai", desc: "Your personal AI assistant that learns how you work and optimizes your day automatically." },
    { icon: "◉", title: "Smart Calendar", desc: "Auto-schedules tasks, protects focus time, and adjusts when plans change." },
    { icon: "◈", title: "Zen Mode", desc: "Ambient sounds, breathing exercises, and smart breaks to recharge between work sessions." },
    { icon: "◇", title: "Family Mode", desc: "Organize meals, chores, budgets, and kids' activities — all in one place." },
    { icon: "△", title: "Team Dashboard", desc: "AI-balanced workloads, real-time status, and team productivity insights." },
    { icon: "○", title: "Productivity DNA", desc: "Discover your unique work patterns and share your productivity personality." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--fm-bg)", fontFamily: "Outfit, sans-serif" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 32px", maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="8" r="3" fill="white" />
              <circle cx="16" cy="14" r="3" fill="white" />
              <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FlowMind</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => window.location.href = "/login"} style={{
            padding: "10px 20px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "transparent", color: "var(--fm-text)", fontSize: 13,
            fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
          }}>Sign in</button>
          <button onClick={() => window.location.href = "/login"} style={{
            padding: "10px 20px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
          }}>Get started free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        textAlign: "center", padding: "80px 20px 60px", maxWidth: 800, margin: "0 auto",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", width: 350, height: 350, borderRadius: "50%",
          background: "var(--fm-accent-glow)", filter: "blur(120px)", opacity: 0.3,
          left: "10%", top: "0", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "var(--fm-teal-glow)", filter: "blur(100px)", opacity: 0.2,
          right: "10%", top: "20%", pointerEvents: "none",
        }} />
        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: 20,
          background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.2)",
          fontSize: 13, color: "var(--fm-accent-light)", fontWeight: 500, marginBottom: 24,
        }}>
          Meet Kai — your AI productivity copilot
        </div>
        <h1 style={{
          fontSize: 52, fontWeight: 900, color: "var(--fm-text)",
          letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20,
          position: "relative",
        }}>
          Work smarter.<br />
          <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Rest better.
          </span><br />
          Live fully.
        </h1>
        <p style={{ fontSize: 18, color: "var(--fm-muted)", lineHeight: 1.6, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px", position: "relative" }}>
          FlowMind is the AI copilot that organizes your work, protects your rest, and manages your home — all for less than a coffee per month.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
          <button onClick={() => window.location.href = "/login"} style={{
            padding: "16px 32px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
          }}>Start free — no card needed</button>
          <button onClick={() => window.location.href = "/pricing"} style={{
            padding: "16px 32px", borderRadius: 14,
            border: "1px solid var(--fm-border)", background: "transparent",
            color: "var(--fm-text)", fontSize: 16, fontWeight: 600,
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
          }}>See pricing</button>
        </div>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", marginTop: 16, position: "relative" }}>
          Trusted by productive people. Free forever plan available.
        </p>
      </section>

      {/* Social proof */}
      <section style={{
        display: "flex", justifyContent: "center", gap: 40, padding: "20px 20px 60px",
        flexWrap: "wrap",
      }}>
        {[
          { num: "$6.99", label: "/month for Pro" },
          { num: "46", label: "features included" },
          { num: "24/7", label: "AI copilot" },
          { num: "100%", label: "data privacy" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--fm-accent)" }}>{s.num}</div>
            <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: "40px 20px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, color: "var(--fm-text)", marginBottom: 12 }}>
          Everything you need. Nothing you don't.
        </h2>
        <p style={{ textAlign: "center", fontSize: 16, color: "var(--fm-muted)", marginBottom: 48 }}>
          Productivity + wellness + family — all in one app.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
              borderRadius: 16, padding: 24,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "rgba(108,92,231,0.1)", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "var(--fm-accent)", marginBottom: 14,
              }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "60px 20px", textAlign: "center",
        background: "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(0,206,201,0.05))",
        borderTop: "1px solid var(--fm-border)",
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--fm-text)", marginBottom: 12 }}>
          Ready to meet Kai?
        </h2>
        <p style={{ fontSize: 16, color: "var(--fm-muted)", marginBottom: 28 }}>
          Join FlowMind today. Free forever, upgrade when you're ready.
        </p>
        <button onClick={() => window.location.href = "/login"} style={{
          padding: "16px 40px", borderRadius: 14, border: "none",
          background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
          fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Get started free</button>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "30px 20px", textAlign: "center",
        borderTop: "1px solid var(--fm-border)",
      }}>
        <p style={{ fontSize: 12, color: "var(--fm-muted)" }}>
          © 2026 FlowMind. Your data is yours. We never sell it. Privacy Policy · Terms of Service
        </p>
      </footer>
    </div>
  );
}