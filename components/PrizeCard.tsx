import React from "react";
import { View, Image, StyleSheet } from "react-native";

export function PrizeCard({ source }: { source: any }) {
  return (

    <Image source={source} style={styles.image} resizeMode="contain" />

  );
}

const styles = StyleSheet.create({
  image: { width: 240, height: 240 }
});
