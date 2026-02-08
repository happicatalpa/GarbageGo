import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DefaultText } from "../components/DefaultText";
import { detectTrash } from "../lib/roboflow";

export default function ScanScreen() {
    const cameraRef = useRef<CameraView | null>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Permission state (loading)
    if (!permission) {
        return (
            <View style={styles.center}>
                <Text>Loading camera…</Text>
            </View>
        );
    }

    // Not granted yet
    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <DefaultText style={styles.msg}>We need camera permission to scan trash.</DefaultText>
                <Pressable
                    style={styles.button}
                    onPress={requestPermission}>
                    <DefaultText style={styles.buttonText}>Grant permission</DefaultText>
                </Pressable>

                <Pressable style={[styles.button, styles.secondary]} onPress={() => router.back()}>
                    <DefaultText style={styles.buttonText}>Back</DefaultText>
                </Pressable>
            </View>
        );
    }

    const takePhoto = async () => {
        try {
            // CameraView supports takePictureAsync through the ref in expo-camera
            const photo = await (cameraRef.current as any)?.takePictureAsync?.({
                quality: 0.7,
                skipProcessing: true,
            });

            if (photo?.uri) setPhotoUri(photo.uri);
        } catch (e) {
            console.log("takePhoto error:", e);
        }
    };

    async function onScan() {
        console.log("[scan] pressed");

        if (!photoUri) {
            console.log("[scan] no photo uri");
            return;
        }

        console.log("[scan] photoUri:", photoUri);

        setLoading(true);
        setError(null);

        try {
            console.log("[scan] calling detectTrash...");
            const data = await detectTrash(photoUri);

            console.log("[scan] detectTrash returned:", Object.keys(data || {}));

            setResult(data);

            console.log("Top class:", data.top);
            console.log("Confidence:", data.confidence);

            let topClass = data.top;
            let confidence = data.confidence;

            router.push({
                pathname: "/results",
                params: {
                    label: topClass,
                    confidence: confidence.toString(), // params must be strings
                },
            });

        } catch (e: any) {
            console.log("[scan] ERROR:", e?.message ?? e);
            setError(e?.message ?? "Scan failed");
        } finally {
            setLoading(false);
            console.log("[scan] done");
        }
    }


    return (
        <View style={styles.container}>
            {/* Camera */}
            {!photoUri ? (
                <CameraView ref={cameraRef} style={styles.camera} facing="back" />
            ) : (
                <Image source={{ uri: photoUri }} style={styles.camera} />
            )}



            {/* Overlay controls */}
            <View style={styles.overlay}>
                <DefaultText style={styles.title}>scan trash</DefaultText>
                {!photoUri ? (
                    <Pressable
                        onPress={takePhoto}
                        style={({ pressed }) => ({
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: "#ffffffff",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: pressed ? 0.6 : 1,
                            padding: 20,
                        })}>
                    </Pressable>
                ) : null}
                <View style={styles.row}>
                    <Pressable style={[styles.button, styles.secondary]} onPress={() => router.back()}>
                        <DefaultText style={styles.buttonText}>Back</DefaultText>
                    </Pressable>
                {photoUri ? (
                    <Pressable
                        style={[styles.button, styles.scanButton]}
                        onPress={onScan}
                        // onPress={() => {
                        //   onScan();
                        //   console.log("Scan this image:", photoUri);
                        // }}
                        disabled={loading}
                    >
                        <DefaultText style={styles.buttonText} >{loading ? "Scanning..." : "Scan"}</DefaultText>
                    </Pressable>
                ) : null}
                
                    {/* <Pressable style={[styles.button, styles.secondary]} onPress={() => router.back()}>
                        <DefaultText style={styles.buttonText}>Back</DefaultText>
                    </Pressable> */}
                    {photoUri && (
                        <Pressable style={[styles.button, styles.secondary]} onPress={() => setPhotoUri(null)}>
                            <DefaultText style={styles.buttonText}>Retake</DefaultText>
                        </Pressable>
                    )}
                </View>

            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    camera: { flex: 1 },

    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        gap: 12,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
    },

    title: { color: "white", fontSize: 18, textAlign: "center", fontWeight: "600" },

    row: { flexDirection: "row", justifyContent: "space-between", gap: 12, padding: 20, alignItems:"center" },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        minHeight: 48,
        backgroundColor: "#D2CEC6",
        alignItems: "center",
    },
    secondary: { backgroundColor: "#D8F2E9" },
    scanButton: { backgroundColor: "#D8F2E9"},

    buttonText: { color: "#7F7F7F", fontWeight: "600" },
    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#bfeedd" },
    msg: { textAlign: "center", marginBottom: 12 },
});
