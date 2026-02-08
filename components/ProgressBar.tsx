import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function ProgressBar({
  current,
  goal,
  segments = 10,
}: {
  current: number;
  goal: number;
  segments?: number;
}) {
  const clamped = Math.max(0, Math.min(current, goal));
  const filledCount = Math.round((clamped / goal) * segments);

  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {Array.from({ length: segments }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i === 0 && styles.left,
              i === segments - 1 && styles.right,
              i < filledCount && styles.filled,
            ]}
          />
        ))}
      </View>

      <Text style={styles.text}>
        {clamped}/{goal}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: 10 },
  bar: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#BEB7B0",
    backgroundColor: "transparent",
    height: 20,
  },
  segment: {
    width: 18,
    height: 16,
    margin: 1,
    backgroundColor: "rgba(190,183,176,0.22)",
  },
  filled: {
    backgroundColor: "rgba(190,183,176,0.75)",
  },
  left: { marginLeft: 2 },
  right: { marginRight: 2 },
  text: {
    fontFamily: "monospace",
    color: "#7A7A7A",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
