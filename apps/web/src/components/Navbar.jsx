import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const LOGO =
  "https://raw.createusercontent.com/2eeffb20-0d06-4217-b99c-799e258d97fa/";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Generator", href: "/generate" },
    { label: "History", href: "/history" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        .nav-link:hover { background: #FFF0F5 !important; color: #E040FB !important; }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "2px solid #F5EEFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 66,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(224,64,251,0.3)",
                flexShrink: 0,
              }}
            >
              <img
                src={LOGO}
                alt="Promptly"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 22,
                color: "#1A1A2E",
                letterSpacing: "-0.5px",
              }}
            >
              Prompt
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #E040FB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ly
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link"
                style={{
                  padding: "8px 18px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#555",
                  textDecoration: "none",
                  transition: "all 0.18s",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/generate"
              className="nav-cta"
              style={{
                marginLeft: 10,
                padding: "10px 24px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                background: "linear-gradient(135deg, #FF6B35, #E040FB)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(224,64,251,0.35)",
                transition: "all 0.2s",
              }}
            >
              ✨ Try Free
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="nav-hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: "#333",
              display: "none",
              alignItems: "center",
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              borderTop: "2px solid #F5EEFF",
              background: "#fff",
              padding: "12px 24px 20px",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "13px 16px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#444",
                  textDecoration: "none",
                  marginBottom: 2,
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/generate"
              style={{
                display: "block",
                textAlign: "center",
                padding: "13px",
                borderRadius: 12,
                fontWeight: 700,
                background: "linear-gradient(135deg, #FF6B35, #E040FB)",
                color: "#fff",
                textDecoration: "none",
                marginTop: 10,
                fontSize: 15,
              }}
            >
              ✨ Try Free
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
