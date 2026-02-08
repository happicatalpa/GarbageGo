import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type Props = {
  closedSrc: any;
  openSrc: any;
  revealedSrc: any;
  trigger: number; // increment to play again
  size?: number;

  // tweakables (optional)
  shakeMs?: number;      // how long to shake before opening
  fadeMs?: number;       // fade duration from open -> revealed
  confettiCount?: number;
};

type ConfettiPiece = {
  id: number;
  left: number;      // 0..1 relative x
  delay: number;     // ms
  rotate: number;    // deg
  drift: number;     // px
  fall: number;      // px
  duration: number;  // ms
};

export function GambageReveal({
  closedSrc,
  openSrc,
  revealedSrc,
  trigger,
  size = 260,
  shakeMs = 550,
  fadeMs = 900,
  confettiCount = 16,
}: Props) {
  const [phase, setPhase] = useState<"closed" | "open">("closed");

  // animations
  const shakeX = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const confettiOpacity = useRef(new Animated.Value(0)).current;

  // confetti animated values (created once)
  const confettiY = useRef(
    Array.from({ length: confettiCount }, () => new Animated.Value(0))
  ).current;

  const confettiX = useRef(
    Array.from({ length: confettiCount }, () => new Animated.Value(0))
  ).current;

  // confetti "specs" regenerated each trigger for variety
  const confettiSpecs: ConfettiPiece[] = useMemo(() => {
    // seeded-ish variation per trigger
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < confettiCount; i++) {
      const left = Math.random(); // 0..1
      const delay = 10 + Math.floor(Math.random() * 220);
      const rotate = Math.floor(Math.random() * 360);
      const drift = (Math.random() * 2 - 1) * 70; // -70..70
      const fall = 140 + Math.random() * 120; // 140..260
      const duration = 650 + Math.floor(Math.random() * 450); // 650..1100
      pieces.push({ id: i, left, delay, rotate, drift, fall, duration });
    }
    return pieces;
  }, [trigger, confettiCount]);

  useEffect(() => {
    // reset
    setPhase("closed");
    shakeX.setValue(0);
    pop.setValue(1);
    revealOpacity.setValue(0);
    confettiOpacity.setValue(0);
    confettiY.forEach((v) => v.setValue(0));
    confettiX.forEach((v) => v.setValue(0));

    // 1) SHAKE loop while closed
    const shakeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeX, { toValue: -6, duration: 45, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 6, duration: 45, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: -4, duration: 45, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 4, duration: 45, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 0, duration: 45, useNativeDriver: true }),
      ])
    );

    shakeLoop.start();

    // After shakeMs, stop shake and OPEN
    const t = setTimeout(() => {
      shakeLoop.stop();
      shakeX.setValue(0);

      // 2) switch to OPEN + POP
      setPhase("open");

      pop.setValue(0.92);
      Animated.spring(pop, {
        toValue: 1.06,
        speed: 20,
        bounciness: 10,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(pop, {
          toValue: 1,
          speed: 18,
          bounciness: 8,
          useNativeDriver: true,
        }).start();
      });

      // 3) CONFETTI burst
      confettiOpacity.setValue(1);
      const confettiAnims = confettiSpecs.map((p, idx) =>
        Animated.parallel([
          Animated.timing(confettiY[idx], {
            toValue: p.fall,
            duration: p.duration,
            delay: p.delay,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(confettiX[idx], {
            toValue: p.drift,
            duration: p.duration,
            delay: p.delay,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      );

      Animated.parallel([
        Animated.timing(revealOpacity, {
          toValue: 1,
          duration: fadeMs,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(200),
          Animated.parallel(confettiAnims),
          Animated.timing(confettiOpacity, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, shakeMs);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      {/* Base layer: closed/open with shake+pop */}
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [
            { translateX: phase === "closed" ? shakeX : 0 },
            { scale: phase === "open" ? pop : 1 },
          ],
        }}
      >
        <Animated.Image
          source={phase === "closed" ? closedSrc : openSrc}
          resizeMode="contain"
          style={styles.img}
        />
      </Animated.View>

      {/* Revealed image: fades in over the open */}
      {phase === "open" && (
        <Animated.Image
          source={revealedSrc}
          resizeMode="contain"
          style={[styles.img, styles.absolute, { opacity: revealOpacity }]}
        />
      )}

      {/* Confetti overlay */}
      {phase === "open" && (
        <Animated.View style={[styles.absolute, { opacity: confettiOpacity }]}>
          {confettiSpecs.map((p, idx) => {
            const translateX = confettiX[idx];
            const translateY = confettiY[idx];
            return (
              <Animated.View
                key={p.id}
                style={[
                  styles.confettiPiece,
                  {
                    left: p.left * (size - 10),
                    transform: [
                      { translateX },
                      { translateY },
                      { rotate: `${p.rotate}deg` },
                    ],
                  },
                ]}
              />
            );
          })}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  img: { width: "100%", height: "100%" },
  absolute: { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 },

  // simple confetti pieces (no colors specified to keep it neutral—your background makes them visible)
  confettiPiece: {
    position: "absolute",
    top: 10,
    width: 10,
    height: 6,
    borderRadius: 0,
    backgroundColor: "white",
    opacity: 0.9,
  },
});
