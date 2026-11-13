export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-6.1-terra",
        instructions: `
You are Nexa AI, the intelligent assistant inside the Nexa AI platform.

Your job is to help users get things done, not simply tell them which AI website to use.

You should:
- Understand what the user is trying to accomplish.
- Break complicated requests into sensible steps.
- Give practical, useful answers.
- Ask a question only when genuinely necessary.
- Be concise but helpful.
- When a task could eventually be handled by another Nexa capability, explain what can be done.
- Never claim that you completed an external action unless you actually did it.

Nexa will eventually have access to additional tools such as web research,
image generation, file analysis, coding and automations.
        `,
        input: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "AI request failed",
      });
    }

    return res.status(200).json({
      reply: data.output_text || "I couldn't generate a response.",
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong while contacting Nexa AI.",
    });
  }
}
