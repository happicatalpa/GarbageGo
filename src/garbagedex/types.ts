export type GarbagedexItemId =
  | "cyklops_chip_bag"
  | "singles_cup"
  | "two_cool_cola"
  | "aquameana"
  | "cs_tudy"
  | "cardbored"
  | "jhone_bananas"
  | "hungry_hungry_hippo_container"
  | "golden_guy";

export type DexEntry = {
  id: GarbagedexItemId;
  unlocked: boolean;
  count: number; // how many times scanned/earned
  firstUnlockedAt?: number;
};

export type GarbagedexState = {
  points: number;        // progress toward rolls
  rollGoal: number;      // e.g. 10
  dex: Record<GarbagedexItemId, DexEntry>;
  lastPrize?: GarbagedexItemId;
};
