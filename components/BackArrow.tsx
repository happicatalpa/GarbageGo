import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";


export function BackArrow({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress ?? (() => router.back())} style={styles.wrap}>
      
       <Image
        source={require("../assets/images/arrow.png")}
        style={{
          width: 50,
          height: 30,
        }}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 44, height: 44, justifyContent: "center" },
  arrow: { fontSize: 34, color: "#7A7A7A", fontFamily: "monospace" },
});
