import { publicPaystackKey } from "@/ai/payment";
import React, { useRef } from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";

const Premium = () => {
  const webviewRef = useRef(null);

  const paystackHTML = `
    <!DOCTYPE html>
    <html>
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <script>
          function payWithPaystack(){
            var handler = PaystackPop.setup({
              key: "${publicPaystackKey}", // your public key
              email: 'customer@email.com',
              amount: 5000, // amount in kobo (₦50.00)
              currency: 'NGN',
              callback: function(response){
                window.ReactNativeWebView.postMessage(JSON.stringify({event: 'success', ref: response.reference}));
              },
              onClose: function(){
                window.ReactNativeWebView.postMessage(JSON.stringify({event: 'cancel'}));
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
      console.log("Payment success! Ref:", data.ref);
    } else if (data.event === "cancel") {
      console.log("Payment cancelled");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html: paystackHTML }}
        onMessage={handleMessage}
      />
    </View>
  );
};

export default Premium;
