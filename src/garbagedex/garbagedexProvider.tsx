import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { garbagedexReducer, createInitialState, Action } from "./reducer";
import { GarbagedexState, GarbagedexItemId } from "./types";
import { loadState, saveState } from "./storage";

type GarbagedexApi = {
  state: GarbagedexState;
  isReady: boolean;

  addScanResult: (topClass: string, confidence: number) => void;
  canRoll: () => boolean;
  rollPrize: () => GarbagedexItemId | null;
  resetPoints: () => void;
};

const Ctx = createContext<GarbagedexApi | null>(null);

function normalizeToId(raw: string): GarbagedexItemId | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_");
  const allowed: Set<GarbagedexItemId> = new Set([
    "cyklops_chip_bag",
    "singles_cup",
    "two_cool_cola",
    "aquameana",
    "cs_tudy",
    "cardbored",
    "jhone_bananas",
    "hungry_hungry_hippo_container",
    "golden_guy",
  ]);
  return allowed.has(key as GarbagedexItemId) ? (key as GarbagedexItemId) : null;
}

export function GarbagedexProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(garbagedexReducer, undefined, createInitialState);
  const [isReady, setIsReady] = useState(false);

  // Hydrate once
  useEffect(() => {
    (async () => {
      const loaded = await loadState();
      if (loaded) dispatch({ type: "HYDRATE", state: loaded });
      setIsReady(true);
    })();
  }, []);

  // Persist on changes (after hydrate)
  useEffect(() => {
    if (!isReady) return;
    saveState(state);
  }, [state, isReady]);

  const api: GarbagedexApi = {
    state,
    isReady,

    addScanResult: () => {
      dispatch({ type: "ADD_POINTS", amount: 1 });
    },

    canRoll: () => state.points >= state.rollGoal,

    rollPrize: () => {
      if (state.points < state.rollGoal) return null;

      // Prize logic example:
      // Prefer locked items first
      const locked = Object.values(state.dex).filter((e) => !e.unlocked);
      const pool = locked.length ? locked : Object.values(state.dex);

      const picked = pool[Math.floor(Math.random() * pool.length)].id;

      dispatch({ type: "UNLOCK", id: picked });
      dispatch({ type: "SET_LAST_PRIZE", id: picked });
      dispatch({ type: "RESET_POINTS" });
      return picked;
    },

    resetPoints: () => dispatch({ type: "RESET_POINTS" }),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useGarbagedex() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGarbagedex must be used inside GarbagedexProvider");
  return ctx;
}
