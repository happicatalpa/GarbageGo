import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Pixel: require("../assets/fonts/PixelifySans-VariableFont_wght.ttf"), 
    });

    if (!fontsLoaded) {
        return null; // or a splash screen
    }

    
    return <Stack />;
}
