import { NextApiRequestWithUser, firebaseAuth } from "@/middlewares/auth";
import type { NextApiResponse } from "next";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const { prompt, imageUrl } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
    });
    const result = response.choices[0].message.content;
    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default firebaseAuth(handler);
