import type { NextApiRequest, NextApiResponse } from "next";
import { courses } from "@/constants/courses"; // Adjust import path
import { ChapterType, Quiz } from "@/interfaces/course";
import { Message, MessageType } from "@/hooks/use-user";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages, slug } = req.body;

  try {
    let allStrings: string[] = [];
    // Fetch the course content based on the slug if provided
    if (slug && courses[slug]) {
      const course = courses[slug];
      // Extract text content from course chapters
      allStrings = course.pages
        .map((page) =>
          page.chapters
            .filter((chapter) => chapter.type === ChapterType.TEXT || chapter.type === ChapterType.AI_CONTEXT)
            .map((chapter) => `name: "${chapter.name}", content: "${chapter.content}"`)
            .join("\n\n")
        )
        .flat();
    }
    let courseContent: string = allStrings.join(" ");

    const response = await fetch("https://api.opentyphoon.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TYPHOON_API_KEY}`
      },
      body: JSON.stringify({
        model: "typhoon-v1.5x-70b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable and friendly assistant specialized in Generative AI and educational content. Please provide detailed and helpful answers to the users' queries."
          },
          ...(courseContent ? [{ role: "system", content: `Course Content: ${courseContent}` }] : []),
          ...messages
            .filter((msg: Message) => msg.type == MessageType.TEXT || msg.type == MessageType.QUIZ)
            .map((msg: Message) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.type == MessageType.TEXT ? (msg.content as string) : (msg.content as Quiz).question
            }))
        ],
        max_tokens: 4096,
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
