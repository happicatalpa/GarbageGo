export type GarbagedexItemId =
  | "Cyklops Chip Bag"
  | "Singles Cup"
  | "2 Cool Cola"
  | "Aquameana"
  | "CS-tudy"
  | "Cardbored"
  | "Jhone Bananas!"
  | "Hungry Hungry Hippo Container";

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
