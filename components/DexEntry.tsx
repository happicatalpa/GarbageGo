import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { GarbagedexItemId } from "../src/garbagedex/types";
import { DEX_ASSETS } from "../src/garbagedex/registry";
import { useGarbagedex } from "../src/garbagedex/garbagedexProvider";

export function DexEntry({
  id,
  width,
  tileHeight,
}: {
  id: GarbagedexItemId | null; // null = empty slot
  width: number;
  tileHeight: number;
}) {
  const { state } = useGarbagedex();

  // placeholder slot
  if (!id) {
    const locked = require("../assets/images/question.png");
    return (
      <View style={[styles.tile, { width, height: tileHeight + 26 }]}>
        <Image source={locked} resizeMode="contain" style={{ width: "100%", height: tileHeight }} />
        <Text style={styles.caption} numberOfLines={1}>Unknown</Text>
      </View>
    );
  }

  const meta = DEX_ASSETS[id];
  const unlocked = !!state.dex[id]?.unlocked;

  return (
    <View style={[styles.tile, { width, height: tileHeight + 26 }]}>
      <Image
        source={unlocked ? meta.unlockedImg : meta.lockedImg}
        style={{ width: "100%", height: tileHeight }}
        resizeMode="contain"
      />
      <Text style={styles.caption} numberOfLines={1}>
        {unlocked ? meta.name : "Unknown"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 0,
    backgroundColor: "#E7E1D6",
    overflow: "hidden",
  },
  caption: {
    paddingHorizontal: 8,
    textAlign: "center",
    paddingTop: 4,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Pixel",
  },
});
