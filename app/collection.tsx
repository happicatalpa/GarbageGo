import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackArrow } from "../components/BackArrow";
import ImageCarousel from "../components/ImageCarousel";

export default function Collection() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Back button*/}

      <View
        style={{
          position: "absolute",
          top: 50,
          right: 12,
          zIndex: 10, 
        }}
      >
        <BackArrow />
      </View>

      {/* Main content */}
      <ImageCarousel />
    </SafeAreaView>
  );
}


