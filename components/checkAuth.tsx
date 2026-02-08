
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "is_logged_in";
const NAME = "username";

export async function setLoggedIn(value: boolean) {
  await AsyncStorage.setItem(KEY, value ? "true" : "false");
}

export async function getLoggedIn() {
  return (await AsyncStorage.getItem(KEY)) === "true";
}

export async function setUsername(value: string) {
  await AsyncStorage.setItem(NAME, value); // NO stringify
}

export async function getUsername(): Promise<string | null> {
  return await AsyncStorage.getItem(NAME); // string | null
}