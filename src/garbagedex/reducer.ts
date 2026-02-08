import { GarbagedexItemId, GarbagedexState } from "./types";

export type Action =
  | { type: "ADD_POINTS"; amount: number }
  | { type: "UNLOCK"; id: GarbagedexItemId }
  | { type: "INCREMENT_COUNT"; id: GarbagedexItemId }
  | { type: "SET_LAST_PRIZE"; id: GarbagedexItemId }
  | { type: "RESET_POINTS" }
  | { type: "HYDRATE"; state: GarbagedexState };

export function createInitialState(): GarbagedexState {
  const now = Date.now();
  const ids: GarbagedexItemId[] = [
    "cyklops_chip_bag",
    "singles_cup",
    "two_cool_cola",
    "aquameana",
    "cs_tudy",
    "cardbored",
    "jhone_bananas",
    "hungry_hungry_hippo_container",
    "golden_guy"
  ];

  const dex = Object.fromEntries(
    ids.map((id) => [
      id,
      { id, unlocked: false, count: 0, firstUnlockedAt: undefined },
    ])
  ) as GarbagedexState["dex"];

  return { points: 0, rollGoal: 10, dex, lastPrize: undefined };
}

export function garbagedexReducer(
  state: GarbagedexState,
  action: Action
): GarbagedexState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "ADD_POINTS":
      return { ...state, points: state.points + action.amount };

    case "RESET_POINTS":
      return { ...state, points: Math.max(0, state.points - 10),};

    case "UNLOCK": {
      const entry = state.dex[action.id];
      if (!entry) return state;
      if (entry.unlocked) return state;

      return {
        ...state,
        dex: {
          ...state.dex,
          [action.id]: {
            ...entry,
            unlocked: true,
            firstUnlockedAt: Date.now(),
          },
        },
      };
    }

    case "INCREMENT_COUNT": {
      const entry = state.dex[action.id];
      if (!entry) return state;

      return {
        ...state,
        dex: {
          ...state.dex,
          [action.id]: { ...entry, count: entry.count + 1 },
        },
      };
    }

    case "SET_LAST_PRIZE":
      return { ...state, lastPrize: action.id };

    default:
      return state;
  }
}
