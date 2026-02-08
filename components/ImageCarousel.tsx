import React, { useRef, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

// Each slide = a category/page with multiple images
type Slide = {
  title: string;
  backgroundColor: string;
  images: any[]; // use require(...) for local images
};

const SLIDES: Slide[] = [
  {
    title: "Trash",
    backgroundColor: "#D8F2E9",
    images: [
      require("../assets/images/chipman.png"),
      require("../assets/images/single cup.png"),
      require("../assets/images/question.png"),
      require("../assets/images/question.png"),
    ],
  },
  {
    title: "Compost",
    backgroundColor: "#D8F2E9",
    images: [
      require("../assets/images/Container.png"),
      require("../assets/images/question.png"),
      require("../assets/images/question.png"),
      require("../assets/images/question.png"),
    ],
  },
];

export default function CollectionCarousel() {
  const ref = useRef<ICarouselInstance>(null);
  const [index, setIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={320}
        data={SLIDES}
        pagingEnabled
        loop={false}
        onSnapToItem={setIndex}
        renderItem={({ item }) => (
          // 1) Solid background for the whole slide
          <View style={{ flex: 1, backgroundColor: item.backgroundColor, padding: 20 }}>
            {/* Title */}
            <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
              {item.title}
            </Text>

            {/* 2) Rectangle/card container */}
            <View
              style={{
                flex: 1,
                borderRadius: 18,
                padding: 14,
                backgroundColor: "#D2CEC6", // your “purple” rectangle
              }}
            >
              {/* 3) Multiple images on top (grid) */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {item.images.map((src, i) => (
                  <Image
                    key={i}
                    source={src}
                    style={{
                      width: (width - 20 * 2 - 14 * 2 - 10) / 2, // 2 columns
                      height: 90,
                      borderRadius: 12,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                    resizeMode="cover"
                  />
                ))}
              </View>
            </View>

            {/* Dots */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
              {SLIDES.map((_, i) => (
                <Pressable key={i} onPress={() => ref.current?.scrollTo({ index: i, animated: true })}>
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

            {/* Optional arrows */}
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
