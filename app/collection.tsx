import { SafeAreaView } from "react-native-safe-area-context";
import ImageCarousel from "../components/ImageCarousel";

export default function Collection() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageCarousel />
    </SafeAreaView>
    
  );
}

