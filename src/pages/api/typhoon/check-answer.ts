import type { NextApiRequest, NextApiResponse } from "next";
import { courses } from "@/constants/courses"; // Adjust import path
import { ChapterType } from "@/interfaces/course";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { question, solution, answer, slug } = req.body;

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
              "You are a knowledgeable and friendly learing assistant specialized in Generative AI. You are copilot of the learning course. Please check if the student answer is correct or not. If not, provide the correct answer. The answer maybe not exactly the same as the student's answer. Try to compromise and understand the student's attentions. Answer concisely and clearly. You must answer only in Thai."
          },
          ...(courseContent ? [{ role: "system", content: `Course Content: ${courseContent}` }] : []),
          {
            role: "system",
            content: `Question: ${question}? \n\n Solution: ${solution}`
          },
          {
            role: "user",
            content: `Answer: ${answer}. Is the answer correct? Either it's correct or not, Please explain me shortly on the reason of the right answer.`
          }
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
