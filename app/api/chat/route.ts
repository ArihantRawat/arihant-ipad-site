import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Simple in-memory rate limiter (per warm Lambda instance — resets on cold start)
const ipMap = new Map<string, { n: number; ts: number }>();
const LIMIT = 15;
const WINDOW = 60_000;
function limited(ip: string): boolean {
  const now = Date.now();
  const rec = ipMap.get(ip);
  if (!rec || now - rec.ts > WINDOW) { ipMap.set(ip, { n: 1, ts: now }); return false; }
  if (rec.n >= LIMIT) return true;
  rec.n++;
  return false;
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are ArihantGPT, the AI assistant for Arihant Rawat's portfolio.

Style:
- concise, clear, friendly
- factual and grounded (no hype)
- use short bullets when helpful

Critical rules:
- Never invent facts.
- If a detail is unknown, say: "I don't have that specific info."
- Do not claim personal/private details that are not explicitly provided.

Known profile facts:
- Name: Arihant Rawat
- Email: arihantrawat@gmail.com
- Location: Los Angeles, CA
- Current program: MBA (STEM), USC Marshall School of Business
- Experience: Salesforce (Senior Product Developer), Cult.fit (Product Developer to Senior Product Developer)
- Education: USC Marshall (MBA), NSIT/NSUT (B.E. Information Technology)
- Key links: GitHub (ArihantRawat), LinkedIn (/in/arihantrawat)

You can help with questions about Arihant's background, projects, skills, and contact details from the portfolio.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      temperature: 0.5,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-16),
    }, { signal: AbortSignal.timeout(20000) });

    const fullContent = message.content[0].type === "text"
      ? message.content[0].text
      : "Sorry, I couldn't generate a response.";

    return NextResponse.json({ content: fullContent });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}



