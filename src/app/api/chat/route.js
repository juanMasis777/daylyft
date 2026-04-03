import { NextResponse } from "next/server";

export async function POST(request) {
try {
const { message, history } = await request.json();
console.log("1. Message received:", message);

const systemPrompt = `You are Kai, the AI copilot inside FlowMind. Be friendly, concise, and helpful. Respond in the same language the user writes. Never say you are Claude or made by Anthropic — you are Kai, made by FlowMind. Keep responses under 150 words.`;

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
console.log("2. Messages built, calling API...");

const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: systemPrompt,
    messages: messages,
    }),
});

console.log("3. API status:", response.status);
const data = await response.json();
console.log("4. API data:", JSON.stringify(data).substring(0, 200));

if (data.error) {
    return NextResponse.json({ error: data.error.message }, { status: 500 });
}

const reply = data.content[0].text;
return NextResponse.json({ reply });
} catch (error) {
console.log("CATCH ERROR:", error.message);
return NextResponse.json({ error: error.message }, { status: 500 });
}
}