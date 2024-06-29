import admin from "@/lib/firebase-admin";
import { NextApiRequestWithUser, firebaseAuth } from "@/middlewares/auth";
import type { NextApiResponse } from "next";
import { UserData } from "@/interfaces/user";

interface PostNextApiRequest extends NextApiRequestWithUser {
  body: {
    question: string;
    answers: string[][];
  };
}

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const fs = admin?.firestore();

  if (!fs) {
    console.log("Firestore not found");
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  const userId = req.user;

  try {
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userRef = fs.collection("users").doc(userId);
    const userData = (await userRef.get()) as UserData;

    if (!userData) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    if (req.method === "POST") {
      const { question, answers } = (req as PostNextApiRequest).body;

      let newAnswers: { [key: string]: string[] } = {};
      for (let i = 0; i < answers.length; i++) {
        newAnswers[i] = answers[i];
      }
      let oldAnswers = userData.answers ?? {};
      oldAnswers[question] = newAnswers;

      await userRef.update({
        answers: oldAnswers
      });

      res.status(200).json({ message: "Success", data: answers });

      return;
    } else if (req.method === "GET") {
      const { question } = req.query;

      res.status(200).json({ message: "Success", data: userData.answers?.question ?? [] });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default firebaseAuth(handler);
