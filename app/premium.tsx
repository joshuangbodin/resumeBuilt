import BackButton from "@/components/BackButton";
import ScreenHeader from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { vh, vw } from "@/helpers/responsive";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

// Replace this with your Flutterwave Public Key
const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK-75103431d14913f58d0493be008538fa-X";

const Premium = () => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [visible, setVisible] = useState(false);
  const [webviewKey, setWebviewKey] = useState(0);

  const openSheet = () => {
    setWebviewKey((prev) => prev + 1); // refresh webview
    setVisible(true);
  };

  const closeSheet = () => {
    setVisible(false);
  };

  // Flutterwave Inline HTML
  const flutterwaveHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0;padding:0;display:flex;align-items:center;justify-content:center;height:100vh;">
        <script src="https://checkout.flutterwave.com/v3.js"></script>
        <script>
          function payWithFlutterwave() {
            FlutterwaveCheckout({
              public_key: "${FLUTTERWAVE_PUBLIC_KEY}",
              tx_ref: "tx-" + Date.now(),
              amount: 5000,
              currency: "NGN",
              payment_options: "card,ussd,banktransfer",
              customer: {
                email: "customer@email.com",
                phonenumber: "08100000000",
                name: "John Doe",
              },
              callback: function (data) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  event: "success",
                  transaction_id: data.transaction_id,
                  status: data.status
                }));
              },
              onclose: function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({ event: "cancel" }));
              }
            });
          }
          payWithFlutterwave();
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === "success") {
      console.log("✅ Payment Success:", data.transaction_id);
      closeSheet();
    } else if (data.event === "cancel") {
      console.log("❌ Payment Cancelled");
      closeSheet();
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader  title="Go Premium" left={<BackButton />} />

      <ScrollView contentContainerStyle={{ padding: vw(6), flexGrow: 1 }}>
        {/* Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: colors.tint }]}>
          <ThemedText type="title" style={styles.heroTitle}>Unlock Premium</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Experience unlimited features and remove ads forever!
          </ThemedText>
        </View>

        {/* Feature List */}
        <View style={styles.featuresContainer}>
          {[
            "Unlimited Notes",
            "Smart AI Summaries",
            "Priority Planner Access",
            "Ad-free Experience",
          ].map((item, index) => (
            <View
              key={index}
              style={[
                styles.featureItem,
                { backgroundColor: `${colors.background}CC` },
              ]}
            >
              <ThemedText style={styles.featureText}>{item}</ThemedText>
            </View>
          ))}
        </View>

        {/* Pay Button */}
        <Pressable
          style={[styles.payButton, { backgroundColor: colors.tint }]}
          onPress={openSheet}
        >
          <ThemedText style={styles.payText}>Unlock Now!!</ThemedText>
        </Pressable>
      </ScrollView>

      {/* Modal with WebView */}
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            {/* Flutterwave WebView */}
            <WebView
              key={webviewKey}
              originWhitelist={["*"]}
              source={{ html: flutterwaveHTML }}
              onMessage={handleMessage}
              style={{
                flex: 1,
                borderTopLeftRadius: vw(6),
                borderTopRightRadius: vw(6),
              }}
            />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default Premium;

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: vw(4),
    padding: vw(6),
    marginBottom: vh(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  heroTitle: {
    fontSize: vw(7),
    fontWeight: "700",
    color: "white",
    marginBottom: vh(1),
  },
  heroSubtitle: {
    fontSize: vw(4),
    color: "white",
    lineHeight: vh(3.5),
  },
  featuresContainer: {
    marginBottom: vh(4),
  },
  featureItem: {
    padding: vh(1.5),
    borderRadius: vw(3),
    marginBottom: vh(1.5),
  },
  featureText: {
    fontSize: vw(4),
    fontWeight: "500",
  },
  payButton: {
    paddingVertical: vh(2),
    borderRadius: vw(5),
    alignItems: "center",
    marginTop: vh(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  payText: {
    color: "white",
    fontWeight: "600",
    fontSize: vw(4.5),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "89%",
    borderTopLeftRadius: vw(6),
    borderTopRightRadius: vw(6),
    overflow: "hidden",
    //marginBottom: vh(3),
    paddingBottom: vh(6),
    backgroundColor: "white",
  },
  cancelButton: {
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
