"use client";
import { useState } from "react";
import { Upload, Copy, Check, X, Search, Sparkles } from "lucide-react";
import useHandleStreamResponse from "@/utils/useHandleStreamResponse";
import { toast, Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const LOGO =
  "https://raw.createusercontent.com/2eeffb20-0d06-4217-b99c-799e258d97fa/";

const MODES = [
  {
    id: "video",
    label: "🎬 Video → Prompt",
    accept: "video/*",
    hint: "MP4, MOV, WEBM · max 10MB",
  },
  {
    id: "image",
    label: "🖼️ Image → Prompt",
    accept: "image/*",
    hint: "JPG, PNG, WEBP · max 5MB",
  },
  {
    id: "text",
    label: "✍️ AI Builder",
    accept: null,
    hint: "Just describe your idea",
  },
];

const STYLES = [
  "🎬 Cinematic",
  "🎨 Anime",
  "🖼️ Realistic",
  "🔮 3D Render",
  "🌊 Watercolor",
  "🌃 Neon Cyberpunk",
  "🏛️ Fantasy",
  "📸 Photography",
];
const MOODS = [
  "🌅 Dramatic",
  "☀️ Bright & Vivid",
  "🌑 Dark & Moody",
  "🌿 Peaceful",
  "💥 Epic & Intense",
  "🌸 Soft & Dreamy",
];
const LENGTHS = [
  { id: "short", label: "⚡ Quick", sub: "~50 words" },
  { id: "medium", label: "📝 Standard", sub: "~120 words" },
  { id: "long", label: "🔍 Detailed", sub: "~250 words" },
];
const CAMERAS = [
  "Auto",
  "Close-up",
  "Wide Shot",
  "Bird's Eye",
  "Low Angle",
  "Drone Shot",
  "Tracking Shot",
];

const card = {
  background: "#fff",
  borderRadius: 20,
  padding: "20px",
  border: "1.5px solid #F0EAFF",
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  marginBottom: 16,
};
const label = {
  fontSize: 10,
  fontWeight: 800,
  color: "#AAA",
  textTransform: "uppercase",
  letterSpacing: 2.5,
  marginBottom: 12,
  display: "block",
};

export default function GeneratePage() {
  const [mode, setMode] = useState("text");
  const [style, setStyle] = useState("🎬 Cinematic");
  const [mood, setMood] = useState("🌅 Dramatic");
  const [length, setLength] = useState("medium");
  const [camera, setCamera] = useState("Auto");
  const [focus, setFocus] = useState("");
  const [textIdea, setTextIdea] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [variations, setVariations] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploadedName, setUploadedName] = useState(null);
  const [copied, setCopied] = useState(null);
  const [dropActive, setDropActive] = useState(false);
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [seoLoading, setSeoLoading] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: (text) => setPrompt(text),
    onFinish: (text) => {
      setPrompt(text);
      setIsGenerating(false);
      saveToHistory(text, mode, uploadedUrl);
    },
  });

  const saveToHistory = async (content, type, url) => {
    try {
      await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, source_type: type, source_url: url }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const processFile = async (file) => {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File is too large. Max 15MB allowed.");
      return;
    }
    
    setIsUploading(true);

    if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      
      video.onloadeddata = () => {
        video.currentTime = Math.min(1, video.duration / 2);
      };
      
      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64Data = canvas.toDataURL("image/jpeg").split(",")[1];
        
        setUploadedUrl({ data: base64Data, mimeType: "image/jpeg" });
        setUploadedName(file.name);
        setIsUploading(false);
        toast.success("Video frame ready for AI analysis!");
      };
      
      video.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to process video.");
      };
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      setUploadedUrl({ data: base64Data, mimeType: file.type });
      setUploadedName(file.name);
      setIsUploading(false);
      toast.success("Image ready for AI analysis!");
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const boostSeo = async () => {
    const q = focus || textIdea;
    if (!q) {
      toast.error("Enter a focus or idea first");
      return;
    }
    setSeoLoading(true);
    try {
      const res = await fetch(
        `/integrations/seo-keyword-research/keynew.php?keyword=${encodeURIComponent(q)}&country=us`,
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setSeoKeywords(data.slice(0, 6).map((k) => k.text));
        toast.success("Keywords found!");
      }
    } catch {
      toast.error("Keyword fetch failed");
    }
    setSeoLoading(false);
  };

  const buildSystemPrompt = () => {
    const lengthWords =
      length === "short" ? "20-40" : length === "medium" ? "60-100" : "150-250";
    const cameraLine = camera !== "Auto" ? `Camera & Angles: ${camera}.` : "";
    const negLine = negativePrompt ? `Do NOT include: ${negativePrompt}.` : "";
    const seoLine = seoKeywords.length
      ? `Naturally include these concepts: ${seoKeywords.join(", ")}.`
      : "";
    const focusLine = focus ? `Focus specifically on: ${focus}.` : "";
    
    return `You are an elite, highly creative AI prompt engineer and visual analyst. Your task is to generate an extraordinary, vivid, and deeply imaginative image/video generation prompt (for Midjourney v6, Sora, etc.).
- Target Length: ${lengthWords} words.
- Style/Medium: ${style}. 
- Mood/Atmosphere: ${mood}. 
${cameraLine ? `- ${cameraLine}` : ""}
${focusLine ? `- ${focusLine}` : ""}
${negLine ? `- ${negLine}` : ""}
${seoLine ? `- ${seoLine}` : ""}

INSTRUCTIONS FOR TEXT/IDEA: 
If given a short idea, DO NOT just mechanically translate it into a rigid format. Expand on it! Add brilliant artistic flair, describe breathtaking lighting (volumetric, bioluminescent, cinematic), unique textures, and a captivating environment. Make the scene feel ALIVE and cinematic. 

INSTRUCTIONS FOR IMAGES/VIDEOS:
If given an image or video, act as a master observer. Analyze the exact subjects, colors, the mood of the scene, the specific camera angle, and tiny details (like reflections, weathering, emotional expressions). Then write a prompt that brilliantly reconstructs the essence and visual magic of that exact scene.

FORMATTING:
Do not use lists or robotic structures. Write a flowing, highly descriptive, evocative paragraph separated by commas or short sentences. 
DO NOT output any conversational text, labels, or explanations. ONLY output the raw prompt itself.`;
  };

  const generate = async () => {
    if (mode !== "text" && !uploadedUrl) {
      toast.error("Upload a file first");
      return;
    }
    if (mode === "text" && !textIdea.trim()) {
      toast.error("Describe your idea first");
      return;
    }

    setIsGenerating(true);
    setPrompt("");
    setPrompts([]);
    const sys = buildSystemPrompt();

    const userMsg =
      mode === "text"
        ? `Create a detailed AI generation prompt for this idea: "${textIdea}"`
        : `Analyze this attached ${mode} closely. Extract its key visual elements, lighting, composition, mood, and style. Then, create a detailed AI generation prompt that could recreate it flawlessly.`;

    try {
      if (variations) {
        // Generate 3 variations non-streaming
        const isVision = mode === "video" || mode === "image";
        const endpoint = isVision ? "/api/gemini" : "/api/groq";
        const body = isVision
          ? {
              messages: [{ role: "user", content: `${sys}\n\n${userMsg}\n\nGenerate 3 different prompt variations. Separate each with "---VARIATION---". Each should be distinct in approach but same style/mood.` }],
              file: uploadedUrl,
              stream: false,
            }
          : {
              messages: [
                { role: "system", content: sys },
                {
                  role: "user",
                  content: `${userMsg}\n\nGenerate 3 different prompt variations. Separate each with "---VARIATION---". Each should be distinct in approach but same style/mood.`,
                },
              ],
              stream: false,
            };

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Generation failed");
        const data = await res.json();
        const full = data.choices?.[0]?.message?.content || "";
        const parts = full
          .split("---VARIATION---")
          .map((p) => p.trim())
          .filter(Boolean);
        setPrompts(parts.length >= 2 ? parts : [full]);
        setIsGenerating(false);
        await saveToHistory(full, mode, uploadedUrl?.data ? "local-file" : null);
      } else {
        // Single streaming
        const isVision = mode === "video" || mode === "image";
        const endpoint = isVision ? "/api/gemini" : "/api/groq";
        const body = isVision
          ? {
              messages: [{ role: "user", content: `${sys}\n\n${userMsg}` }],
              file: uploadedUrl,
              stream: true,
            }
          : {
              messages: [
                { role: "system", content: sys },
                { role: "user", content: userMsg },
              ],
              stream: true,
            };

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        handleStreamResponse(res);
      }
    } catch (e) {
      toast.error("Generation failed. Try again.");
      setIsGenerating(false);
      console.error(e);
    }
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  const pilltag = (text, active, onClick) => (
    <button
      key={text}
      onClick={onClick}
      style={{
        padding: "7px 14px",
        borderRadius: 100,
        fontSize: 12.5,
        fontWeight: 600,
        border: "1.5px solid",
        borderColor: active ? "#E040FB" : "#EAE0FF",
        background: active ? "#F5E8FF" : "#fff",
        color: active ? "#9C27B0" : "#888",
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </button>
  );

  return (
    <div
      style={{
        background: "#F8F6FF",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Navbar />
      <Toaster position="top-center" richColors />

      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 20px 60px" }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <img
              src={LOGO}
              alt=""
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                objectFit: "cover",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(24px,4vw,36px)",
                fontWeight: 800,
                color: "#1A1A2E",
                letterSpacing: "-1px",
              }}
            >
              Prompt{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Generator
              </span>
            </h1>
          </div>
          <p style={{ color: "#888", fontSize: 15 }}>
            Upload a file or describe your idea. Pick a style. Get a perfect AI
            prompt instantly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
            gap: 20,
          }}
          className="gen-grid"
        >
          {/* ─── LEFT PANEL ─── */}
          <div>
            {/* Mode */}
            <div style={card}>
              <span style={label}>Mode</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMode(m.id);
                      setUploadedUrl(null);
                      setUploadedName(null);
                      setPrompt("");
                      setPrompts([]);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 14,
                      border: "1.5px solid",
                      borderColor: mode === m.id ? "#E040FB" : "#EAE0FF",
                      background:
                        mode === m.id
                          ? "linear-gradient(135deg,#FFE8F5,#F0E8FF)"
                          : "#FAFAFA",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: mode === m.id ? "#9C27B0" : "#555",
                        flex: 1,
                      }}
                    >
                      {m.label}
                    </span>
                    <span
                      style={{ fontSize: 10, color: "#BBB", fontWeight: 600 }}
                    >
                      {m.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div style={card}>
              <span style={label}>Style</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {STYLES.map((s) => pilltag(s, style === s, () => setStyle(s)))}
              </div>
            </div>

            {/* Mood */}
            <div style={card}>
              <span style={label}>Mood / Atmosphere</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {MOODS.map((m) => pilltag(m, mood === m, () => setMood(m)))}
              </div>
            </div>

            {/* Length */}
            <div style={card}>
              <span style={label}>Prompt Length</span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {LENGTHS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLength(l.id)}
                    style={{
                      padding: "10px 8px",
                      borderRadius: 12,
                      border: "1.5px solid",
                      borderColor: length === l.id ? "#E040FB" : "#EAE0FF",
                      background: length === l.id ? "#F5E8FF" : "#FAFAFA",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: length === l.id ? "#9C27B0" : "#555",
                      }}
                    >
                      {l.label}
                    </div>
                    <div style={{ fontSize: 10, color: "#AAA", marginTop: 2 }}>
                      {l.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera */}
            <div style={card}>
              <span style={label}>📷 Camera Angle</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {CAMERAS.map((c) =>
                  pilltag(c, camera === c, () => setCamera(c)),
                )}
              </div>
            </div>

            {/* Variations toggle */}
            <div
              style={{
                ...card,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E" }}
                >
                  🔢 3 Variations
                </div>
                <div style={{ fontSize: 12, color: "#AAA", marginTop: 3 }}>
                  Generate 3 different versions to pick from
                </div>
              </div>
              <div
                onClick={() => setVariations(!variations)}
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 13,
                  background: variations
                    ? "linear-gradient(135deg,#FF6B35,#E040FB)"
                    : "#E0E0E0",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: variations ? 25 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    transition: "left 0.2s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div>
            {/* Upload zone */}
            {mode !== "text" && (
              <div style={card}>
                <span style={label}>
                  {mode === "video" ? "📤 Upload Video" : "📤 Upload Image"}
                </span>
                {uploadedUrl ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      background: "#EDFFF5",
                      border: "1.5px solid #6FCF97",
                      borderRadius: 14,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>✅</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#27AE60",
                        }}
                      >
                        File ready to analyze
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#AAA",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {uploadedName}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedUrl(null);
                        setUploadedName(null);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#AAA",
                        padding: 4,
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDropActive(true);
                    }}
                    onDragLeave={() => setDropActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDropActive(false);
                      processFile(e.dataTransfer.files?.[0]);
                    }}
                    style={{
                      position: "relative",
                      border: `2px dashed ${dropActive ? "#E040FB" : "#D4C8FF"}`,
                      borderRadius: 16,
                      padding: "36px 20px",
                      textAlign: "center",
                      background: dropActive ? "#FBF0FF" : "#FAFAFA",
                      transition: "all 0.15s",
                    }}
                  >
                    <input
                      type="file"
                      accept={MODES.find((m2) => m2.id === mode)?.accept}
                      onChange={(e) => processFile(e.target.files?.[0])}
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        cursor: "pointer",
                        zIndex: 2,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <div style={{ fontSize: 36, marginBottom: 10 }}>
                      {isUploading ? "⏳" : "📁"}
                    </div>
                    <div
                      style={{ fontWeight: 700, fontSize: 14, color: "#555" }}
                    >
                      {isUploading
                        ? "Uploading..."
                        : "Drop file here or click to browse"}
                    </div>
                    <div style={{ fontSize: 12, color: "#BBB", marginTop: 4 }}>
                      {MODES.find((m2) => m2.id === mode)?.hint}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Idea / Focus input */}
            <div style={card}>
              <span style={label}>
                {mode === "text" ? "💡 Your Idea" : "🎯 Focus (optional)"}
              </span>
              <textarea
                value={mode === "text" ? textIdea : focus}
                onChange={(e) =>
                  mode === "text"
                    ? setTextIdea(e.target.value)
                    : setFocus(e.target.value)
                }
                placeholder={
                  mode === "text"
                    ? "Describe the scene, character, or concept you want to generate…"
                    : "E.g. 'the man in the red jacket', 'the lighting', 'the camera movement'…"
                }
                style={{
                  width: "100%",
                  background: "#F8F6FF",
                  border: "1.5px solid #EAE0FF",
                  borderRadius: 14,
                  padding: "14px 16px",
                  fontSize: 14,
                  color: "#333",
                  fontFamily: "inherit",
                  resize: "none",
                  minHeight: 100,
                  outline: "none",
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Negative prompt */}
            <div style={card}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span style={{ ...label, marginBottom: 0 }}>
                  🚫 Negative Prompt
                </span>
                <span style={{ fontSize: 11, color: "#BBB" }}>
                  What to avoid
                </span>
              </div>
              <input
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="E.g. blurry, watermark, cartoon, bad lighting…"
                style={{
                  width: "100%",
                  background: "#FFF5F5",
                  border: "1.5px solid #FFD6D6",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 13,
                  color: "#333",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>

            {/* SEO boost */}
            <div style={card}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span style={label}>📈 Trend Keywords</span>
                <button
                  onClick={boostSeo}
                  disabled={seoLoading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#FFE8D6,#F5E8FF)",
                    border: "1.5px solid #FFDCC8",
                    color: "#C4440A",
                    cursor: "pointer",
                  }}
                >
                  {seoLoading ? "⏳" : <Search size={11} />} Find Keywords
                </button>
              </div>
              {seoKeywords.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {seoKeywords.map((k, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "5px 11px",
                        background: "#F0FBFF",
                        border: "1.5px solid #B2EBF2",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#00796B",
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 12, color: "#CCC" }}>
                  Enter an idea or focus above, then click "Find Keywords" to
                  enrich your prompt.
                </p>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={isGenerating || isUploading}
              style={{
                width: "100%",
                padding: "17px",
                borderRadius: 16,
                fontSize: 17,
                fontWeight: 800,
                background: isGenerating
                  ? "#DDD"
                  : "linear-gradient(135deg,#FF6B35,#E040FB)",
                color: isGenerating ? "#999" : "#fff",
                border: "none",
                cursor: isGenerating ? "not-allowed" : "pointer",
                boxShadow: isGenerating
                  ? "none"
                  : "0 8px 26px rgba(224,64,251,0.38)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "all 0.2s",
                marginBottom: 16,
              }}
            >
              {isGenerating ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      animation: "promptly-spin 1s linear infinite",
                    }}
                  >
                    ⏳
                  </span>{" "}
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />{" "}
                  {variations ? "Generate 3 Variations" : "Generate Prompt"}
                </>
              )}
            </button>

            {/* Single Output */}
            {prompt && !variations && (
              <div
                style={{
                  background: "#fff",
                  border: "1.5px solid #F0EAFF",
                  borderRadius: 20,
                  padding: "20px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: 16 }}>✨</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#E040FB",
                        textTransform: "uppercase",
                        letterSpacing: 2,
                      }}
                    >
                      Generated Prompt
                    </span>
                  </div>
                  <button
                    onClick={() => copyText(prompt, "main")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 700,
                      background: copied === "main" ? "#EDFFF5" : "#F5E8FF",
                      border: "1.5px solid",
                      borderColor: copied === "main" ? "#6FCF97" : "#E0CCFF",
                      color: copied === "main" ? "#27AE60" : "#9C27B0",
                      cursor: "pointer",
                    }}
                  >
                    {copied === "main" ? (
                      <>
                        <Check size={12} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy
                      </>
                    )}
                  </button>
                </div>
                <div
                  style={{
                    background: "#F8F6FF",
                    border: "1.5px solid #EAE0FF",
                    borderRadius: 14,
                    padding: "16px",
                    fontSize: 14,
                    color: "#333",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                  }}
                >
                  {prompt}
                  {isGenerating && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 3,
                        height: 18,
                        background: "#E040FB",
                        marginLeft: 4,
                        animation: "promptly-blink 1s step-end infinite",
                        verticalAlign: "middle",
                        borderRadius: 2,
                      }}
                    />
                  )}
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                  <a
                    href="/history"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#E040FB",
                      textDecoration: "none",
                    }}
                  >
                    View in History →
                  </a>
                </div>
              </div>
            )}

            {/* Variations Output */}
            {prompts.length > 0 && variations && (
              <div>
                {prompts.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #F0EAFF",
                      borderRadius: 20,
                      padding: "20px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: "#FF6B35",
                          textTransform: "uppercase",
                          letterSpacing: 2,
                        }}
                      >
                        Variation {i + 1}
                      </span>
                      <button
                        onClick={() => copyText(p, i)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "7px 14px",
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          background: copied === i ? "#EDFFF5" : "#FFF5E8",
                          border: "1.5px solid",
                          borderColor: copied === i ? "#6FCF97" : "#FFCCAA",
                          color: copied === i ? "#27AE60" : "#C4440A",
                          cursor: "pointer",
                        }}
                      >
                        {copied === i ? (
                          <>
                            <Check size={12} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      style={{
                        background: "#F8F6FF",
                        border: "1.5px solid #EAE0FF",
                        borderRadius: 14,
                        padding: "14px",
                        fontSize: 13,
                        color: "#333",
                        lineHeight: 1.75,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {p}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes promptly-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes promptly-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 768px) { .gen-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
