import { BackArrow } from "@/components/BackArrow";
import { DefaultText } from "@/components/DefaultText";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

/**
 * Expect params like:
 *   params: { result: JSON.stringify(modelResult) }
 * or also pass a simpler shape:
 *   params: { label: "recyclable_container", confidence: "0.91" }
 */

type ModelResult = {
  predictions?: Array<{
    class?: string;
    confidence?: number;
  }>;
  predicted_classes?: string[];
};

function normalizeLabel(raw?: string) {
  if (!raw) return "unknown";
  return raw
    .toLowerCase()
    .replace(/[-]/g, "_")
    .replace(/\s+/g, "_");
}

function prettyTitle(label: string) {
  // Customize these to match your model labels
  const map: Record<string, string> = {
    recyclable_container: "RECYCLABLE\nCONTAINER",
    recycling: "RECYCLABLE\nITEM",
    trash: "TRASH",
    compost: "COMPOST",
    unknown: "UNKNOWN\nITEM",
  };

  return map[label] ?? label.replace(/_/g, " ").toUpperCase();
}

function tipText(label: string) {
  const map: Record<string, string> = {
    recyclable_container:
      "don’t forget to properly\ndispose of the item into the\nrecyclable container bin!",
    recycling:
      "make sure it’s clean and dry\nbefore placing it in the\nrecycling bin!",
    trash: "dispose of it in the\ntrash bin!",
    compost: "dispose of it in the\ncompost bin!",
    unknown: "try scanning again with\nbetter lighting and focus!",
  };

  return map[label] ?? "dispose of it properly!";
}

export default function ResultsScreen() {
  const params = useLocalSearchParams();

  const parsed: ModelResult | null = useMemo(() => {
    try {
      if (params.result) return JSON.parse(String(params.result));
      return null;
    } catch {
      return null;
    }
  }, [params.result]);

  const top = parsed?.predictions?.[0];
  const rawLabel =
    (params.label as string | undefined) ??
    top?.class ??
    parsed?.predicted_classes?.[0] ??
    "unknown";

  const label = normalizeLabel(rawLabel);

  const headline = prettyTitle(label);
  const tip = tipText(label);

  return (
    <View style={styles.screen}>
      {/* faint stars */}
      <DefaultText style={[styles.star, styles.starTopRight]}>★</DefaultText>
      <DefaultText style={[styles.star, styles.starMidLeft]}>★</DefaultText>

      {/* Back arrow */}
      {/* <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <DefaultText style={styles.backArrow}>←</DefaultText>
      </Pressable> */}
      <BackArrow />

      <View style={styles.content}>
        <DefaultText style={styles.smallNote}>successfully logged garbage!</DefaultText>

        <DefaultText style={styles.bigTitle}>YOU SCANNED A{"\n"}{headline}</DefaultText>

        <DefaultText style={styles.tip}>{tip}</DefaultText>

        <DefaultText style={styles.footerHint}>
          keep logging garbage to open a gambage!
        </DefaultText>
      </View>

      <Pressable
        onPress={() => router.replace("/scan")} // change route to your scan page
        style={styles.cta}
      >
        <DefaultText style={styles.ctaText}>keep logging</DefaultText>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/")} // change route to your home page
        style={styles.cta}
      >
        <DefaultText style={styles.ctaText}>return home</DefaultText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#DFF5EF", // minty background
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 26,
  },

  // stars
  star: {
    position: "absolute",
    color: "#FFF6B8",
    opacity: 0.55,
    fontSize: 92,
  },
  starTopRight: {
    right: 30,
    top: 110,
    transform: [{ rotate: "8deg" }],
  },
  starMidLeft: {
    left: 18,
    top: 320,
    fontSize: 78,
    transform: [{ rotate: "-10deg" }],
  },

  backBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backArrow: {
    fontSize: 34,
    color: "#7A7A7A",
    // pixel-ish fallback
    fontFamily: "monospace",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 10,
  },

  smallNote: {
    color: "#7B7B7B",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  bigTitle: {
    color: "#6E6E6E",
    fontSize: 36,
    textAlign: "center",
    letterSpacing: 1.5,
    lineHeight: 44,
    textTransform: "uppercase",
  },

  tip: {
    color: "#8A8A8A",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },

  footerHint: {
    marginTop: 16,
    color: "#8A8A8A",
    fontSize: 13,
    opacity: 0.9,
  },

  cta: {
    alignSelf: "center",
    width: 220,
    height: 54,
    borderRadius: 8,
    backgroundColor: "#D8D3CF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#BEB7B0",
  },
  ctaText: {
    color: "#6E6E6E",
    fontSize: 18,
    letterSpacing: 1,
    textTransform: "lowercase",
  },
});
