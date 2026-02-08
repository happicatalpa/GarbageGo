import { View, Text, Pressable, StyleSheet } from "react-native";
import { DefaultText } from "../components/DefaultText";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <DefaultText style={styles.title}>welcome,{"\n"}username</DefaultText>

      {/* Main Button */}
      <Pressable style={styles.mainButton}  onPress={() => router.push("/scan")}>
        <DefaultText style={styles.buttonText}>log trash</DefaultText>
      </Pressable>

      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        <Pressable style={styles.smallButton}>
          <DefaultText style={styles.buttonText}>collection</DefaultText>
        </Pressable>

        <Pressable style={styles.smallButton}>
          <DefaultText style={styles.buttonText} >gamble</DefaultText>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfeedd", // minty green
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "600",
  },

  mainButton: {
    width: 140,
    height: 140,
    backgroundColor: "#a4d9c8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    elevation: 4,
  },

  bottomRow: {
    flexDirection: "row",
    gap: 24,
  },

  smallButton: {
    width: 120,
    height: 100,
    backgroundColor: "#a4d9c8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
