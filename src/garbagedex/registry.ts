import { GarbagedexItemId } from "./types";

// Put your images in /assets/dex/
export const DEX_ASSETS: Record<
  GarbagedexItemId,
  { name: string; unlockedImg: any; lockedImg: any }
> = {
  cyklops_chip_bag: {
    name: "Cyklops Chip Bag",
    unlockedImg: require("../../assets/images/chipman.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  singles_cup: {
    name: "Singles Cup",
    unlockedImg: require("../../assets/images/single cup.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  two_cool_cola: {
    name: "2 Cool Cola",
    unlockedImg: require("../../assets/images/cola.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  aquameana: {
    name: "Aquameana",
    unlockedImg: require("../../assets/images/bootle.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  cs_tudy: {
    name: "CS-tudy",
    unlockedImg: require("../../assets/images/paper.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  cardbored: {
    name: "Cardbored",
    unlockedImg: require("../../assets/images/bored.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  jhone_bananas: {
    name: "Jhone Bananas!",
    unlockedImg: require("../../assets/images/Banana.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  hungry_hungry_hippo_container: {
    name: "Hungry Hungry Hippo Container",
    unlockedImg: require("../../assets/images/Container.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
  golden_guy: {
    name: "Golden Guy (GG)",
    unlockedImg: require("../../assets/images/gg.png"),
    lockedImg: require("../../assets/images/question.png"),
  },
};
