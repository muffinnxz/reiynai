import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body;

  try {
    const response = await fetch("https://api.opentyphoon.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TYPHOON_API_KEY}`
      },
      body: JSON.stringify({
        model: "typhoon-v1.5-instruct",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. You must answer only in Thai."
          },
          ...messages.map((msg: { type: string; text: string }) => ({
            role: msg.type,
            content: msg.text
          }))
        ],
        max_tokens: 1600,
        temperature: 0.7,
        top_p: 1,
        top_k: 50,
        repetition_penalty: 1.15,
        stream: false
      })
    });

    if (!response.ok) {
      console.error("API response status:", response.status);
      throw new Error("Failed to fetch the response from Open Typhoon API");
    }

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
