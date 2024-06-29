import admin from "@/lib/firebase-admin";
import { NextApiRequestWithUser, firebaseAuth } from "@/middlewares/auth";
import type { NextApiResponse } from "next";
import { UserData } from "@/interfaces/user";

interface ExtendedNextApiRequest extends NextApiRequestWithUser {
  body: {
    answers: string[][];
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin?.firestore();

  if (!fs) {
    console.log("Firestore not found");
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  const userId = req.user;
  let { answers } = req.body;

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

    let newAnswers: { [key: string]: string[] } = {};
    for (let i = 0; i < answers.length; i++) {
      newAnswers[i] = answers[i];
    }
    let oldAnswers = userData.answers ?? {};
    oldAnswers["onboarding"] = newAnswers;

    await userRef.update({
      answers: oldAnswers
    });

    res.status(200).json({ message: "Success", data: answers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default firebaseAuth(handler);
