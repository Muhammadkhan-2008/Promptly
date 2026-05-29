"use client";
import Navbar from "@/components/Navbar";

const LOGO =
  "https://raw.createusercontent.com/2eeffb20-0d06-4217-b99c-799e258d97fa/";
const tools = [
  "Sora",
  "Midjourney",
  "Runway ML",
  "DALL·E 3",
  "Stable Diffusion",
  "Kling AI",
  "Pika Labs",
  "Leonardo AI",
];
const features = [
  {
    icon: "🎬",
    title: "Video → Prompt",
    desc: "Upload any AI video and get the exact prompt that created it.",
    bg: "#FFF0E8",
  },
  {
    icon: "🖼️",
    title: "Image → Prompt",
    desc: "Drop an image — instantly reverse-engineer its full prompt.",
    bg: "#F5E8FF",
  },
  {
    icon: "✍️",
    title: "AI Builder",
    desc: "Type a rough idea. We turn it into a detailed pro-level prompt.",
    bg: "#E8F5FF",
  },
  {
    icon: "🎨",
    title: "Style Presets",
    desc: "Cinematic, Anime, 3D, Realistic — pick your style in one click.",
    bg: "#E8FFF0",
  },
  {
    icon: "⚡",
    title: "Groq Powered",
    desc: "Ultra-fast AI. Your prompt is ready in under 3 seconds.",
    bg: "#FFFAE8",
  },
  {
    icon: "🔢",
    title: "3 Variations",
    desc: "Get 3 different versions at once and pick the best one.",
    bg: "#F0FBFF",
  },
  {
    icon: "🚫",
    title: "Negative Prompt",
    desc: "Tell the AI what NOT to include — more control, better results.",
    bg: "#FFF0EE",
  },
  {
    icon: "📋",
    title: "Saved History",
    desc: "Every prompt saved forever. Search and copy anytime.",
    bg: "#FFF0F8",
  },
];
const steps = [
  {
    emoji: "📤",
    n: "1",
    title: "Upload or Type",
    desc: "Drop a video/image or describe your idea in words",
  },
  {
    emoji: "🎨",
    n: "2",
    title: "Pick Style & Mood",
    desc: "Choose Cinematic, Anime, Realistic, 3D and more",
  },
  {
    emoji: "⚡",
    n: "3",
    title: "Hit Generate",
    desc: "AI crafts a detailed prompt in under 3 seconds",
  },
  {
    emoji: "📋",
    n: "4",
    title: "Copy & Use",
    desc: "Paste into Sora, Midjourney or Runway — done!",
  },
];

export default function HomePage() {
  return (
    <div
      style={{
        background: "#F8F6FF",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Navbar />

      {/* HERO */}
      <section
        style={{
          paddingTop: 100,
          paddingBottom: 64,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(224,64,251,0.14) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "5%",
            width: 340,
            height: 340,
            background:
              "radial-gradient(ellipse, rgba(255,107,53,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            right: "5%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(33,150,243,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 840,
            margin: "0 auto",
            padding: "0 20px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg,#FFE8D6,#F5E8FF)",
              border: "1.5px solid #FFCFB0",
              borderRadius: 100,
              padding: "8px 20px",
              marginBottom: 28,
              fontSize: 13,
              fontWeight: 700,
              color: "#C4440A",
            }}
          >
            <img
              src={LOGO}
              alt=""
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                objectFit: "cover",
              }}
            />
            AI Prompt Generator · 100% Free · No Sign-up Needed
          </div>
          <h1
            style={{
              fontSize: "clamp(32px,6vw,66px)",
              fontWeight: 800,
              color: "#1A1A2E",
              lineHeight: 1.08,
              letterSpacing: "-2px",
              marginBottom: 20,
            }}
          >
            Turn Any Video or Image
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg,#FF6B35 0%,#E040FB 50%,#2196F3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Into the Perfect AI Prompt
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px,2vw,19px)",
              color: "#666",
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto 38px",
            }}
          >
            No skill needed. Upload your video or image, pick a style, and get a
            ready-to-use prompt for Sora, Midjourney, Runway and 8+ more tools.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <a
              href="/generate"
              style={{
                padding: "16px 36px",
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 800,
                background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(224,64,251,0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ✨ Generate Free Prompt
            </a>
            <a
              href="/about"
              style={{
                padding: "16px 36px",
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 700,
                background: "#fff",
                color: "#333",
                border: "2px solid #E4DAFF",
                textDecoration: "none",
              }}
            >
              ▶ How It Works
            </a>
          </div>
          <div style={{ marginTop: 48 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#BBB",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              Works for prompts used in
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
              }}
            >
              {tools.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 14px",
                    background: "#fff",
                    border: "1.5px solid #EAE0FF",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#666",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          borderTop: "1.5px solid #EAE0FF",
          borderBottom: "1.5px solid #EAE0FF",
          background: "#fff",
          padding: "26px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 20,
            textAlign: "center",
          }}
        >
          {[
            ["100%", "Free Forever"],
            ["3 Modes", "Video · Image · Text"],
            ["8+ Styles", "Cinematic, Anime & more"],
            ["<3 sec", "Generation Speed"],
          ].map(([v, l]) => (
            <div key={l}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 4,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#AAA",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "68px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 800,
                color: "#1A1A2E",
                letterSpacing: "-1px",
                marginBottom: 10,
              }}
            >
              Everything You Need
            </h2>
            <p style={{ color: "#888", fontSize: 16 }}>
              One tool. All the features. Zero cost.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
              gap: 16,
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "22px",
                  border: "1.5px solid #F0EAFF",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(224,64,251,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.04)";
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    background: f.bg,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 14,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1A1A2E",
                    marginBottom: 7,
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.65 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          background: "#fff",
          padding: "68px 20px",
          borderTop: "1.5px solid #EAE0FF",
          borderBottom: "1.5px solid #EAE0FF",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 800,
                color: "#1A1A2E",
                letterSpacing: "-1px",
                marginBottom: 10,
              }}
            >
              4 Simple Steps
            </h2>
            <p style={{ color: "#888", fontSize: 16 }}>
              Upload → Style → Generate → Copy. Done in 10 seconds.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 28,
            }}
          >
            {steps.map((s) => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    background: "linear-gradient(135deg,#FFE8D6,#F5E8FF)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    margin: "0 auto 14px",
                  }}
                >
                  {s.emoji}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#CCC",
                    letterSpacing: 3,
                    marginBottom: 7,
                    textTransform: "uppercase",
                  }}
                >
                  Step {s.n}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#1A1A2E",
                    marginBottom: 7,
                  }}
                >
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: "#999", lineHeight: 1.65 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "68px 20px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              background: "linear-gradient(135deg,#FF6B35,#E040FB)",
              borderRadius: 28,
              padding: "clamp(36px,6vw,64px) clamp(20px,5vw,52px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 220,
                height: 220,
                background: "rgba(255,255,255,0.08)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -60,
                left: -60,
                width: 250,
                height: 250,
                background: "rgba(255,255,255,0.06)",
                borderRadius: "50%",
              }}
            />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 46, marginBottom: 12 }}>✨</div>
              <h2
                style={{
                  fontSize: "clamp(20px,4vw,34px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-1px",
                  marginBottom: 12,
                }}
              >
                Ready to Create Better Prompts?
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: 16,
                  marginBottom: 28,
                }}
              >
                No sign-up. No credit card. Just generate and use.
              </p>
              <a
                href="/generate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 38px",
                  background: "#fff",
                  color: "#E040FB",
                  borderRadius: 14,
                  fontSize: 16,
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                Start Generating Free →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1.5px solid #EAE0FF",
          padding: "26px 20px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <img
              src={LOGO}
              alt=""
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: 800, fontSize: 17, color: "#1A1A2E" }}>
              Prompt
              <span
                style={{
                  background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ly
              </span>
            </span>
          </a>
          <p style={{ color: "#CCC", fontSize: 12, fontWeight: 500 }}>
            © 2026 Promptly · Free AI Prompt Generator · Powered by Groq &
            Gemini
          </p>
          <div style={{ display: "flex", gap: 18 }}>
            {[
              ["Generator", "/generate"],
              ["History", "/history"],
              ["About", "/about"],
            ].map(([l, h]) => (
              <a
                key={h}
                href={h}
                style={{
                  color: "#999",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
