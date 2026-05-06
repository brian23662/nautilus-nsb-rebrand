import { NextResponse } from 'next/server';

/**
 * POST /api/chat
 *
 * Body: { messages: [{role, content}, ...] }
 *
 * If ANTHROPIC_API_KEY is set, this proxies to Claude and returns a real reply.
 * Otherwise it falls back to a tiny rules-based FAQ so the widget still
 * works in development.
 */
export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ reply: 'Ask me anything about Nautilus!' });
  }

  const lastUser = [...messages].reverse().find((m: any) => m.role === 'user');
  const userText: string = lastUser?.content?.toLowerCase() ?? '';

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: faqFallback(userText) });
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system:
          "You are the friendly assistant for Nautilus Fitness NSB, a community gym in New Smyrna Beach, FL. Be warm, concise, and helpful. The gym offers group classes (Essentrics, Cardio Sculpt, Yoga, Functional Strength, Silver Sneakers, Fit For Life, Tone Sculpt & Stretch, Zumba, Pilates), personal training, and Forever Health & Wellness coaching (nutrition, bio-therapy). Members get 24/7 access. For specific class times, send people to the schedule on the page or to email hello@nautilusnsb.com. Keep replies under 80 words and avoid making up facts you don't know.",
        messages: messages.map((m: any) => ({
          role: m.role,
          content: m.content
        }))
      })
    });

    const data = await res.json();
    const reply =
      data?.content?.[0]?.text ??
      "I'm not sure about that one — but the team can help. Email hello@nautilusnsb.com.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat API failed', err);
    return NextResponse.json({ reply: faqFallback(userText) });
  }
}

/* Simple keyword-driven FAQ — used when no API key is configured */
function faqFallback(text: string): string {
  if (/hour|open|24|when/.test(text)) {
    return 'Members get 24/7 access. The front desk is staffed during regular business hours — drop by anytime for a tour!';
  }
  if (/class|schedule|zumba|pilates|yoga|essentrics|cardio/.test(text)) {
    return 'You can find our full class lineup in the Classes section above — toggle to "Live Schedule" to see this week\'s times. Want a specific class? Just ask!';
  }
  if (/train|coach|wellness|nutrition/.test(text)) {
    return 'Our Forever Health & Wellness program covers personal training, nutrition planning, and bio-therapy. Book a free consultation from the Wellness section.';
  }
  if (/price|cost|join|member/.test(text)) {
    return 'Drop us a message via the contact form and we\'ll send you membership options that fit your goals — no pressure.';
  }
  if (/where|location|address/.test(text)) {
    return 'We\'re located in New Smyrna Beach, FL. The full address is in the Contact section above.';
  }
  return "Great question! For specifics, the best move is the contact form above — or email hello@nautilusnsb.com and we'll get back to you within a business day.";
}
