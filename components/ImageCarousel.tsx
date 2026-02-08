import React, { useRef, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

type Tile = {
  src: any;
  caption: string;
};

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
      { src: require("../assets/images/chipman.png"), caption: "Cyklops Chip Bag" },
      { src: require("../assets/images/single cup.png"), caption: "Singles Cup" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
    ],
  },
  {
    title: "Recyclable Containers",
    backgroundColor: "#D8F2E9",
    images: [
      { src: require("../assets/images/cola.png"), caption: "Two Cool Cola" },
      { src: require("../assets/images/bootle.png"), caption: "Aquameana" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
    ],
  },
  {
    title: "Paper",
    backgroundColor: "#D8F2E9",
    images: [
      { src: require("../assets/images/paper.png"), caption: "CS-tudy" },
      { src: require("../assets/images/bored.png"), caption: "Cardbored" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
    ],
  },
  {
    title: "Compost",
    backgroundColor: "#D8F2E9",
    images: [
      { src: require("../assets/images/Container.png"), caption: "Hungry Hungry Hippo Container" },
      { src: require("../assets/images/Banana.png"), caption: "Jhone Bananas!" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
    ],
  },
  {
    title: "Ultimate",
    backgroundColor: "#D8F2E9",
    images: [
      { src: require("../assets/images/gg.png"), caption: "Gold Garbage (GG)" },
      { src: require("../assets/images/question.png"), caption: "Unknown" },
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

  // keep your tileHeight if you already updated it (#1)
  const tileHeight = 90; // <-- you can increase this if you want, but you said you already did

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
                flex: 1,
                borderRadius: 0, 
                padding: cardPadding,
                backgroundColor: "#D2CEC6",
              }}
            >
              {/*ScrollView*/}
              <ScrollView showsVerticalScrollIndicator>
                {/* Grid */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap }}>
                  {item.images.map((img, i) => (
                    
                    <View
                      key={i}
                      style={{
                        width: tileWidth,
                        // extra height for caption
                        height: tileHeight + 26,
                        borderRadius: 0, 
                        backgroundColor: "#E7E1D6", 
                        overflow: "hidden", // keeps image inside the tile bounds
                      }}
                    >
                      <Image
                        source={img.src}
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: tileHeight,
                          borderRadius: 0,
                        }}
                      />

                      {/* caption */}
                      <Text
                        numberOfLines={1}
                        style={{
                          paddingHorizontal: 8,
                          textAlign: "center",
                          paddingTop: 4,
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Pixel",
                        }}
                      >
                        {img.caption}
                      </Text>
                    </View>
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
