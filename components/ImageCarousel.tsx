import { GarbagedexItemId } from "@/src/garbagedex/types";
import React, { useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { DexEntry } from "./DexEntry";

const { width, height } = Dimensions.get("window");

type Tile = { id: GarbagedexItemId | null };

type Slide = {
  title: string;
  backgroundColor: string;
  images: Tile[];
};

const SLIDES: Slide[] = [
  {
    title: "Trash",
    backgroundColor: "#D8F2E9",
    images: [
        { id: "cyklops_chip_bag" },
        { id: "singles_cup" },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
    ],
  },
  {
    title: "Recyclable Containers",
    backgroundColor: "#D8F2E9",
    images: [
        { id: "two_cool_cola" },
        { id: "aquameana" },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
    ],
  },
  {
    title: "Paper",
    backgroundColor: "#D8F2E9",
    images: [
        { id: "cs_tudy" },
        { id: "cardbored" },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
    ],
  },
  {
    title: "Compost",
    backgroundColor: "#D8F2E9",
    images: [
        { id: "hungry_hungry_hippo_container" },
        { id: "jhone_bananas" },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
    ],
  },
  {
    title: "Ultimate",
    backgroundColor: "#D8F2E9",
    images: [
        { id: "golden_guy" },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
        { id: null },
    ],
  },
];

export default function CollectionCarousel() {
  const ref = useRef<ICarouselInstance>(null);
  const [index, setIndex] = useState(0);

  // you said you already changed sizing (#1), so keep your values.
  const outerPadding = 20;
  const cardPadding = 14;
  const gap = 10;

  // 2-column layout tile width
  const tileWidth = (width - outerPadding * 2 - cardPadding * 2 - gap) / 2;
  const tileHeight = 180;
  
  //pop-up stuff
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={SLIDES}
        pagingEnabled
        loop={false}
        onSnapToItem={setIndex}
        renderItem={({ item }) => (
          <View style={{ flex: 1, backgroundColor: item.backgroundColor, padding: outerPadding }}>
            {/* Title */}
            <Text style={{ fontSize: 22, fontWeight: "700", fontFamily: "Pixel", marginBottom: 12 }}>
              {item.title}
            </Text>

            {/* Card container (dark brown/gray) */}
            <View
              style={{
                flex: height * 0.6,
                borderRadius: 0, 
                padding: cardPadding,
                backgroundColor: "#D2CEC6",
              }}
            >
              {/*ScrollView*/}
              <ScrollView showsVerticalScrollIndicator>
                {/* Grid */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap }}>
                    {item.images.map((t, i) => (
                        <DexEntry key={i} id={t.id} width={tileWidth} tileHeight={tileHeight} />
                    ))}
                </View>
              </ScrollView>
            </View>

            {/* Dots */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
              {SLIDES.map((_, i) => (
                <Pressable
                  key={i}
                  onPress={() => ref.current?.scrollTo({ index: i, animated: true })}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 5,
                      marginHorizontal: 5,
                      opacity: i === index ? 1 : 0.3,
                      backgroundColor: "black",
                    }}
                  />
                </Pressable>
              ))}
            </View>

            {/* Prev/Next */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <Pressable onPress={() => ref.current?.prev()}>
                <Text style={{ fontSize: 18 }}>‹ Prev</Text>
              </Pressable>
              <Pressable onPress={() => ref.current?.next()}>
                <Text style={{ fontSize: 18 }}>Next ›</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
