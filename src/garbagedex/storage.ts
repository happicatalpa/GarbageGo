import AsyncStorage from "@react-native-async-storage/async-storage";
import { GarbagedexState } from "./types";

const KEY = "garbagedex_state_v1";

export async function loadState(): Promise<GarbagedexState | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as GarbagedexState) : null;
}

export async function saveState(state: GarbagedexState) {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}


export async function clearAllStorage() {
  await AsyncStorage.clear();
  console.log("[STORAGE] Cleared all AsyncStorage");
}

