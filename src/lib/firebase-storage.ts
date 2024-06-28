import axios from "@/lib/axios";
import admin from "./firebase-admin";

const storage = admin?.storage();
const bucket = storage?.bucket("aicreatorhub-io.appspot.com");
const bucketUrlPath = `https://storage.googleapis.com/${bucket?.name}`;

export async function uploadBase64(image: string, path: string) {
  let buffer: Buffer;
  if (image.startsWith("http")) {
    const response = await axios.get(image, {
      responseType: "arraybuffer", // Important for binary data
    });
    if (!response.data)
      throw new Error("Failed to fetch the image from the URL");
    buffer = Buffer.from(response.data, "binary");
  } else {
    buffer = Buffer.from(image, "base64");
  }
  const blob = bucket?.file(path);
  await blob?.save(buffer, {
    metadata: {
      contentType: "image/jpeg",
    },
  });
  return `${bucketUrlPath}/${path}`;
}
