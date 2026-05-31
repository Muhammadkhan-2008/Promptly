"use client";
import Navbar from "@/components/Navbar";

const LOGO =
  "https://raw.createusercontent.com/2eeffb20-0d06-4217-b99c-799e258d97fa/";
const whyList = [
  "100% Free — no subscription, no credit card ever",
  "Works with any AI-generated or real video/image",
  "Supports all major AI creation tools",
  "Identifies people, objects, styles & moods in visuals",
  "Real-time streaming output — see it generate live",
  "Style presets: Cinematic, Anime, 3D, Realistic & more",
  "Negative prompt control for better, cleaner outputs",
  "3 prompt variations to pick the best one",
  "All prompts auto-saved to your personal history",
];
const compatible = [
  "Sora",
  "Midjourney",
  "Runway ML",
  "DALL·E 3",
  "Stable Diffusion",
  "Kling AI",
  "Pika Labs",
  "Luma Dream Machine",
  "Adobe Firefly",
  "Leonardo AI",
  "Ideogram",
  "Flux",
];
const stack = [
  {
    name: "Groq",
    emoji: "⚡",
    desc: "Ultra-fast LLM inference for AI Builder mode. Results in under 2 seconds.",
    bg: "#FFF8E8",
    color: "#E65100",
  },
  {
    name: "Gemini 2.5 Flash",
    emoji: "🔮",
    desc: "Google's multimodal AI for video & image analysis and prompt reverse-engineering.",
    bg: "#E8F4FF",
    color: "#1565C0",
  },
  {
    name: "SEO Research",
    emoji: "📈",
    desc: "Real-time trending keyword enrichment to make prompts more relevant.",
    bg: "#E8FFF0",
    color: "#2E7D32",
  },
];

export default function AboutPage() {
  const s = {
    background: "#fff",
    borderRadius: 20,
    padding: "24px",
    border: "1.5px solid #F0EAFF",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  };
  return (
    <div
      style={{
        background: "#F8F6FF",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Navbar />

      {/* Hero */}
      <section
        style={{
          paddingTop: 100,
          paddingBottom: 56,
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
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse,rgba(224,64,251,0.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "0 20px",
            position: "relative",
          }}
        >
          <img
            src={LOGO}
            alt="Promptlies"
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              objectFit: "cover",
              margin: "0 auto 20px",
              display: "block",
              boxShadow: "0 8px 28px rgba(224,64,251,0.3)",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(28px,5vw,48px)",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-1.5px",
              marginBottom: 16,
            }}
          >
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Promptlies
            </span>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "#777",
              lineHeight: 1.75,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            The easiest way for creators, designers, and beginners to turn any
            video or image into a studio-quality AI prompt — for free, forever.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section
        style={{
          borderTop: "1.5px solid #EAE0FF",
          borderBottom: "1.5px solid #EAE0FF",
          background: "#fff",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(22px,4vw,32px)",
                fontWeight: 800,
                color: "#1A1A2E",
                letterSpacing: "-1px",
                marginBottom: 16,
              }}
            >
              Why We Built This
            </h2>
            <p
              style={{
                color: "#777",
                lineHeight: 1.8,
                marginBottom: 14,
                fontSize: 15,
              }}
            >
              AI video and image tools are exploding — but great visuals need
              great prompts. Most creators see an amazing AI video and wonder:
              <em style={{ color: "#555" }}>"How do I recreate that?"</em>
            </p>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.7 }}>
              Creating the perfect prompt used to mean hours of trial and error or paying for expensive prompt libraries. 
              <strong> Promptlies solves that.</strong> We give everyone — regardless of budget or 
              technical skill — the ability to translate their imagination (or their existing media) into 
              flawless AI instructions instantly.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {[
              ["🎬", "Video Analysis"],
              ["🖼️", "Image Analysis"],
              ["✍️", "AI Builder"],
              ["⚡", "Instant Results"],
            ].map(([e, l]) => (
              <div
                key={l}
                style={{
                  background: "#F8F6FF",
                  borderRadius: 16,
                  padding: "20px",
                  textAlign: "center",
                  border: "1.5px solid #F0EAFF",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{e}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#555" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Stack */}
      <section style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2
              style={{
                fontSize: "clamp(22px,4vw,32px)",
                fontWeight: 800,
                color: "#1A1A2E",
                letterSpacing: "-1px",
                marginBottom: 10,
              }}
            >
              Powered By The Best
            </h2>
            <p style={{ color: "#888", fontSize: 15 }}>
              We use industry-leading AI to deliver top-quality results at zero
              cost.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 16,
            }}
          >
            {stack.map((ai) => (
              <div key={ai.name} style={{ ...s, textAlign: "center" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: ai.bg,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    margin: "0 auto 14px",
                  }}
                >
                  {ai.emoji}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    color: ai.color,
                    marginBottom: 8,
                  }}
                >
                  {ai.name}
                </div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.65 }}>
                  {ai.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why list + Compatible */}
      <section
        style={{
          borderTop: "1.5px solid #EAE0FF",
          borderBottom: "1.5px solid #EAE0FF",
          background: "#fff",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 36,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(20px,4vw,28px)",
                fontWeight: 800,
                color: "#1A1A2E",
                letterSpacing: "-1px",
                marginBottom: 22,
              }}
            >
              Why Creators Love It
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {whyList.map((w) => (
                <div
                  key={w}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                    ✅
                  </span>
                  <span
                    style={{ fontSize: 13.5, color: "#555", lineHeight: 1.6 }}
                  >
                    {w}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={s}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#AAA",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                marginBottom: 16,
              }}
            >
              Compatible AI Tools
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {compatible.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 13px",
                    background: "#F8F6FF",
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
            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1.5px solid #F0EAFF",
                fontSize: 12,
                color: "#BBB",
                fontWeight: 500,
              }}
            >
              🌐 Works with any AI tool that accepts text prompts
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(22px,4vw,34px)",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-1px",
              marginBottom: 12,
            }}
          >
            Ready to Get Started?
          </h2>
          <p style={{ color: "#AAA", fontSize: 15, marginBottom: 30 }}>
            No account needed. Just upload and generate for free.
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
                padding: "15px 34px",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: 15,
                background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 6px 22px rgba(224,64,251,0.35)",
              }}
            >
              ✨ Generate a Prompt
            </a>
            <a
              href="/history"
              style={{
                padding: "15px 34px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 15,
                background: "#fff",
                color: "#555",
                border: "2px solid #EAE0FF",
                textDecoration: "none",
              }}
            >
              View History →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1.5px solid #EAE0FF",
          padding: "24px 20px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
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
                width: 28,
                height: 28,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: 800, fontSize: 16, color: "#1A1A2E" }}>
              Prompt
              <span
                style={{
                  background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                lies
              </span>
            </span>
          </a>
          <p style={{ color: "#CCC", fontSize: 12 }}>
            © 2026 Promptlies · Free AI Prompt Generator
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              ["Generator", "/generate"],
              ["History", "/history"],
              ["About", "/about"],
            ].map(([l, h]) => (
              <a
                key={h}
                href={h}
                style={{
                  color: "#AAA",
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
