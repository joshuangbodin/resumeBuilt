import React, { useState, useRef } from "react";
import { View, Text, Pressable, Modal, StyleSheet, useColorScheme } from "react-native";
import { WebView } from "react-native-webview";
import { Colors } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import ScreenHeader from "@/components/ScreenHeader";
import BackButton from "@/components/BackButton";
import { vh, vw } from "@/helpers/responsive";
import { publicPaystackKey } from "@/ai/payment";

const Premium = () => {
  const [showModal, setShowModal] = useState(false);
  const webviewRef = useRef(null);
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const paystackHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            margin: 0;
            background-color: ${colors.background};
            color: ${colors.text};
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <script>
          var handler = PaystackPop.setup({
            key: "${publicPaystackKey}",
            email: "customer@email.com",
            amount: 5000,
            currency: "NGN",
            callback: function(response){
              window.ReactNativeWebView.postMessage(JSON.stringify({
                event: "success",
                ref: response.reference
              }));
            },
            onClose: function(){
              window.ReactNativeWebView.postMessage(JSON.stringify({ event: "cancel" }));
            }
          });
          handler.openIframe();
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === "success") {
      setShowModal(false);
      console.log("✅ Payment success! Ref:", data.ref);
    } else if (data.event === "cancel") {
      setShowModal(false);
      console.log("❌ Payment cancelled");
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <ScreenHeader title="Go Premium" left={<BackButton />} />

      {/* Premium Features */}
      <View style={{ flex: 1, padding: vw(6) }}>
        <Text style={[styles.title, { color: colors.text }]}>Unlock Premium</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Enjoy the best experience with extra features:
        </Text>

        <View style={styles.list}>
          <Text style={[styles.item, { color: colors.text }]}>• Unlimited Notes</Text>
          <Text style={[styles.item, { color: colors.text }]}>• Smart AI Summaries</Text>
          <Text style={[styles.item, { color: colors.text }]}>• Priority Planner Access</Text>
          <Text style={[styles.item, { color: colors.text }]}>• Ad-free Experience</Text>
        </View>

        <Pressable
          style={[styles.payButton, { backgroundColor: colors.tint }]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.payText}>Pay ₦50 with Paystack</Text>
        </Pressable>
      </View>

      {/* Payment Modal */}
      <Modal visible={showModal} animationType="slide">
        <ThemedView style={{ flex: 1, backgroundColor: colors.background }}>
          <ScreenHeader
            title="Complete Payment"
            left={<BackButton onPress={() => setShowModal(false)} />}
          />
          <WebView
            ref={webviewRef}
            originWhitelist={["*"]}
            source={{ html: paystackHTML }}
            onMessage={handleMessage}
            style={{ flex: 1, backgroundColor: colors.background }}
          />
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};

export default Premium;

const styles = StyleSheet.create({
  title: {
    fontSize: vw(6), // responsive title
    fontWeight: "700",
    marginBottom: vh(1),
  },
  subtitle: {
    fontSize: vw(4),
    marginBottom: vh(2),
  },
  list: {
    marginBottom: vh(4),
  },
  item: {
    fontSize: vw(4),
    marginBottom: vh(1.5),
  },
  payButton: {
    paddingVertical: vh(2),
    paddingHorizontal: vw(6),
    borderRadius: vw(4),
    alignItems: "center",
  },
  payText: {
    color: "white",
    fontWeight: "600",
    fontSize: vw(4),
  },
});
