import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import ScreenHeader from "@/components/ScreenHeader";
import BackButton from "@/components/BackButton";
import { vh, vw } from "@/helpers/responsive";
import { publicPaystackKey } from "@/ai/payment";

const Premium = () => {
  const webviewRef = useRef(null);
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const paystackHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="display:flex;align-items:center;justify-content:center;height:100%;margin:0;">
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <script>
          function payWithPaystack(){
            var handler = PaystackPop.setup({
              key: "${publicPaystackKey}",
              email: "customer@email.com",
              amount: 5000, // amount in kobo (₦50.00)
              currency: "NGN",
              callback: function(response){
                window.ReactNativeWebView.postMessage(JSON.stringify({event: "success", ref: response.reference}));
              },
              onClose: function(){
                window.ReactNativeWebView.postMessage(JSON.stringify({event: "cancel"}));
              }
            });
            handler.openIframe();
          }
          payWithPaystack();
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === "success") {
      console.log("✅ Payment success! Ref:", data.ref);
    } else if (data.event === "cancel") {
      console.log("❌ Payment cancelled");
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <ScreenHeader
        title="Upgrade to Premium"
        left={<BackButton />}
      />

      {/* WebView wrapped in card style */}
      <ThemedView
        style={{
          flex: 1,
          margin: vw(5),
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
          backgroundColor: colors.card,
        }}
      >
        <WebView
          ref={webviewRef}
          originWhitelist={["*"]}
          source={{ html: paystackHTML }}
          onMessage={handleMessage}
          style={{
            flex: 1,
            backgroundColor: colors.card,
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Premium;
