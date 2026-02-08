import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export function PixelButton({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, disabled && styles.disabled]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 220,
    height: 54,
    borderRadius: 8,
    backgroundColor: "#D8D3CF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#BEB7B0",
  },
  disabled: { opacity: 0.5 },
  text: {
    fontFamily: "monospace",
    color: "#6E6E6E",
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "lowercase",
  },
});
