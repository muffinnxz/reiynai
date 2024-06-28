import admin from "@/lib/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

// Extend NextApiRequest to include the user property
export interface NextApiRequestWithUser extends NextApiRequest {
  user: string;
}
export const firebaseAuth = <T extends NextApiRequestWithUser>(
  handler: (req: T, res: NextApiResponse) => Promise<void>
) => {
  return async (req: T, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("No token found");

      // Verify the token
      const decodedToken = await admin?.auth().verifyIdToken(token);
      req["user"] = decodedToken?.uid || "";

      // Continue to the Next.js API route
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};
