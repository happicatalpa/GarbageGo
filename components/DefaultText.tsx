import { Text, TextProps, StyleSheet } from "react-native";

export function DefaultText({ style, ...props }: TextProps) {
  return (
    <Text {...props} style={[styles.text, style]} />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Pixel",
  },
});
