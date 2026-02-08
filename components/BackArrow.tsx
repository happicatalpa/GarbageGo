import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export function BackArrow({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress ?? (() => router.back())} style={styles.wrap}>
      <Text style={styles.arrow}>←</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 44, height: 44, justifyContent: "center" },
  arrow: { fontSize: 34, color: "#7A7A7A", fontFamily: "monospace" },
});
