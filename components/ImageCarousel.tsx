import React, { useRef, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";


const { width } = Dimensions.get("window");

// Example data (local images)
// Put img1.jpg/img2.jpg/img3.jpg in assets/
const slides = [
  { img: require("../assets/img1.jpg"), caption: "Caption Text" },
  { img: require("../assets/img2.jpg"), caption: "Caption Two" },
  { img: require("../assets/img3.jpg"), caption: "Caption Three" },
];

export default function ImageCarousel() {
  // const ref = useRef<React.ElementRef<typeof Carousel>>(null);
  const ref = useRef<ICarouselInstance>(null);
  const [index, setIndex] = useState(0);

  return (
    <View style={{ position: "relative" }}>
      <Carousel
        ref={ref}
        width={width}
        height={240}
        data={slides}
        loop
        pagingEnabled
        onSnapToItem={(i) => setIndex(i)}
        renderItem={({ item }) => (
          <View style={{ width: "100%", height: "100%" }}>
            <Image
              source={item.img}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />

            {/* "1 / 3" number text (matches .numbertext) */}
            <Text
              style={{
                position: "absolute",
                top: 8,
                left: 12,
                color: "white",
                fontSize: 12,
              }}
            >
              {index + 1} / {slides.length}
            </Text>

            {/* Caption (matches .text) */}
            <Text
              style={{
                position: "absolute",
                bottom: 8,
                width: "100%",
                textAlign: "center",
                color: "white",
                fontSize: 15,
                paddingHorizontal: 12,
              }}
            >
              {item.caption}
            </Text>
          </View>
        )}
      />

      {/* Prev/Next (matches .prev/.next) */}
      <Pressable
        onPress={() => ref.current?.prev()}
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          padding: 16,
          transform: [{ translateY: -22 }],
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>‹</Text>
      </Pressable>

      <Pressable
        onPress={() => ref.current?.next()}
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          padding: 16,
          transform: [{ translateY: -22 }],
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>›</Text>
      </Pressable>

      {/* Dots (matches .dot + active) */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {slides.map((_, i) => (
          <Pressable key={i} onPress={() => ref.current?.scrollTo({ index: i, animated: true })}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 4,
                opacity: i === index ? 1 : 0.3,
                backgroundColor: "black",
              }}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
