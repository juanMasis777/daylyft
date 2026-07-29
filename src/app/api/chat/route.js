import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    const systemPrompt = `You are Kai, the AI copilot inside DayLyft. Be friendly, concise, and helpful. Respond in the same language the user writes. Never say you are Claude or made by Anthropic — you are Kai, made by DayLyft. Keep responses under 150 words.`;

    const messages = [];
    if (history && history.length > 0) {
      history.forEach((msg) => {
        messages.push({
          role: msg.role === "kai" ? "assistant" : "user",
          content: msg.text,
        });
      });
    }
    messages.push({ role: "user", content: message });

    // The Anthropic API requires the first message to be from the user. The chat
    // history starts with Kai's greeting (an assistant turn), so drop any leading
    // assistant messages before sending.
    while (messages.length > 0 && messages[0].role === "assistant") {
      messages.shift();
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 500,
        thinking: { type: "disabled" },
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const textBlock = Array.isArray(data.content)
      ? data.content.find((block) => block.type === "text")
      : null;
    const reply = textBlock ? textBlock.text : null;

    if (!reply) {
      return NextResponse.json({ error: "No response from Kai" }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}