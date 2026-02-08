import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { DefaultText } from "./DefaultText";

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
      <DefaultText style={styles.text}>{title}</DefaultText>
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
