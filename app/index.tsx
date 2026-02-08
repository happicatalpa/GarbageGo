import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { DefaultText } from "../components/DefaultText";
import { clearAllStorage } from "../src/garbagedex/storage";
import { getLoggedIn } from "../components/checkAuth";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { getUsername } from "../components/checkAuth";



export default function HomeScreen() {
    //clearAllStorage();
    const [ready, setReady] = useState(false);
    const [loggedIn, setLoggedInState] = useState(false);
    const [username, setUsername] = useState("");


    useEffect(() => {
        (async () => {
        const v = await getLoggedIn();
        const name = await getUsername();
      setUsername(name ?? "");
        setLoggedInState(v);
        setReady(true);
        })();
    }, []);

    if (!ready) return null; // or a splash component

    if (!loggedIn) {
        return <Redirect href="/login" />;
    }
    return (
        <View style={styles.container}>
            {/* Title */}
            <DefaultText style={styles.title}>welcome,{"\n" + username}</DefaultText>

            {/* Main Button */}
            <Pressable onPress={() => router.push("/scan")}>
                <Image
                    source={require("../assets/images/camera.png")}
                    style={styles.images}
                />
                <DefaultText style={styles.buttonText}>log trash</DefaultText>
            </Pressable>

            {/* Bottom Buttons */}
            <View style={styles.bottomRow}>
                <Pressable onPress={() => router.push("/collection")}>
                    <Image
                        source={require("../assets/images/book.png")}
                        style={styles.images}
                    />
                    <DefaultText style={styles.buttonText}>collection</DefaultText>
                </Pressable>

                <Pressable onPress={() => router.push("/gambage")}>
                    <Image
                        source={require("../assets/images/gamblage.png")}
                        style={styles.images}
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
        backgroundColor: "#D8F2E9", // minty green
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
        gap: 16,
        marginTop: 24,
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

    images: {
        width: 150,
        height: 150,
    }
});
