export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, stream = true } = body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          stream,
          temperature: 0.8,
          max_tokens: 2048,
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return Response.json({ error: err }, { status: response.status });
    }

    // Non-streaming: return JSON directly
    if (!stream) {
      const data = await response.json();
      return Response.json(data);
    }

    // Streaming: Parse SSE from Groq and stream back plain text only
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop();

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === "data: [DONE]") continue;
            if (trimmed.startsWith("data: ")) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const text = json.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(encoder.encode(text));
              } catch (e) {
                /* skip malformed */
              }
            }
          }
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Groq route error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
