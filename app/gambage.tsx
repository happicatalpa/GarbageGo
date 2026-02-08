import { DefaultText } from "@/components/DefaultText";
import { GambageReveal } from "@/components/GambageReveal";
import { DEX_ASSETS } from "@/src/garbagedex/registry";
import { GarbagedexItemId } from "@/src/garbagedex/types";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BackArrow } from "../components/BackArrow";
import { PixelButton } from "../components/PixelButton";
import { ProgressBar } from "../components/ProgressBar";
import { useGarbagedex } from "../src/garbagedex/garbagedexProvider";

const DEFAULT_IMG = require("../assets/images/gamblage2.png"); // adjust path
const OPEN_IMG = require("../assets/images/trashopen.png");




export default function Gambage() {
  // Replace with your real points state/store
  const { state, canRoll, rollPrize } = useGarbagedex();
  const points = state.points;
  const goal = state.rollGoal;

  const [revealedId, setRevealedId] = useState<GarbagedexItemId | null>(null);
  const [revealTrigger, setRevealTrigger] = useState(0);
  const displayImg = revealedId ? DEX_ASSETS[revealedId].unlockedImg : DEFAULT_IMG;
  const revealedName =
  revealedId && DEX_ASSETS[revealedId]
    ? DEX_ASSETS[revealedId].name
    : null;


//   function animateReveal(int newID) {

//   }


  return (
    <View style={styles.screen}>
      <BackArrow />

      <View style={styles.center}>
        {/* replace with your asset */}
        <GambageReveal
            closedSrc={DEFAULT_IMG}
            openSrc={OPEN_IMG}
            revealedSrc={displayImg}
            trigger={revealTrigger}
            size={260}
        />
        
        {revealedName && (
        <DefaultText style={styles.revealText}>
            {`CONGRATS!\nyou got a ${revealedName}`}
        </DefaultText>
        )}

        <ProgressBar current={Math.min(10, points)} goal={goal} segments={10} />

        <PixelButton
          title="claim gambage"
          disabled={!canRoll()}
          onPress={() => {
            const prizeID = rollPrize();
            console.log("claim!");
            if (prizeID) {
                setRevealedId(prizeID);
                setRevealTrigger((x) => x + 1);
            }
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
  revealText: {
  fontSize: 16,
  color: "#6E6E6E",
  textAlign: "center",
  marginTop: 6,
  lineHeight: 22,
},

});
