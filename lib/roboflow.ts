import * as FileSystem from "expo-file-system/legacy";

const WORKFLOW_URL =
  "https://serverless.roboflow.com/ginas-workspace/workflows/detect-and-classify-2";

export async function detectTrash(photoUri: string) {
  const apiKey = process.env.EXPO_PUBLIC_ROBOFLOW_API_KEY;
  if (!apiKey) throw new Error("Missing EXPO_PUBLIC_ROBOFLOW_API_KEY");

  // Convert image to base64
  const base64 = await FileSystem.readAsStringAsync(photoUri, {
    encoding: "base64",
  });

  const res = await fetch(WORKFLOW_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      inputs: {
        image: {
          type: "base64",
          value: base64,
        },
      },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Roboflow ${res.status}: ${text.slice(0, 400)}`);
  }

  return JSON.parse(text);
}
