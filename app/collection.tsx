import { View } from "react-native";
import ImageCarousel from "../components/ImageCarousel";

export default function Collection() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <ImageCarousel />
    </View>
  );
}
