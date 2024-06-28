import { NextApiRequestWithUser, firebaseAuth } from "@/middlewares/auth";
import axios from "axios";
import type { NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequestWithUser {
  body: {
    model: string;
    input: any;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { model, input } = req.body;

  try {
    console.log("model: ", model);
    console.log("input: ", input);
    console.log("key", process.env.REPLICATE_API_KEY);
    const { data } = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version: model,
        input
      },
      {
        headers: {
          Authorization: "Token " + process.env.REPLICATE_API_KEY
        }
      }
    );
    const endpointUrl = data.urls.get;

    let result: any | null = null;
    while (!result) {
      const pollResp = await axios.get(endpointUrl, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`
        }
      });
      const pollResult = await pollResp.data;
      if (pollResult.status === "succeeded") {
        result = pollResult.output;
      } else if (pollResult.status === "failed") {
        console.log("pollResult: ", pollResult);
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    res.status(200).json({ message: "Success", result });
  } catch (error) {
    console.error("Error replicating model: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default firebaseAuth(handler);
