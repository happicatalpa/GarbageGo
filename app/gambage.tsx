import React from "react";
import { View, StyleSheet } from "react-native";
import { BackArrow } from "../components/BackArrow";
import { PrizeCard } from "../components/PrizeCard";
import { ProgressBar } from "../components/ProgressBar";
import { PixelButton } from "../components/PixelButton";

export default function Gambage() {
  // Replace with your real points state/store
  const points = 0;
  const goal = 10;

  const canClaim = points >= goal;

  return (
    <View style={styles.screen}>
      <BackArrow />

      <View style={styles.center}>
        {/* replace with your asset */}
        <PrizeCard source={require("../assets/images/gamblage.png")} />

        <ProgressBar current={points} goal={goal} segments={10} />

        <PixelButton
          title="claim gambage"
          disabled={!canClaim}
          onPress={() => {
            // later: roll animation, prize selection, reset points, etc.
            console.log("claim!");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#DFF5EF",
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 26,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
  },
});
