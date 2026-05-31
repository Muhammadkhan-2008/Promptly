export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, stream = true, file } = body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.gemini;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in the server." },
        { status: 500 }
      );
    }

    const lastMessage = messages[messages.length - 1].content;
    const parts = [{ text: lastMessage }];

    if (file && file.data && file.mimeType) {
      parts.unshift({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data,
        },
      });
    }

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: parts,
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.8,
      },
    };

    const url = stream
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", err);
      return Response.json({ error: err }, { status: response.status });
    }

    if (!stream) {
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return Response.json({ choices: [{ message: { content: text } }] });
    }

    // Streaming response using SSE format identical to Groq
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
            if (!trimmed || trimmed.startsWith("data: [DONE]")) continue;
            
            if (trimmed.startsWith("data: ")) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  // Re-encode into OpenAI compatible SSE format so frontend parser works seamlessly
                  const openAiChunk = { choices: [{ delta: { content: text } }] };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(openAiChunk)}\n\n`));
                }
              } catch (e) {
                // skip malformed
              }
            }
          }
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Gemini route error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
