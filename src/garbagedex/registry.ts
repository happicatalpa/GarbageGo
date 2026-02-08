import { GarbagedexItemId } from "./types";

// Put your images in /assets/dex/
export const DEX_ASSETS: Record<
  GarbagedexItemId,
  { name: string; unlockedImg: any; lockedImg: any }
> = {
  "Cyklops Chip Bag": {
    name: "Cyklops Chip Bag",
    unlockedImg: require("../../assets/dex/chipman.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "Singles Cup": {
    name: "Singles Cup",
    unlockedImg: require("../../assets/dex/single cup.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "2 Cool Cola": {
    name: "2 Cool Cola",
    unlockedImg: require("../../assets/dex/cola.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "Aquameana": {
    name: "Aquameana",
    unlockedImg: require("../../assets/dex/bootle.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "CS-tudy": {
    name: "CS-tudy",
    unlockedImg: require("../../assets/dex/paper.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "Cardbored": {
    name: "Cardbored",
    unlockedImg: require("../../assets/dex/bored.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "Jhone Bananas!": {
    name: "Jhone Bananas!",
    unlockedImg: require("../../assets/dex/Banana.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
  "Hungry Hungry Hippo Container": {
    name: "Hungry Hungry Hippo Container",
    unlockedImg: require("../../assets/dex/Container.png"),
    lockedImg: require("../../assets/dex/question.png"),
  },
};
