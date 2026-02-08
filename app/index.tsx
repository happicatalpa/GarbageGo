import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { DefaultText } from "../components/DefaultText";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* Title */}
            <DefaultText style={styles.title}>welcome,{"\n"}username</DefaultText>

            {/* Main Button */}
            <Pressable onPress={() => router.push("/scan")}>
                <Image
                    source={require("../assets/images/camera.png")}
                    style={{ width: 220, height: 220 }}
                />
                <DefaultText style={styles.buttonText}>log trash</DefaultText>
            </Pressable>

            {/* Bottom Buttons */}
            <View style={styles.bottomRow}>
                <Pressable onPress={() => router.push("/collection")}>
                    <Image
                        source={require("../assets/images/book.png")}
                        style={{ width: 220, height: 220 }}
                    />
                    <DefaultText style={styles.buttonText}>collection</DefaultText>
                </Pressable>

                <Pressable onPress={() => router.push("/gambage")}>
                    <Image
                        source={require("../assets/images/gamblage.png")}
                        style={{ width: 220, height: 220 }}
                    />
                    <DefaultText style={styles.buttonText} >gambage</DefaultText>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bfeedd", // minty green
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 40,
        fontWeight: "600",
    },

    mainButton: {
        width: 140,
        height: 140,
        backgroundColor: "#a4d9c8",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
        elevation: 4,
    },

    bottomRow: {
        flexDirection: "row",
        gap: 2,
    },

    smallButton: {
        width: 120,
        height: 100,
        backgroundColor: "#a4d9c8",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
});
