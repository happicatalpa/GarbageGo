import React from "react";
import { View, StyleSheet } from "react-native";
import { BackArrow } from "../components/BackArrow";
import { PrizeCard } from "../components/PrizeCard";
import { ProgressBar } from "../components/ProgressBar";
import { PixelButton } from "../components/PixelButton";
import { useGarbagedex } from "../src/garbagedex/garbagedexProvider";

export default function Gambage() {
  // Replace with your real points state/store
  const { state, canRoll, rollPrize } = useGarbagedex();
  const points = state.points;
  const goal = state.rollGoal;

  return (
    <View style={styles.screen}>
      <BackArrow />

      <View style={styles.center}>
        {/* replace with your asset */}
        <PrizeCard source={require("../assets/images/gamblage.png")} />

        <ProgressBar current={Math.min(10, points)} goal={goal} segments={10} />

        <PixelButton
          title="claim gambage"
          disabled={canRoll()}
          onPress={() => {
            rollPrize();
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
