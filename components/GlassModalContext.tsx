import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, View, Text, Pressable, StyleSheet, useColorScheme, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh } from "@/helpers/responsive";
import { Colors, Fonts } from "@/constants/theme";
import { ThemedText } from "./themed-text";

type ModalConfig = {
  title?: string;
  message?: string;
  actionText?: string;
  onConfirm?: () => void;
};

type GlassModalContextType = {
  showModal: (config: ModalConfig) => void;
};

const GlassModalContext = createContext<GlassModalContextType>({
  showModal: () => {},
});

export const useGlassModal = () => useContext(GlassModalContext);

export const GlassModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ModalConfig>({});
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const showModal = (modalConfig: ModalConfig) => {
    setConfig(modalConfig);
    setVisible(true);
  };

  const closeModal = () => setVisible(false);

  const Backdrop = ({ children }: { children: ReactNode }) =>
    Platform.OS === "ios" ? (
      <BlurView intensity={50} tint={colorScheme} style={styles.backdrop}>
        {children}
      </BlurView>
    ) : (
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)"]
            : ["rgba(117, 116, 116, 0.8)", "rgba(255,255,255,0.3)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backdrop}
      >
        {children}
      </LinearGradient>
    );

  return (
    <GlassModalContext.Provider value={{ showModal }}>
      {children}

      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.fullscreen}>
          <Backdrop>
            <View
              style={[
                styles.modalBox,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <ThemedText
                style={[
                  styles.title,
                  { color: theme.text, fontFamily: Fonts.sans },
                ]}
              >
                {config.title ?? "Alert"}
              </ThemedText>

              <ThemedText
                style={[
                  styles.message,
                  { color: theme.textMuted, fontFamily: Fonts.sans },
                ]}
              >
                {config.message ?? "This is a custom modal."}
              </ThemedText>

              <View style={styles.actions}>
                <Pressable
                  style={[styles.cancelBtn, { borderColor: theme.border }]}
                  onPress={closeModal}
                >
                  <ThemedText style={[styles.cancelText, { color: theme.text }]}>
                    Cancel
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[styles.okBtn, { backgroundColor: theme.tint }]}
                  onPress={() => {
                    config.onConfirm?.();
                    closeModal();
                  }}
                >
                  <ThemedText style={styles.okText}>{config.actionText ?? 'OK'}</ThemedText>
                </Pressable>
              </View>
            </View>
          </Backdrop>
        </View>
      </Modal>
    </GlassModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: vw(80),
    padding: vw(5),
    borderRadius: vw(5),
    borderWidth: 1,
  },
  title: {
    fontSize: vw(5),
    fontWeight: "700",
    marginBottom: vh(2),
  },
  message: {
    fontSize: vw(4),
    marginBottom: vh(4),
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: vw(3),
  },
  cancelBtn: {
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(5),
    borderRadius: vw(3),
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  cancelText: {
    fontSize: vw(4),
  },
  okBtn: {
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(5),
    borderRadius: vw(3),
  },
  okText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: vw(4),
  },
});
