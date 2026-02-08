import { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { detectTrash } from "../lib/roboflow";
import { DefaultText } from "../components/DefaultText";

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
        <Text style={styles.msg}>We need camera permission to scan trash.</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.secondary]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
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
        <Text style={styles.title}>scan trash</Text>

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take photo</Text>
          </Pressable>

          {photoUri ? (
            <Pressable style={[styles.button, styles.secondary]} onPress={() => setPhotoUri(null)}>
              <Text style={styles.buttonText}>Retake</Text>
            </Pressable>
          ) : (
            <Pressable style={[styles.button, styles.secondary]} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
          )}
        </View>

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
  },

  title: { color: "white", fontSize: 18, textAlign: "center", fontWeight: "600" },

  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  secondary: { backgroundColor: "rgba(255,255,255,0.12)" },
  scanButton: { backgroundColor: "rgba(255,255,255,0.28)" },

  buttonText: { color: "white", fontWeight: "600" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  msg: { textAlign: "center", marginBottom: 12 },
});
