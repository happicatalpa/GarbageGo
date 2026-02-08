import * as FileSystem from "expo-file-system/legacy";

const MODEL_ID = "recycling-2aqxo-gfrmv/1";

export async function detectTrash(photoUri: string) {
  const apiKey = process.env.EXPO_PUBLIC_ROBOFLOW_API_KEY;
  if (!apiKey) throw new Error("Missing EXPO_PUBLIC_ROBOFLOW_API_KEY");

  const base64 = await FileSystem.readAsStringAsync(photoUri, {
    encoding: "base64",
  });

  const url = `https://serverless.roboflow.com/${MODEL_ID}?api_key=${encodeURIComponent(
    apiKey
  )}&name=image.jpg&format=json`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: base64,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Roboflow ${res.status}: ${text.slice(0, 300)}`);
  }

  
  return JSON.parse(text);
}
