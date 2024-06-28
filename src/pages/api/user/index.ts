import admin from "@/lib/firebase-admin";
import { NextApiRequestWithUser, firebaseAuth } from "@/middlewares/auth";
import type { NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequestWithUser {
  body: {
    name: string;
    email: string;
    avatar: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin?.firestore();

  if (!fs) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  const userId = req.user;
  const { name, email, avatar } = req.body;

  try {
    const userRef = fs.collection("users").doc(userId);
    const userData = await userRef.get();

    if (userData.exists) {
      res.status(200).json({ message: "Success", data: userData.data() });
      return;
    }

    const user = {
      id: userId,
      name,
      email,
      avatar
    };

    await userRef.set(user);

    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default firebaseAuth(handler);
