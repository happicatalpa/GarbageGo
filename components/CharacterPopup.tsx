import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
};

export function CharacterPopup({ visible, onClose, title, description }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      {/* Dark overlay */}
      <View style={styles.overlay}>
        {/* Popup card */}
        <View style={styles.card}>
          {/* Close button */}
          <Pressable onPress={onClose} style={styles.close}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          {/* Content */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#E7E1D6",
    padding: 20,
    borderRadius: 12,
  },
  close: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "700",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
