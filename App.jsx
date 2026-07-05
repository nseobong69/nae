import { useState, useEffect, useRef } from "react";

const CYAN   = "#00D9FF";
const AMBER  = "#F59E0B";
const CHAR   = "#0F1117";
const CARD   = "#161B22";
const BORDER = "#21262D";
const MUTED  = "#8B949E";
const WHITE  = "#F0F6FF";

const roles = [
  "Full Stack Developer",
  "AI Systems Builder",
  "Production-First Engineer",
  "Award-Winning Author",
];

const projects = [
  {
    name: "VIS Portal",
    tag: "LIVE · 1,000+ USERS",
    tagColor: "#16A34A",
    desc: "Full school management system built from zero — results, admissions, CBT testing, ID cards, TOTP 2FA, server-side Edge Functions, and an offline-capable PWA. Sole architect, engineer, and product owner.",
    stack: ["React", "Supabase", "PostgreSQL", "Edge Functions", "PWA", "Cloudinary"],
    highlight: true,
  },
  {
    name: "Emanicel Store",
    tag: "LIVE · COMMERCIAL",
    tagColor: "#16A34A",
    desc: "Point-of-sale and inventory platform in active commercial use. Multi-unit selling model, race condition bug fix, bulk import pipeline, Paystack integration, and role-based access control.",
    stack: ["React", "Supabase", "PostgreSQL", "Paystack", "RBAC"],
    highlight: false,
  },
  {
    name: "TFunds Bot",
    tag: "DEPLOYED · LIVE",
    tagColor: "#7C3AED",
    desc: "Multi-exchange crypto trading bot with HMAC-SHA256 signed API calls to Bybit, OKX, KuCoin, and Coinbase. AI-gate layer validates signals before execution. Full technical analysis engine: EMA, RSI, MACD, Bollinger Bands.",
    stack: ["React", "HMAC-SHA256", "Bybit", "OKX", "KuCoin", "AI Gate"],
    highlight: false,
  },
  {
    name: "Football Prediction Bot",
    tag: "AGENTIC AI",
    tagColor: CYAN.replace("#",""),
    desc: "Two-phase agentic pipeline — Phase 1 discovers live fixtures via web search tool; Phase 2 runs per-fixture analysis through Claude API with injected real-time context. Results stream progressively to the UI.",
    stack: ["React", "Claude API", "Web Search Tool", "Agentic Pipeline"],
    highlight: false,
  },
  {
    name: "EDEM Transcription App",
    tag: "BUILT · BRANDED",
    tagColor: AMBER.replace("#",""),
    desc: "Personal audio transcription application with custom branding — \"Every word, captured.\" Designed and built end-to-end as a standalone product.",
    stack: ["Audio APIs", "Custom Build", "Branded Product"],
    highlight: false,
  },
  {
    name: "NairaPulse",
    tag: "DEPLOYED",
    tagColor: "#16A34A",
    desc: "Fintech concept app with Paystack payment integration. Scaffolded, deployed on Vercel via GitHub with a production-ready payment flow.",
    stack: ["Paystack", "Vercel", "GitHub", "Fintech"],
    highlight: false,
  },
];

const skills = [
  { label: "AI / LLM", items: ["Claude API", "Web Search Tool", "Agentic Pipelines", "AI-Gate Logic"], hot: true },
  { label: "Frontend", items: ["React", "JavaScript ES6+", "HTML5", "CSS3", "PWA", "Service Workers"] },
  { label: "Backend", items: ["Node.js", "Supabase Edge Functions", "REST APIs", "Webhooks"] },
  { label: "Database", items: ["PostgreSQL", "RLS Policies", "Schema Design", "Supabase"] },
  { label: "Auth & Security", items: ["TOTP 2FA", "HMAC-SHA256", "Supabase Auth", "JWT", "OTP Hashing"] },
  { label: "Integrations", items: ["Paystack", "Cloudinary", "Bybit", "OKX", "KuCoin", "Coinbase"] },
  { label: "Deploy", items: ["Vercel", "Render", "Supabase", "GitHub"] },
];

const awards = [
  { title: "Champion", body: "Peter Benjamin's Poetic World Cup", year: "2018" },
  { title: "Best Poet", body: "World Nation Writers' Union — The Writer of the World", year: "2018" },
  { title: "1st Position", body: "28th Asian Literary Society's International Contest", year: "2018" },
  { title: "Golden Ink Award", body: "World Peace and Harmony Association", year: "2019" },
];

// ── TYPING HOOK ────────────────────────────────────────────────────────────────
function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, speed);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Projects", "Skills", "Writing", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,17,23,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      transition: "all 0.3s ease",
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "60px",
    }}>
      <span style={{ fontFamily: "monospace", color: CYAN, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em" }}>
        NAE<span style={{ color: AMBER }}>.</span>dev
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: active === l.toLowerCase() ? CYAN : MUTED,
            textDecoration: "none", fontSize: "0.85rem",
            fontFamily: "monospace", letterSpacing: "0.05em",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = CYAN}
          onMouseLeave={e => e.target.style.color = active === l.toLowerCase() ? CYAN : MUTED}
          >{l}</a>
        ))}
        <a href="https://github.com/nseobong69" target="_blank" rel="noopener noreferrer" style={{
          color: AMBER, textDecoration: "none", fontSize: "0.85rem",
          fontFamily: "monospace", letterSpacing: "0.05em",
          border: `1px solid ${AMBER}`, padding: "2px 12px", borderRadius: "4px",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.target.style.background = AMBER; e.target.style.color = CHAR; }}
        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = AMBER; }}
        >GitHub</a>
      </div>
    </nav>
  );
}

// ── HERO ────────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTyping(roles);
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "6rem 2rem 4rem",
      background: `radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0,217,255,0.06) 0%, transparent 60%),
                   radial-gradient(ellipse 60% 40% at 80% 70%, rgba(245,158,11,0.05) 0%, transparent 60%),
                   ${CHAR}`,
    }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%" }}>
        <div style={{ fontFamily: "monospace", color: CYAN, fontSize: "0.9rem", marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
          &gt; Hello, world. I'm
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 800, color: WHITE,
          lineHeight: 1.1, margin: "0 0 1rem",
          letterSpacing: "-0.02em",
        }}>
          Nseobong<br />
          <span style={{ color: CYAN }}>Akan Edem</span>
        </h1>
        <div style={{
          fontFamily: "monospace", fontSize: "clamp(1rem, 3vw, 1.4rem)",
          color: WHITE, marginBottom: "2rem", minHeight: "2em",
          display: "flex", alignItems: "center", gap: "0.5rem"
        }}>
          <span style={{ color: MUTED }}>//</span>
          <span>{typed}</span>
          <span style={{ color: CYAN, animation: "blink 1s step-end infinite" }}>|</span>
        </div>
        <p style={{
          color: MUTED, fontSize: "1.05rem", lineHeight: 1.8,
          maxWidth: "580px", marginBottom: "3rem",
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          I build production software from zero — full-stack web applications, AI-integrated systems, and tools that serve real users. Based in Nigeria, available worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#projects" style={{
            background: CYAN, color: CHAR, padding: "0.75rem 2rem",
            borderRadius: "6px", textDecoration: "none", fontWeight: 700,
            fontSize: "0.9rem", fontFamily: "monospace", letterSpacing: "0.05em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.85"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          >View Projects</a>
          <a href="mailto:nseobongedem@gmail.com" style={{
            border: `1px solid ${BORDER}`, color: WHITE, padding: "0.75rem 2rem",
            borderRadius: "6px", textDecoration: "none", fontWeight: 600,
            fontSize: "0.9rem", fontFamily: "monospace", letterSpacing: "0.05em",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => e.target.style.borderColor = CYAN}
          onMouseLeave={e => e.target.style.borderColor = BORDER}
          >Contact Me</a>
        </div>

        {/* Quick stats */}
        <div style={{
          display: "flex", gap: "2.5rem", marginTop: "5rem", flexWrap: "wrap",
          borderTop: `1px solid ${BORDER}`, paddingTop: "2.5rem",
        }}>
          {[
            { num: "5+", label: "Production Apps" },
            { num: "1,000+", label: "Live Users" },
            { num: "4", label: "Exchange APIs Integrated" },
            { num: "4×", label: "Int'l Literary Awards" },
          ].map(s => (
            <div key={s.num}>
              <div style={{ fontFamily: "monospace", color: CYAN, fontSize: "1.6rem", fontWeight: 800 }}>{s.num}</div>
              <div style={{ color: MUTED, fontSize: "0.8rem", marginTop: "2px", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ───────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 2rem", background: CHAR }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel label="01" title="Shipped Products" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem", marginTop: "3rem",
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1A2030" : CARD,
        border: `1px solid ${hovered ? CYAN + "55" : BORDER}`,
        borderRadius: "10px", padding: "1.5rem",
        transition: "all 0.25s ease", cursor: "default",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 8px 24px rgba(0,217,255,0.08)` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <h3 style={{ color: WHITE, fontFamily: "'Segoe UI', sans-serif", fontSize: "1rem", fontWeight: 700, margin: 0 }}>
          {p.name}
        </h3>
        <span style={{
          fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700,
          color: `#${p.tagColor}` || GREEN,
          border: `1px solid #${p.tagColor}44` || "#16A34A44",
          padding: "2px 8px", borderRadius: "20px", whiteSpace: "nowrap",
        }}>{p.tag}</span>
      </div>
      <p style={{
        color: MUTED, fontSize: "0.85rem", lineHeight: 1.65,
        fontFamily: "'Segoe UI', sans-serif", marginBottom: "1.25rem",
      }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {p.stack.map(s => (
          <span key={s} style={{
            fontFamily: "monospace", fontSize: "0.7rem", color: hovered ? CYAN : "#6B7280",
            background: hovered ? "rgba(0,217,255,0.08)" : "#21262D",
            padding: "2px 8px", borderRadius: "4px", transition: "all 0.25s",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ── SKILLS ─────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding: "6rem 2rem", background: "#0A0D12" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel label="02" title="Tech Stack" />
        <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {skills.map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: "1.5rem", alignItems: "flex-start",
              flexWrap: "wrap",
            }}>
              <div style={{
                fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700,
                color: s.hot ? CYAN : AMBER,
                minWidth: "130px", paddingTop: "4px",
                letterSpacing: "0.05em",
              }}>{s.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", flex: 1 }}>
                {s.items.map(item => (
                  <span key={item} style={{
                    fontFamily: "monospace", fontSize: "0.78rem",
                    color: s.hot ? WHITE : MUTED,
                    background: s.hot ? "rgba(0,217,255,0.1)" : CARD,
                    border: `1px solid ${s.hot ? CYAN + "44" : BORDER}`,
                    padding: "3px 10px", borderRadius: "4px",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WRITING ────────────────────────────────────────────────────────────────────
function Writing() {
  return (
    <section id="writing" style={{ padding: "6rem 2rem", background: CHAR }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel label="03" title="The Writing Side" />
        <p style={{
          color: MUTED, fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "620px",
          marginTop: "1.5rem", marginBottom: "3rem",
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          Most developers write code. I also write literature — at an internationally awarded level. 
          Three published works. Four global awards. It's the reason my documentation, proposals, 
          and client communications tend to be unusually good.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {awards.map((a, i) => (
            <div key={i} style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderLeft: `3px solid ${AMBER}`,
              borderRadius: "8px", padding: "1.25rem",
            }}>
              <div style={{ fontFamily: "monospace", color: AMBER, fontSize: "0.7rem", marginBottom: "0.5rem" }}>
                🏆 {a.year}
              </div>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                {a.title}
              </div>
              <div style={{ color: MUTED, fontSize: "0.8rem", lineHeight: 1.5 }}>{a.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{
      padding: "6rem 2rem",
      background: `linear-gradient(135deg, #0A0D12 0%, #0F1117 100%)`,
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "monospace", color: CYAN, fontSize: "0.85rem", marginBottom: "1rem", letterSpacing: "0.1em" }}>
          &gt; let's build something
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
          color: WHITE, fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 800, margin: "0 0 1.5rem", letterSpacing: "-0.02em",
        }}>Get In Touch</h2>
        <p style={{ color: MUTED, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "3rem", fontFamily: "'Segoe UI', sans-serif" }}>
          Available for remote freelance work, full-time roles, and contract projects. 
          Fast response. Reliable setup. Ready to start.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <a href="mailto:nseobongedem@gmail.com" style={{
            display: "inline-block", background: CYAN, color: CHAR,
            padding: "0.9rem 2.5rem", borderRadius: "6px",
            textDecoration: "none", fontWeight: 700,
            fontSize: "0.9rem", fontFamily: "monospace", letterSpacing: "0.05em",
            width: "fit-content",
          }}>nseobongedem@gmail.com</a>
          <div style={{ color: MUTED, fontFamily: "monospace", fontSize: "0.85rem" }}>
            or call: <span style={{ color: WHITE }}>+234 916-533-2211</span>
          </div>
          <a href="https://github.com/nseobong69" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", color: AMBER, fontSize: "0.85rem",
            textDecoration: "none", letterSpacing: "0.05em",
          }}>github.com/nseobong69 →</a>
        </div>
      </div>
    </section>
  );
}

// ── SECTION LABEL ──────────────────────────────────────────────────────────────
function SectionLabel({ label, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
      <span style={{ fontFamily: "monospace", color: CYAN, fontSize: "0.75rem", opacity: 0.6 }}>{label}</span>
      <h2 style={{
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
        color: WHITE, fontSize: "clamp(1.4rem, 4vw, 2rem)",
        fontWeight: 800, margin: 0, letterSpacing: "-0.02em",
      }}>{title}</h2>
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: CHAR, minHeight: "100vh", color: WHITE }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0D12; }
        ::-webkit-scrollbar-thumb { background: #21262D; border-radius: 3px; }
        a { transition: all 0.2s ease; }
      `}</style>
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Writing />
      <Contact />
      <footer style={{
        textAlign: "center", padding: "2rem",
        borderTop: `1px solid ${BORDER}`,
        fontFamily: "monospace", color: MUTED, fontSize: "0.75rem",
      }}>
        © 2026 Nseobong Akan Edem — Built with React
      </footer>
    </div>
  );
}
