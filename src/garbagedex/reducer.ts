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
    "Cyklops Chip Bag",
    "Singles Cup",
    "2 Cool Cola",
    "Aquameana",
    "CS-tudy",
    "Cardbored",
    "Jhone Bananas!",
    "Hungry Hungry Hippo Container",
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
      return { ...state, points: 0 };

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
